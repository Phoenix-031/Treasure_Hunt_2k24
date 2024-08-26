import {z} from 'zod';

const UserLoginForm = z.object({
    teamName: z.string().max(15).default(''),
    // teamId: z.string().min(6).max(6),
    espektroId : z.string().min(10).max(10),
})


export const FormType = {
    UserLoginForm
}