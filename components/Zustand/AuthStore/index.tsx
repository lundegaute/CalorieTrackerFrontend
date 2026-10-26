"use client";
import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { API_ENDPOINTS } from '@/lib/constants';
import Cookies from 'js-cookie';

interface AuthState {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    checkTokenStatus: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,

            login: () => {
                set({
                    isAuthenticated: true,
                })
            },
            logout: async () => { // Clear the state and remove from localStorage
                try {
                    await fetch("/api/Auth/Logout", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    });
                // Only remove if API call succeeds
                
            } catch (error) {
                console.error("Logout failed:", error);
                // Remove cookie even if API call fails
                
            }
                set({
                    isAuthenticated: false,
                });
            },
            checkTokenStatus: async () => {
                try {
                    const res = await fetch("/api/Auth/CheckStatus", {
                        method: "GET",
                        credentials: "include"
                    })
                    set({ isAuthenticated: res.ok })
                    return res.ok;
                } catch {
                    set({ isAuthenticated: false })
                    return false;
                }
            }
        }),
        {
            name: "auth-storage", // Name of the storage key
            partialize: (state) => ({
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
)