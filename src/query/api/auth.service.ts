import { useMutation } from "@tanstack/react-query";
import { api } from ".";

export const useLoginTeam = () => {
    return useMutation({
        mutationKey: ["loginTeam"],
        mutationFn: async (data: {teamId: string, espektroId : string}) => {
            const res = await api.post('/api/auth/login', data)
            return res.data;
        },
    })
}