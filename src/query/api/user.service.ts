import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
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

export const useGetTeamById = (teamId : string) => {
    return useQuery({
        queryKey: ["team", teamId],
        queryFn: async () => {
            const res = await api.get(`/api/team/${teamId}`)
            return res.data;
        },
        enabled : false,
    })
}

export const useVerifyAnswer = () => {
    return useMutation({
        mutationKey: ["verifyAnswer"],
        mutationFn: async (data : {teamId : string, questionId : string, answerCode : string}) => {
            const res = await api.post('/api/verify', data)
            return res.data;
        },
    })
}