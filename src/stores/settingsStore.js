import { reactive } from 'vue';

// Create a singleton store instance
const state = reactive({
	isOpen: false,
	mode: '',
	apiKey: '',
	selectedModel: '',
	promptTone: 'Happy',
	customTone: '',
	promptType: 'General',
	customType: '',
	platforms: {
		twitch: true,
		youtube: true,
		youtubeShorts: true,
		kick: true,
		trovo: true,
	},
});

export const useSettingsStore = () => {
	const loadSettings = () => {
		const savedSettings = localStorage.getItem('settings');
		if (savedSettings) {
			const settings = JSON.parse(savedSettings);
			state.mode = settings.mode || '';
			state.apiKey = settings.apiKey || '';
			state.selectedModel = settings.selectedModel || '';
			state.promptTone = settings.promptTone || '';
			state.customTone = settings.customTone || '';
			state.promptType = settings.promptType || '';
			state.customType = settings.customType || '';
			state.platforms = settings.platforms || {
				twitch: true,
				youtube: true,
				youtubeShorts: true,
				kick: true,
				trovo: true,
			};
		}
	};

	const saveSettings = () => {
		localStorage.setItem('settings', JSON.stringify(state));
		state.isOpen = false;
	};

	const openSettings = () => {
		loadSettings();
		state.isOpen = true;
	};

	const closeSettings = () => {
		state.isOpen = false;
	};

	return {
		state,
		loadSettings,
		saveSettings,
		openSettings,
		closeSettings,
	};
};
