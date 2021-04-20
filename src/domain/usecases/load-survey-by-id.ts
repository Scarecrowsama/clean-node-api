import { SurveyModel } from '@/domain/models/survey'

export interface LoadSurveyById {
  loadById: (Id: string) => Promise<SurveyModel>
}
