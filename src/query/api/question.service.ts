import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from ".";
import axios from "axios";

export const useGetQuestions = () => {
    return useQuery({
        queryKey: ["questions"],
        queryFn: async () => {
            const res = await api.get('/')
            console.log(res,"rsponse")
            return res.data;
        },
    });
}

export const useGetQuestion = (id: string) => {

    return useQuery({
        queryKey: ["question", id],
        queryFn: async () => {
            const res = await api.get('/api/question/'+ id)
            return res.data;
        },
    });
}

export const usePostQuestion = () => {
    return useMutation({
        mutationKey: ["postQuestion"],
        mutationFn: async (data: any) => {
            const res = await api.post('/', data)
            return res.data;
        },
    })
}