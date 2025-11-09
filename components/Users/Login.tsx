"use client";
import TextField from '@mui/material/TextField';
import { LoginUserDTO } from '@/Types/types';
import { FetchLoginPost } from '@/Fetch/fetchLoginPost';
import { useRouter } from 'next/navigation'; 
import {useAuthStore} from "@/components/Zustand/AuthStore";
import LoadingButton from '@/components/UI/LoadingButton';
import { useState } from 'react';

function Login () {
    const router = useRouter();
    const login = useAuthStore(state => state.login);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        
        try {
            // Handle login logic here
            const formData = new FormData(event.currentTarget);
            const email = formData.get("Email");
            const password = formData.get("Password");
            const loginUserDTO: LoginUserDTO = {
                email: email as string,
                password: password as string,
            }
            console.log("---------- LOGIN COMPONENT FILE ----------");
            const res = await FetchLoginPost(loginUserDTO);
            if ( res.success ) {
                login();
                router.push("/");
            } else {
                const errorResponse = res.error;
                console.log("Error Response:", errorResponse);
                alert(`Error: ${errorResponse.message.Error[0]}`);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField autoFocus label="Email" name="Email" type="email" variant="outlined" fullWidth margin="normal" required />
            <TextField label="Password" name="Password" type="password" variant="outlined" fullWidth margin="normal" required />
            <LoadingButton 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth
                loading={isLoading}
                loadingText="Logging in..."
            >
                Login
            </LoadingButton>
        </form>
    );
}

export default Login;