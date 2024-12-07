<script setup></script>

<template>
	<!--   <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main> -->
	<div id="app" class="container p-4 max-w-[600px] mx-auto">
		<!-- Header -->
		<header class="flex justify-between items-center mb-4">
			<h1 class="text-xl font-bold">UPDATE TITLES</h1>
			<div class="flex items-center gap-4">
				<a href="https://example.com">
					<i class="fa-solid fa-circle-info text-gray-400 hover:text-white"></i>
				</a>
				<i
					:class="[
						'fa-solid',
						isConnected
							? 'fa-wifi text-green-500'
							: 'fa-wifi-exclamation text-red-500',
					]"
				></i>
			</div>
		</header>
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
			>
				GENERATE
			</button>
			<button
				class="ml-2 text-xl flex items-center justify-center"
				@click="showSettings = !showSettings"
			>
				<i class="fa-solid fa-gear text-gray-400 hover:text-white"></i>
			</button>
		</div>

		<!-- Settings Panel -->
		<div v-if="showSettings" class="bg-[#2a2a2a] p-4 rounded mt-4">
			<h2 class="text-lg font-bold mb-2">Settings</h2>
			<div class="flex items-center mb-2">
				<label class="mr-2">Mode:</label>
				<select v-model="mode" class="bg-[#1a1a1a] text-white rounded">
					<option value="touchPortal">Touch Portal</option>
					<option value="streamerBot">StreamerBot</option>
				</select>
			</div>
			<div class="mb-2">
				<label for="apiKey" class="block mb-1">API Key:</label>
				<input
					v-model="apiKey"
					type="text"
					id="apiKey"
					placeholder="Enter API Key..."
					class="w-full py-2 px-4 rounded bg-[#2a2a2a] border-none outline-none"
				/>
			</div>
			<button
				@click="saveSettings"
				class="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
			>
				Save Settings
			</button>
		</div>

		<!-- Platforms -->
		<div class="space-y-2">
			<div
				v-for="broadcast in broadcasts"
				:key="broadcast.id"
				class="flex items-center justify-between p-3"
			>
				<div class="flex items-center gap-2 w-full mr-3">
					<i
						:class="[
							'fa-brands',
							'text-2xl',
							broadcast.platform === 'twitch' ? 'fa-twitch' : 'fa-youtube',
						]"
					></i>
					<input
						v-model="broadcast.title"
						type="text"
						class="w-full py-2 px-4 rounded-full bg-[#2a2a2a] border-none outline-none"
					/>
				</div>
				<button
					@click="
						updatePlatformTitle(
							broadcast.platform,
							broadcast.title,
							broadcast.platform === 'youtube'
								? broadcast.id.replace('youtube-', '')
								: null
						)
					"
					class="px-4 py-1 rounded"
				>
					UPDATE
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
