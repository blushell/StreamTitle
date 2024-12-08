<template>
	<div class="bg-[#2a2a2a] p-6 max-w-lg mx-auto space-y-5">
		<h2 class="text-xl font-semibold">Settings</h2>

		<!-- Mode Selector -->
		<div>
			<label class="block text-sm font-medium text-gray-300 mb-1">Mode</label>
			<select
				v-model="mode"
				class="w-full bg-[#1f1f1f] rounded-md py-2 px-3 border border-gray-600"
			>
				<option disabled selected value="">Select Mode</option>
				<option value="touchPortal">Touch Portal</option>
				<option value="streamerBot">StreamerBot</option>
			</select>
		</div>

		<!-- Platform Selection -->
		<div>
			<label class="block text-sm font-medium text-gray-300 mb-1"
				>Platforms</label
			>
			<div class="flex flex-wrap gap-4">
				<div class="space-y-2">
					<div>
						<input
							type="checkbox"
							id="twitch"
							v-model="platforms.twitch"
							class="bg-[#1f1f1f] text-blue-500"
						/>
						<label for="twitch" class="text-gray-300 ml-2">Twitch</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="kick"
							v-model="platforms.kick"
							class="bg-[#1f1f1f] text-blue-500"
						/>
						<label for="kick" class="text-gray-300 ml-2">Kick</label>
					</div>
				</div>
				<div class="space-y-2">
					<div>
						<input
							type="checkbox"
							id="youtube"
							v-model="platforms.youtube"
							class="bg-[#1f1f1f] text-blue-500"
						/>
						<label for="youtube" class="text-gray-300 ml-2">YouTube</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="youtubeShorts"
							v-model="platforms.youtubeShorts"
							class="bg-[#1f1f1f] text-blue-500"
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
							v-model="platforms.trovo"
							class="bg-[#1f1f1f] text-blue-500"
						/>
						<label for="trovo" class="text-gray-300 ml-2">Trovo</label>
					</div>
				</div>
			</div>
		</div>

		<!-- API Provider Selector -->
		<div>
			<label class="block text-sm font-medium text-gray-300 mb-1"
				>API Provider</label
			>
			<select
				v-model="provider"
				class="w-full bg-[#1f1f1f] rounded-md py-2 px-3 border border-gray-600"
			>
				<option disabled selected value="">Select Provider</option>
				<option value="openAPI">OpenAPI</option>
				<option value="openRouter">OpenRouter</option>
			</select>
		</div>

		<!-- API Key Input -->
		<div>
			<label for="apiKey" class="block text-sm font-medium text-gray-300 mb-1"
				>API Key</label
			>
			<div class="relative">
				<input
					v-model="apiKey"
					:type="showPassword ? 'text' : 'password'"
					id="apiKey"
					placeholder="Enter your API Key"
					class="w-full bg-[#1f1f1f] rounded-md py-2 px-3 border border-gray-600 placeholder-gray-400"
				/>
				<button
					@click="togglePasswordVisibility"
					type="button"
					class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
				>
					<span v-if="showPassword">🙈</span>
					<span v-else>👁️</span>
				</button>
			</div>
		</div>

		<!-- Action Buttons -->
		<div class="flex justify-end space-x-3">
			<button
				@click="closeSettings"
				class="bg-gray-700 text-gray-300 px-4 py-2 rounded-md hover:bg-gray-600 transition"
			>
				Cancel
			</button>
			<button
				@click="saveSettings"
				class="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 transition"
			>
				Save
			</button>
		</div>
	</div>
</template>

<script>
export default {
	emits: ['close'],
	data() {
		return {
			mode: '',
			provider: '',
			apiKey: '',
			showPassword: false,
			platforms: {
				twitch: true,
				youtube: true,
				youtubeShorts: true,
				kick: true,
				trovo: true,
			},
		};
	},
	methods: {
		togglePasswordVisibility() {
			this.showPassword = !this.showPassword;
		},
		saveSettings() {
			// Save settings logic here
			this.$emit('close');
		},
		closeSettings() {
			this.$emit('close');
		},
	},
};
</script>
