import { CreateEmailUserZodSchema } from "@/types/user"

export type SignUpActionState = {
    formErrors: {
        username?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
    },
    apiError?: string;
}

export function SignUpAction(prevState: SignUpActionState, formData: FormData): SignUpActionState {
    const newState: SignUpActionState = {
        formErrors: {},
        apiError: undefined
    };

    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
   
    const result = CreateEmailUserZodSchema.safeParse({ username, email, password });
}