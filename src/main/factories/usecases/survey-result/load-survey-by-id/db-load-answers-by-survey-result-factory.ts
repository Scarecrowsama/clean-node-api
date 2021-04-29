import { DbLoadAnswersBySurvey } from '@/data/usecases/survey/load-survey-by-id/db-load-answers-by-survey'
import { LoadAnswersBySurvey } from '@/domain/usecases/survey/load-answers-by-survey'
import { SurveyMongoRepository } from '@/infrastructure/db/mongodb/survey/survey-mongo-repository'

export const makeDbLoadAnswersBySurvey = (): LoadAnswersBySurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadAnswersBySurvey(surveyMongoRepository)
}
