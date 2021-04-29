import { SaveSurveyResult } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockSurveyResultModels = (): SaveSurveyResult.Result => ({
  surveyId: 'any_id',
  question: 'any_question',
  answers: [
    {
      answer: 'any_answer',
      count: 0,
      percent: 0,
      isCurrentAccountAnswer: false
    },
    {
      answer: 'other_answer',
      image: 'any_image',
      count: 0,
      percent: 0,
      isCurrentAccountAnswer: false
    }
  ],
  date: new Date()
})
