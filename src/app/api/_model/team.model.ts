import mongoose, { model, Model, Schema, Types } from 'mongoose';

interface Member_T {
    name: string,
    espektroId: string,
}

interface Team_T {
    teamName : string,
    teamId : string,
    numberOfLives : number,
    progressString : string,
    validationString : string,
    currentQuestionStage : number,
    lastStageUpdate : Date,
    isDisqualified : boolean,
    teamMembers : Member_T[]
}
const teamSchema = new Schema<Team_T>(
  {
    teamName : {
        type: String,
        required: true,
        unique: true,
    },
    teamId: {
      type: String,
      required: true,
      unique: true
    },
    numberOfLives: {
      type: Number,
      default: 5,
    },
    progressString: {
      type: String,
      default: ''
    },
    validationString: {
        type: String,
        required: true,
    },
    currentQuestionStage: {
        type: Number,
        default: 0,
    },
    lastStageUpdate:{
        type : Date,
        default: Date.now,
    },
    isDisqualified: {
        type: Boolean,
        default: false,
    },
    teamMembers: [
        {
            name: {
                type: String,
                required: true,
            },
            espektroId: {
                type: String,
                required: true,
            },
        }
    ]
  },
  {
    timestamps: true,
  }
);

const TeamModel: Model<Team_T> =
  mongoose.models.Team ?? model<Team_T>('Team', teamSchema);
export default TeamModel;