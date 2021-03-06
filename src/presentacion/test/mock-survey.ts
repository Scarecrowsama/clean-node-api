import { SurveyModel } from '@/domain/models/survey'
import { mockSurveyModels } from '@/domain/test'
import { AddSurvey } from '@/domain/usecases/survey/add-survey'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurvey.Params): Promise<void> {
      return Promise.resolve(null)
    }
  }

  return new AddSurveyStub()
}

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (accountId: string): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveyModels())
    }
  }

  return new LoadSurveysStub()
}
