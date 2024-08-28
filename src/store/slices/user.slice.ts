import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserSliceType = {
    teamName : string,
    numberOfLives : number,
    validationString : string,
    progressString : string,
    currentQuestionNumber : number,
    teamId : string
    isDisqualified : boolean,
}

const initialState: UserSliceType= {
    currentQuestionNumber: 1,
    teamName: '',
    numberOfLives: 5,
    validationString: '',
    progressString: '',
    teamId: '',
    isDisqualified: false,
}

export const userSliceLabel = 'UserSlice';

export const userSlice = createSlice({
    name: userSliceLabel,
    initialState,
    reducers: {
        setCurrentQuestionNumber: (state, action: PayloadAction<number>) => {
            state.currentQuestionNumber = action.payload;
        },
        setTeamName: (state, action: PayloadAction<string>) => {
            state.teamName = action.payload;
        },
        setNumberOfLives: (state, action: PayloadAction<number>) => {
            state.numberOfLives = action.payload;
        },
        setValidationString: (state, action: PayloadAction<string>) => {
            state.validationString = action.payload;
        },
        setProgressString: (state, action: PayloadAction<string>) => {
            state.progressString += action.payload;
        },
        setTeamId: (state, action: PayloadAction<string>) => {
            state.teamId = action.payload;
        },
    },
})

export const userActions = userSlice.actions;
export const userReducers =  userSlice.reducer;