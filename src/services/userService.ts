import type { User } from '../types';

interface StoredUser extends User {
    password?: string; // Optional for backward compatibility with mocks if needed, but we'll set it.
}

const MOCK_USERS: StoredUser[] = [
    { id: 'u1', name: 'Alice', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice', password: 'password' },
    { id: 'u2', name: 'Bob', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob', password: 'password' },
    { id: 'u3', name: 'Charlie', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie', password: 'password' },
    { id: 'u4', name: 'Dave', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dave', password: 'password' },
];

const STORAGE_KEY_USERS = 'praise_app_users';
const STORAGE_KEY_CURRENT_USER = 'praise_app_current_user';

// Initialize users in localStorage if not present
const initializeUsers = () => {
    const stored = localStorage.getItem(STORAGE_KEY_USERS);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(MOCK_USERS));
    }
};

initializeUsers();

const getAllUsers = (): StoredUser[] => {
    const stored = localStorage.getItem(STORAGE_KEY_USERS);
    return stored ? JSON.parse(stored) : [];
};

export const userService = {
    getUsers: (): User[] => {
        // Return users without passwords
        return getAllUsers().map(({ password, ...user }) => user);
    },

    getUserById: (id: string): User | undefined => {
        const user = getAllUsers().find(u => u.id === id);
        if (user) {
            const { password, ...safeUser } = user;
            return safeUser;
        }
        return undefined;
    },

    register: (name: string, password: string): User => {
        const users = getAllUsers();
        if (users.some(u => u.name === name)) {
            throw new Error('User already exists');
        }

        const newUser: StoredUser = {
            id: 'u' + Date.now().toString(),
            name,
            avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
            password
        };

        users.push(newUser);
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));

        const { password: _, ...safeUser } = newUser;
        return safeUser;
    },

    login: (name: string, password: string): User | undefined => {
        const users = getAllUsers();
        const user = users.find(u => u.name === name && u.password === password);

        if (user) {
            const { password: _, ...safeUser } = user;
            localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(safeUser));
            return safeUser;
        }
        return undefined;
    },

    logout: () => {
        localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    },

    getCurrentUser: (): User | null => {
        const stored = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
        return stored ? JSON.parse(stored) : null;
    }
};
