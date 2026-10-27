'use client';
import { create } from 'zustand';
import { UserDTO } from '@/Types/types';

interface AuthState {
    user: UserDTO | null;
    isAuthenticated: boolean;
    isInitialized: boolean;
    setinitialized: () => void;
    logout: () => void;
    fetchUser: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isInitialized: false,
            setinitialized: () => {
                set({
                    isInitialized: true
                });
            },
            logout: async () => {
                // Clear the state and remove from localStorage
                try {
                    await fetch('/api/Auth/Logout', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                    });
                } catch (error) {
                    console.error('Logout failed:', error);
                }
                set({
                    isAuthenticated: false,
                    user: null,
                });
            },
            fetchUser: async () => {
                try {
                    const res = await fetch('/api/Auth/CheckStatus', {
                        method: 'GET',
                        credentials: 'include',
                    });
                    if (!res.ok) {
                        return res.ok;
                    }
                    const user: UserDTO = await res.json();
                    set({
                        isAuthenticated: res.ok,
                        user: user
                    });
                    return res.ok;
                } catch {
                    set({ isAuthenticated: false });
                    return false;
                }
            },
        }),
        /* {
            name: 'auth-storage', // Name of the storage key
            partialize: (state) => ({
                isAuthenticated: state.isAuthenticated,
            }),
        } */
    
);
