import {z} from 'zod';

const UserLoginForm = z.object({
    teamId: z.string(),
    espektroId : z.string().min(10).max(10),
})


export const FormType = {
    UserLoginForm
}