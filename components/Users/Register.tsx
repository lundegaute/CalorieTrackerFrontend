"use client";
import TextField from '@mui/material/TextField';
import { useState} from "react";
import { fetchPost } from "@/Fetch/fetchPost";
import { SuccessMessage, RegisterUserDTO } from '@/Types/types';
import SweetAlertSuccess from "@/components/SweetAlert/Success";
import { useRouter } from "next/navigation";
import LoadingButton from '@/components/UI/LoadingButton';

function Register() {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        if (password.length <= 5) {
            alert("Password needs to be at least 6 characters");
            return;
        }

        setIsLoading(true);
        
        try {
            const userToRegister: RegisterUserDTO = {
                email: email,
                password: password
            }
            const res = await fetchPost<SuccessMessage, RegisterUserDTO>("/api/Auth/Register", userToRegister);
            if ( res.success) {
                SweetAlertSuccess().then(() => { router.push("/")});
            } else {
                alert(res.error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleRegister}>
            <TextField name="Email" type="email" label="Email" variant="outlined" fullWidth margin="normal" onChange={(e) => setEmail(e.target.value)} value={email} required />
            <TextField name="Password" label="Password" type="password" variant="outlined" fullWidth margin="normal" onChange={ (e) => setPassword(e.target.value)} value={password} required />
            <LoadingButton 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth
                loading={isLoading}
                loadingText="Registering..."
            >
                Register
            </LoadingButton>
        </form>
    );
};

export default Register;