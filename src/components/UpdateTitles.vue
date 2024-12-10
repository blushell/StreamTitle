<template>
	<!-- Header -->
	<HeaderSection />
	<!-- Update All -->
	<div class="mb-4">
		<input
			v-model="globalTitle"
			type="text"
			placeholder="Enter title..."
			class="w-full py-2 px-4 rounded-full bg-[#2a2a2a] border-none outline-none"
		/>
	</div>

	<div class="flex gap-2 mb-4">
		<button
			@click="updateAllTitles"
			class="bg-[#262A49] px-4 py-2 rounded-full hover:bg-[#1161EE]"
		>
			UPDATE ALL
		</button>
		<button
			@click="fetchBroadcasts"
			class="bg-[#363636] px-4 py-2 rounded-full hover:bg-[#8F8F8F]"
		>
			REFRESH
		</button>
		<button
			class="px-4 py-2 rounded-full ml-auto bg-green-600 hover:bg-green-500"
			@click="handleGenerate"
		>
			GENERATE
		</button>
		<button
			class="ml-2 text-xl flex items-center justify-center"
			@click="handleSettingsClick"
		>
			<i class="fa-solid fa-gear text-gray-400 hover:text-white"></i>
		</button>
	</div>

	<!-- Platforms -->
	<div class="space-y-2">
		<div
			v-for="platform in platforms"
			:key="platform.id"
			class="flex items-center justify-between p-3"
		>
			<div class="flex items-center gap-2 w-full mr-3">
				<img
					:src="`/src/assets/img/${platform.type}.svg`"
					:alt="`${platform.type} icon`"
					class="w-6 h-6"
				/>
				<input
					v-model="platform.title"
					type="text"
					:placeholder="`Enter ${platform.type} title...`"
					class="w-full py-2 px-4 rounded-full bg-[#2a2a2a] border-none outline-none"
				/>
			</div>
			<button
				@click="updatePlatformTitle(platform)"
				class="px-4 py-1 rounded bg-[#262A49] hover:bg-[#1161EE]"
			>
				UPDATE
			</button>
		</div>
	</div>
</template>

<script setup>
import HeaderSection from './HeaderSection.vue';
import { ref } from 'vue';
import { generateTitle } from '../utils/titleGenerator';
import { useSettingsStore } from '../stores/settingsStore';

const settingsStore = useSettingsStore();
const globalTitle = ref('');
const platforms = ref([]);

// Add click handler to generate button
const handleGenerate = async () => {
	try {
		globalTitle.value = await generateTitle();
	} catch (error) {
		alert(error.message);
	}
};

// Replace emit with store method
const handleSettingsClick = () => {
	settingsStore.openSettings();
};
</script>
