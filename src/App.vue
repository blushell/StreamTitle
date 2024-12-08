<template>
	<div class="max-w-lg mx-auto mt-4">
		<!-- Show UpdateTitles when showSettings is false -->
		<UpdateTitles v-if="!showSettings" @show-settings="showSettings = true" />
		<!-- Show UpdateSettings when showSettings is true -->
		<UpdateSettings v-else @close="showSettings = false" />
	</div>
</template>

<script setup>
import { ref } from 'vue';
import UpdateTitles from './components/UpdateTitles.vue';
import UpdateSettings from './components/UpdateSettings.vue';

const showSettings = ref(false);
</script>

<style scoped></style>
