import { Router, useRouter } from "next/router";

export function RedirectToLogin() {
    const router = useRouter();
    router.push("/Auth/Login");
}