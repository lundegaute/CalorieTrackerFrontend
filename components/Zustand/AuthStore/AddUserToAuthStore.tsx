"use client";
import { useAuthStore} from "@/components/Zustand/AuthStore";
import { useEffect } from "react";

function AddUserToAuthStore() {
    const fetchUser = useAuthStore(state => state.fetchUser);
    useEffect(() => {
        fetchUser().then(() => {
            console.log(`isAuthenticated status: ${useAuthStore.getState().isAuthenticated}`)
            console.log(`User: ${useAuthStore.getState().user?.email}`)
        });
    },[fetchUser])

    return null;
}
export default AddUserToAuthStore;