import {z} from 'zod';

export const QuestionSchema = z.object({
    question : z.string(),
    questionImage : z.string(),
    questionId : z.string(),
    spotName : z.string(),
    answerCode : z.string()
})