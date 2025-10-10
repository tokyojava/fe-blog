// store/auth.ts
import { create } from 'zustand';
import { TokenPayload } from './token';

type AuthState = {
    user: TokenPayload | null;
    setUser: (user: TokenPayload | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));