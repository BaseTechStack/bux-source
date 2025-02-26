<template>
<aside class="h-screen w-64 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden">
    <div class="p-4 h-16 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white">Camper</h1>
    </div>
    <div class="flex-1 overflow-y-auto py-4">
        <ClientOnly>
            <UNavigationMenu
                color="neutral"
                orientation="vertical"
                :items="items"
                class="w-full"
            />
        </ClientOnly>
    </div>
    <div class="p-4 border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
        <ClientOnly>
            <AppUserProfile />
        </ClientOnly>
    </div>
</aside>
</template>

<script setup lang="ts">
const items = ref([
  // Navigation items
  [
    {
      label: 'Dashboard',
      icon: 'i-heroicons-home',
      to: '/app/dashboard'
    },
    {
      label: 'Clients',
      icon: 'i-heroicons-user-group',
      to: '/clients'
    },
  ],
  [
    {
      label: 'Settings',
      icon: 'i-heroicons-cog-6-tooth',
      to: '/app/settings'
    },
  ]
])
</script>