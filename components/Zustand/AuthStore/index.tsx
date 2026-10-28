'use client';
import { create } from 'zustand';
import { UserDTO } from '@/Types/types';

interface AuthState {
    user: UserDTO | null;
    isInitialized: boolean;
    //isAuthenticated: boolean;
    logout: () => void;
    fetchUser: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
        (set) => ({
            user: null,
            isInitialized: false,
            //isAuthenticated: false,
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
                    //isAuthenticated: false,
                    isInitialized: false,
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
                        set({isInitialized: true, user: null});
                        return res.ok;
                    }
                    const user: UserDTO = await res.json();
                    set({
                        //isAuthenticated: res.ok,
                        isInitialized: true,
                        user: user
                    });
                    return res.ok;
                } catch {
                    set({ isInitialized: true });
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
