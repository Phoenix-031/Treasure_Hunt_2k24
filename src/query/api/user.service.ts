import { useMutation } from "@tanstack/react-query";
import { api } from ".";
import { store } from "@/store";



export const useUpdateTeam = () => {
    return useMutation({
        mutationKey: ["updateTeam"],
        mutationFn: async (data: any) => {
            const teamId = store.getState().UserSlice.teamId;
            const res = await api.put(`/api/team/${teamId}`, data)
            return res.data;
        },
    })
}