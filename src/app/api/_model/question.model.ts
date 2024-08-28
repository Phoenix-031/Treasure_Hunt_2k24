import mongoose, { model, Model, Schema, Types } from 'mongoose';

interface Question_T {
    question :string,
    questionImage : string,
    questionId : string,
    spotName : string,
    answerCode : string
}
const questionSchema = new Schema<Question_T>(
  {
    question: {
      type: String,
      required: true,
    },
    questionImage: {
      type: String,
      required: true,
    },
    questionId: {
      type: String,
      required: true,
    },
    spotName: {
      type: String,
      required: true,
    },
    answerCode: {
        type: String,
        required: true,
        },
  },
  {
    timestamps: true,
  }
);

const QuestionModel: Model<Question_T> =
  mongoose.models.Question ?? model<Question_T>('Question', questionSchema);
export default QuestionModel;