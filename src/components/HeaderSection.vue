<template>
	<header class="flex justify-between items-center mb-4">
		<h1 class="text-xl font-bold">UPDATE TITLES</h1>
		<div class="flex items-center gap-4">
			<a href="https://example.com" target="_blank">
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
</template>
