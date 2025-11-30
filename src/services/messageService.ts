import type { PraiseMessage } from '../types';

const STORAGE_KEY_MESSAGES = 'praise_app_messages';

export const messageService = {
    getAllMessages: (): PraiseMessage[] => {
        const stored = localStorage.getItem(STORAGE_KEY_MESSAGES);
        return stored ? JSON.parse(stored) : [];
    },

    getMessagesForUser: (userId: string): PraiseMessage[] => {
        const all = messageService.getAllMessages();
        return all.filter(m => m.receiverId === userId).sort((a, b) => b.timestamp - a.timestamp);
    },

    getMessagesSentByUser: (userId: string): PraiseMessage[] => {
        const all = messageService.getAllMessages();
        return all.filter(m => m.senderId === userId).sort((a, b) => b.timestamp - a.timestamp);
    },

    sendMessage: (senderId: string, receiverId: string, imageId: string, message: string): PraiseMessage => {
        const all = messageService.getAllMessages();
        const newMessage: PraiseMessage = {
            id: Date.now().toString(),
            senderId,
            receiverId,
            imageId,
            message,
            timestamp: Date.now(),
        };
        all.push(newMessage);
        localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(all));
        return newMessage;
    }
};
