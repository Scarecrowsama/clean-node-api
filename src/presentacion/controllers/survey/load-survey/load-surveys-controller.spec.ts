import MockDate from 'mockdate'
import { LoadSurveysController } from './load-surveys-controller'
import { LoadSurveys, HttpRequest } from './load-survey-controller-protocols'
import { noContent, ok, serverError } from '@/presentacion/helpers/http/httpHelper'
import { mockLoadSurveys } from '@/presentacion/test'
import { mockSurveyModels, throwError } from '@/domain/test'

const mockRequest = (): HttpRequest => ({
  accountId: 'any_account_id'
})

type SutTypes = {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = mockLoadSurveys()
  const sut = new LoadSurveysController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveys with correct value', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_account_id')
  })

  test('Should return 200 on sucess', async () => {
    const { sut } = makeSut()
    const httpReponse = await sut.handle(mockRequest())
    expect(httpReponse).toEqual(ok(mockSurveyModels()))
  })

  test('Should return 204 if LoadSurveys returns nothing', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(Promise.resolve([]))
    const httpReponse = await sut.handle({})
    expect(httpReponse).toEqual(noContent())
  })

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
