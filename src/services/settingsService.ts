import type { AppSettings } from '../types';

const STORAGE_KEY_SETTINGS = 'praise_app_settings';

const DEFAULT_SETTINGS: AppSettings = {
    showSenderName: true,
};

export const settingsService = {
    getSettings: (): AppSettings => {
        const stored = localStorage.getItem(STORAGE_KEY_SETTINGS);
        return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
    },

    updateSettings: (newSettings: Partial<AppSettings>): AppSettings => {
        const current = settingsService.getSettings();
        const updated = { ...current, ...newSettings };
        localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(updated));
        return updated;
    }
};
