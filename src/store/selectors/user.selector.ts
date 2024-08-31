import { RootState } from "@/types/redux.type";

const _selectTeamName = (state:RootState) => state.UserSlice.teamName;
const _selectNumberOfLives = (state: RootState) => state.UserSlice.numberOfLives;
const _selectValidationString = (state: RootState) => state.UserSlice.validationString;
const _selectProgressString = (state: RootState) => state.UserSlice.progressString;
const _selectTeamId = (state: RootState) => state.UserSlice.teamId;
const _selectCurrentQuestionNumber = (state: RootState) => state.UserSlice.currentQuestionNumber;
const _selectIsDisqualified = (state: RootState) => state.UserSlice.isDisqualified;
const _selectQrCodeValue = (state: RootState) => state.UserSlice.qrCodeValue;

export const selectTeamName = _selectTeamName;
export const selectNumberOfLives = _selectNumberOfLives;
export const selectValidationString = _selectValidationString;
export const selectProgressString = _selectProgressString;
export const selectTeamId = _selectTeamId;
export const selectCurrentQuestionNumber = _selectCurrentQuestionNumber;
export const selectIsDisqualified = _selectIsDisqualified;
export const selectQrCodeValue = _selectQrCodeValue;