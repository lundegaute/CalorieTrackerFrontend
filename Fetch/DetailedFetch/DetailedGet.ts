import notLoggedInWarning from '@/components/SweetAlert/notLoggedIn';
import { useAuthStore } from '@/components/Zustand/AuthStore';
import { ApiResponse } from '@/Types/DetailedTypes';

export async function fetchDetailedGet<T>(apiUrl: string): Promise<T> {
    const res = await fetch(apiUrl, {
        method: 'GET',
    });
    const body = (await res.json().catch(() => null)) as ApiResponse<T> | null;

    if (!res.ok || !body || !body.isSuccess) {
        if (body?.types[0] === 'Unauthorized') {
            notLoggedInWarning().then(() => {
                window.location.href = '/Auth/Login'; 
            });
        }
        throw new Error(body?.errors[0] ?? `Request failed (${res.status})`);
    }

    if (body.data === null) throw new Error('Response contained no data');
    
    return body.data;
}
