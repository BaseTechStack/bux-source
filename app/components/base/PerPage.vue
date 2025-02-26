<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  pageSize: number
  options?: number[]
}>(), {
  pageSize: 10,
  options: () => [10, 20, 50, 100]
})

const emit = defineEmits<{
  'update:pageSize': [pageSize: number]
}>()

// Default options if not provided
const defaultOptions = [10, 20, 50, 100]

// Use provided options or default
const pageSizeOptions = computed(() => props.options || defaultOptions)

// Create a computed property for the current pageSize that emits an event when changed
const currentPageSize = computed({
  get: () => props.pageSize,
  set: (value) => emit('update:pageSize', value)
})
</script>
<template>
  <div class="flex items-center gap-2">
    <span class="text-sm text-gray-600 dark:text-gray-400">Per page:</span>
    <USelectMenu v-model="currentPageSize" :options="pageSizeOptions" />

  </div>
</template>
 