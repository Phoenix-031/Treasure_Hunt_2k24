import { ZodError } from 'zod';
import { toast } from 'sonner';

export const handleZodError = (error: ZodError) => {
    console.log(error)
    error.issues.forEach((issue) => toast.error(issue.message));
};