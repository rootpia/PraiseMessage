export interface User {
    id: string;
    name: string;
    avatarUrl?: string;
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
