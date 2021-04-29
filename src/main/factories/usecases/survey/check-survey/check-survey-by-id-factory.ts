import { CheckSurveyById } from '@/domain/usecases/survey/check-survey-by-id'
import { SurveyMongoRepository } from '@/infrastructure/db/mongodb/survey/survey-mongo-repository'
import { DbCheckSurveyById } from '@/data/usecases/survey/check-survey-by-id/check-survey-by-id'

export const makeDbCheckdSurveyById = (): CheckSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbCheckSurveyById(surveyMongoRepository)
}
