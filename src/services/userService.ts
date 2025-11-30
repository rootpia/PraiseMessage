import type { User } from '../types';

const MOCK_USERS: User[] = [
    { id: 'u1', name: 'Alice', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
    { id: 'u2', name: 'Bob', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob' },
    { id: 'u3', name: 'Charlie', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie' },
    { id: 'u4', name: 'Dave', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dave' },
];

const STORAGE_KEY_CURRENT_USER = 'praise_app_current_user';

export const userService = {
    getUsers: (): User[] => {
        return MOCK_USERS;
    },

    getUserById: (id: string): User | undefined => {
        return MOCK_USERS.find(u => u.id === id);
    },

    login: (userId: string): User | undefined => {
        const user = MOCK_USERS.find(u => u.id === userId);
        if (user) {
            localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(user));
        }
        return user;
    },

    logout: () => {
        localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    },

    getCurrentUser: (): User | null => {
        const stored = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
        return stored ? JSON.parse(stored) : null;
    }
};
