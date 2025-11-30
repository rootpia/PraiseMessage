import type { User } from '../types';
import { auth, githubProvider } from '../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const MOCK_USERS: User[] = [
    { id: 'u1', name: 'Alice', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
    { id: 'u2', name: 'Bob', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob' },
    { id: 'u3', name: 'Charlie', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie' },
    { id: 'u4', name: 'Dave', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dave' },
];

export const userService = {
    getUsers: (): User[] => {
        return MOCK_USERS;
    },

    getUserById: (id: string): User | undefined => {
        return MOCK_USERS.find(u => u.id === id);
    },

    loginWithGithub: async (): Promise<User | null> => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            const user = result.user;
            return {
                id: user.uid,
                name: user.displayName || 'Anonymous',
                avatarUrl: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`
            };
        } catch (error) {
            console.error("Login failed", error);
            return null;
        }
    },

    logout: async () => {
        await signOut(auth);
    },

    // Note: This is a synchronous check for the current user from auth state, 
    // but Firebase auth state is asynchronous. 
    // For a real app, we should use a context or hook to manage auth state.
    // For this refactor, we'll keep the signature but it might return null initially.
    getCurrentUser: (): User | null => {
        const user = auth.currentUser;
        if (user) {
            return {
                id: user.uid,
                name: user.displayName || 'Anonymous',
                avatarUrl: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`
            };
        }
        return null;
    },

    // Helper to subscribe to auth changes
    onAuthStateChanged: (callback: (user: User | null) => void) => {
        return onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                callback({
                    id: firebaseUser.uid,
                    name: firebaseUser.displayName || 'Anonymous',
                    avatarUrl: firebaseUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.uid}`
                });
            } else {
                callback(null);
            }
        });
    }
};
