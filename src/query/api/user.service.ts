import { useMutation } from "@tanstack/react-query";
import { api } from ".";
import axios from "axios";
import { store } from "@/store";



export const useUpdateTeamStage = () => {
    return useMutation({
        mutationKey: ["updateTeamStage"],
        mutationFn: async (data: any) => {
            const teamId = store.getState().UserSlice.teamId;
            console.log(teamId,"temiad")
            const res = await axios.put(`http://localhost:3000/api/team/${teamId}`, data)
            return res.data;
        },
    })
}