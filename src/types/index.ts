export interface User {
    id: string;
    name: string;
    avatarUrl?: string;
    role: 'admin' | 'user';
}

export interface AppSettings {
    showSenderName: boolean;
}

export interface PraiseImage {
    id: string;
    url: string;
    alt: string;
}

export interface PraiseMessage {
    id: string;
    senderId: string;
    receiverId: string;
    imageId: string;
    message: string;
    timestamp: number;
}
