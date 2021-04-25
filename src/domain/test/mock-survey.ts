import { SurveyModel } from '@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id-protocols'
import { AddSurveyParams } from '@/presentacion/controllers/survey/add-survey/add-survey-controller-protocols'

export const mockSurveyModel = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [
    {
      answer: 'any_answer'
    },
    {
      answer: 'other_answer',
      image: 'any_image'
    }
  ],
  date: new Date()
})

export const mockSurveyModels = (): SurveyModel[] => {
  return [
    {
      id: 'any_id',
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer'
        }
      ],
      date: new Date()
    },
    {
      id: 'other_id',
      question: 'other_question',
      answers: [
        {
          image: 'other_image',
          answer: 'other_answer'
        }
      ],
      date: new Date()
    }
  ]
}

export const maockAddSurveyParams = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer'
    }
  ],
  date: new Date()
})
