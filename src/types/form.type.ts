import {z} from 'zod';

const UserLoginForm = z.object({
    teamName: z.string().max(15).default(''),
    teamId: z.string(),
    espektroId : z.string().min(10).max(10),
})


export const FormType = {
    UserLoginForm
}