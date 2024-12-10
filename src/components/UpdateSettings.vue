<template>
	<div class="bg-[#2a2a2a] p-6 max-w-lg mx-auto space-y-5">
		<h2 class="text-xl font-semibold">Settings</h2>

		<!-- Mode Selector -->
		<div>
			<label class="block text-sm font-medium text-gray-300 mb-1">Mode</label>
			<select
				v-model="settingsStore.state.mode"
				class="w-full bg-[#1f1f1f] rounded-md py-2 px-3 border border-gray-600"
			>
				<option disabled selected value="">Select Mode</option>
				<option value="touchPortal">Touch Portal</option>
				<option value="streamerBot">StreamerBot</option>
			</select>
		</div>

		<!-- Platform Selection -->
		<div v-if="settingsStore.state.mode === 'touchPortal'">
			<label class="block text-sm font-medium text-gray-300 mb-1"
				>Platforms</label
			>
			<div class="flex flex-wrap gap-4">
				<div class="space-y-2">
					<div>
						<input
							type="checkbox"
							id="twitch"
							v-model="settingsStore.state.platforms.twitch"
							class="bg-[#1f1f1f]"
						/>
						<label for="twitch" class="text-gray-300 ml-2">Twitch</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="kick"
							v-model="settingsStore.state.platforms.kick"
							class="bg-[#1f1f1f]"
						/>
						<label for="kick" class="text-gray-300 ml-2">Kick</label>
					</div>
				</div>
				<div class="space-y-2">
					<div>
						<input
							type="checkbox"
							id="youtube"
							v-model="settingsStore.state.platforms.youtube"
							class="bg-[#1f1f1f]"
						/>
						<label for="youtube" class="text-gray-300 ml-2">YouTube</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="youtubeShorts"
							v-model="settingsStore.state.platforms.youtubeShorts"
							class="bg-[#1f1f1f]"
						/>
						<label for="youtubeShorts" class="text-gray-300 ml-2"
							>YouTube Shorts</label
						>
					</div>
				</div>
				<div class="space-y-2">
					<div>
						<input
							type="checkbox"
							id="trovo"
							v-model="settingsStore.state.platforms.trovo"
							class="bg-[#1f1f1f]"
						/>
						<label for="trovo" class="text-gray-300 ml-2">Trovo</label>
					</div>
				</div>
			</div>
		</div>

		<!-- API Key Input -->
		<div>
			<label for="apiKey" class="block text-sm font-medium text-gray-300 mb-1"
				>API Key</label
			>
			<div class="relative">
				<input
					v-model="settingsStore.state.apiKey"
					:type="showAPIKey ? 'text' : 'password'"
					id="apiKey"
					placeholder="Enter your API Key"
					class="w-full bg-[#1f1f1f] rounded-md py-2 px-3 border border-gray-600 placeholder-gray-400"
				/>
				<button
					@click="toggleAPIKeyVisibility"
					type="button"
					class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
				>
					<span v-if="showAPIKey">🙈</span>
					<span v-else>👁️</span>
				</button>
			</div>
		</div>

		<!-- Model Selector -->
		<div>
			<label class="block text-sm font-medium text-gray-300 mb-1"
				>Select Model</label
			>
			<select
				v-model="settingsStore.state.selectedModel"
				class="w-full bg-[#1f1f1f] rounded-md py-2 px-3 border border-gray-600"
			>
				<option disabled selected value="">Select a Model</option>
				<option v-for="model in models" :key="model.id" :value="model.id">
					{{ model.name }}
				</option>
			</select>

			<!-- Display selected model info -->
			<div v-if="selectedModel" class="mt-4 text-gray-300 flex flex-wrap gap-4">
				<small>
					<strong>Prompt Price:</strong>
					{{ formatModelPrice(selectedModel?.pricing?.prompt) }}
				</small>
				<small>
					<strong>Completion Price:</strong>
					{{ formatModelPrice(selectedModel?.pricing?.completion) }}
				</small>
			</div>
		</div>

		<!-- COLUMN ONE -->
		<div class="flex justify-between">
			<!-- Prompt Type -->
			<div class="w-1/2 mr-4">
				<label class="block text-sm font-medium text-gray-300 mb-1"
					>Prompt Tone:</label
				>
				<select
					v-model="settingsStore.state.promptTone"
					class="w-full bg-[#1f1f1f] rounded-md py-2 px-3 border border-gray-600 mb-2"
				>
					<option value="Happy">Happy</option>
					<option value="Funny">Funny</option>
					<option value="Weird">Weird</option>
					<option value="Motivational">Motivational</option>
					<option value="Chill">Chill</option>
					<option value="Excited">Excited</option>
					<option value="Confident">Confident</option>
					<option value="Mysterious">Mysterious</option>
					<option value="Sarcastic">Sarcastic</option>
					<option value="Custom">Custom</option>
				</select>
				<div v-if="settingsStore.state.promptTone === 'Custom'">
					<input
						v-model="settingsStore.state.customTone"
						type="text"
						placeholder="Enter custom tone..."
						class="w-full bg-[#1f1f1f] rounded-md py-2 px-3 border border-gray-600 placeholder-gray-400 mt-2"
					/>
				</div>
			</div>
			<!-- Prompt Type -->
			<div class="w-1/2 ml-4">
				<label class="block text-sm font-medium text-gray-300 mb-1"
					>Prompt Type:</label
				>
				<select
					v-model="settingsStore.state.promptType"
					class="w-full bg-[#1f1f1f] rounded-md py-2 px-3 border border-gray-600 mb-2"
				>
					<option value="General">General</option>
					<option value="Gaming">Gaming</option>
					<option value="Music">Music</option>
					<option value="Chatting">Chatting</option>
					<option value="IRL">IRL</option>
					<option value="Custom">Custom</option>
				</select>
				<div v-if="settingsStore.state.promptType === 'Custom'">
					<input
						v-model="settingsStore.state.customType"
						type="text"
						placeholder="Enter custom type..."
						class="w-full bg-[#1f1f1f] rounded-md py-2 px-3 border border-gray-600 placeholder-gray-400 mt-2"
					/>
				</div>
			</div>
		</div>

		<!-- Action Buttons -->
		<div class="flex justify-end space-x-3">
			<button
				@click="settingsStore.closeSettings"
				class="bg-gray-700 text-gray-300 px-4 py-2 rounded-md hover:bg-gray-600 transition"
			>
				Cancel
			</button>
			<button
				@click="settingsStore.saveSettings"
				class="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 transition"
			>
				Save
			</button>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useSettingsStore } from '../stores/settingsStore';

const settingsStore = useSettingsStore();
const showAPIKey = ref(false);
const models = ref([]);

const fetchModels = async () => {
	try {
		const response = await fetch('https://openrouter.ai/api/v1/models', {
			headers: { Authorization: `Bearer ${settingsStore.state.apiKey}` },
		});

		const data = await response.json();

		if (data.data && Array.isArray(data.data)) {
			models.value = data.data.sort((a, b) => {
				const aIsFree = a.name.includes('(free)');
				const bIsFree = b.name.includes('(free)');
				return aIsFree === bIsFree ? 0 : aIsFree ? -1 : 1;
			});
		} else {
			console.error('Unexpected data format:', data);
		}
	} catch (error) {
		console.error('Error fetching models:', error);
	}
};

onMounted(() => {
	if (settingsStore.state.apiKey) {
		fetchModels();
	}
});

watch(
	() => settingsStore.state.apiKey,
	(newKey) => {
		if (newKey) fetchModels();
	}
);

const toggleAPIKeyVisibility = () => {
	showAPIKey.value = !showAPIKey.value;
};

const formatModelPrice = (price) => {
	if (!price && price !== 0) return 'N/A';
	const numPrice = Number(price);
	return isNaN(numPrice) ? 'N/A' : `$${numPrice.toFixed(6)}/1k tokens`;
};

// Use computed property for the selected model
const selectedModel = computed(() =>
	models.value.find((model) => model.id === settingsStore.state.selectedModel)
);
</script>
