<template>
	<div class="max-w-lg mx-auto mt-4">
		<!-- Show UpdateTitles when settings is not open -->
		<UpdateTitles v-if="!settingsStore.state.isOpen" />
		<!-- Show UpdateSettings when settings is open -->
		<UpdateSettings v-else />
	</div>
</template>

<script setup>
import { useSettingsStore } from './stores/settingsStore';
import UpdateTitles from './components/UpdateTitles.vue';
import UpdateSettings from './components/UpdateSettings.vue';

const settingsStore = useSettingsStore();
</script>

<style scoped></style>
