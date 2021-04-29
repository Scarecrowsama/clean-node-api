import { SurveyModel } from '@/domain/models/survey'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test/'
import { CheckSurveyById } from '@/domain/usecases/survey/check-survey-by-id'
import { AddSurveyRepository } from '../protocols/db/survey/add-survey-repository'
import { CheckSurveyByIdRepository } from '../protocols/db/survey/check-survey-by-id-repository'
import { LoadAnswersBySurveyRepository } from '../protocols/db/survey/load-answers-by-survey-repository'
import { LoadSurveyByIdRepository } from '../protocols/db/survey/load-survey-by-id-repository'
import { LoadSurveysRepository } from '../protocols/db/survey/load-surveys-repository'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyRepository.Params): Promise<void> {
      return Promise.resolve()
    }
  }

  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<LoadSurveyByIdRepository.Result> {
      return Promise.resolve(mockSurveyModel())
    }
  }

  return new LoadSurveyByIdRepositoryStub()
}

export const mockCheckSurveyByIdRepository = (): CheckSurveyByIdRepository => {
  class CheckSurveyByIdRepositoryStub implements CheckSurveyByIdRepository {
    async checkById (id: string): Promise<CheckSurveyByIdRepository.Result> {
      return Promise.resolve(true)
    }
  }

  return new CheckSurveyByIdRepositoryStub()
}

export const mockLoadAnswersBySurvey = (): LoadAnswersBySurveyRepository => {
  class LoadAnswersBySurveyStub implements LoadAnswersBySurveyRepository {
    async loadAnswers (id: string): Promise<LoadAnswersBySurveyRepository.Result> {
      return mockSurveyModel().answers.map(a => a.answer)
    }
  }

  return new LoadAnswersBySurveyStub()
}

export const mockCheckSurveyById = (): CheckSurveyById => {
  class CheckSurveyByIdStub implements CheckSurveyById {
    async checkById (id: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }

  return new CheckSurveyByIdStub()
}

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (accountId: string): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveyModels())
    }
  }

  return new LoadSurveysRepositoryStub()
}
