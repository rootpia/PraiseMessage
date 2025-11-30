import { useState, useEffect } from 'react';
import { settingsService } from '../services/settingsService';
import { AppSettings } from '../types';

export default function Settings() {
    const [settings, setSettings] = useState<AppSettings>(settingsService.getSettings());

    useEffect(() => {
        setSettings(settingsService.getSettings());
    }, []);

    const handleToggle = () => {
        const newSettings = settingsService.updateSettings({
            showSenderName: !settings.showSenderName
        });
        setSettings(newSettings);
    };

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Application Settings</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Global configuration for Praise Message.</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Show Sender Name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                                <button
                                    type="button"
                                    onClick={handleToggle}
                                    className={`${settings.showSenderName ? 'bg-indigo-600' : 'bg-gray-200'
                                        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                    role="switch"
                                    aria-checked={settings.showSenderName}
                                >
                                    <span className="sr-only">Use setting</span>
                                    <span
                                        aria-hidden="true"
                                        className={`${settings.showSenderName ? 'translate-x-5' : 'translate-x-0'
                                            } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                                    />
                                </button>
                                <span className="ml-3 text-sm text-gray-500">
                                    {settings.showSenderName ? 'Sender names are visible on cards.' : 'Sender names are hidden on cards.'}
                                </span>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}
