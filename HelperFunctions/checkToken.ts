
interface AuthStatus {
    authenticated: boolean;
    reason: string;
}

export default async function CheckToken() {
    const res = await fetch("/api/Status", {
            method: "GET",
            credentials: "include"
        }
    )

    const loginStatus: AuthStatus = await res.json();

    return loginStatus;
}