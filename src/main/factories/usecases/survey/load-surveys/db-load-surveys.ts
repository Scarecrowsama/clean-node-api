import { DbLoadSurveys } from '../../../../../data/usecases/load-surveys/db-load-surveys'
import { LoadSurveys } from '../../../../../domain/usecases/load-surveys'
import { SurveyMongoRepository } from '../../../../../infrastructure/db/mongodb/survey/survey-mongo-repository'

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}
