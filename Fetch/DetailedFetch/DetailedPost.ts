import notLoggedInWarning from '@/components/SweetAlert/notLoggedIn';
import { ApiResponse } from '@/Types/DetailedTypes';

export async function fetchDetailedPost<T, bodyType>(
    url: string,
    body: bodyType
): Promise<ApiResponse<T>> {
    console.log('----- FETCHPOST -----');
    console.log(url);
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
    });
    if (!res.ok)
        if (res.status === 401) {
            notLoggedInWarning().then(() => {
                window.location.href = '/Auth/Login';
            });
        }
        else {
            const errorMessage: string = await res.json();
            alert(errorMessage)
        }
    const apiResponse: ApiResponse<T> = await res.json();
    return apiResponse;
}
