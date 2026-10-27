"use client";
import { useAuthStore} from "@/components/Zustand/AuthStore";
import { useEffect } from "react";

function AddUserToAuthStore() {
    const fetchUser = useAuthStore(state => state.fetchUser);
    useEffect(() => {
        fetchUser().then(() => {
        });
    },[fetchUser])

    return null;
}
export default AddUserToAuthStore;