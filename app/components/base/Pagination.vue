<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  page: number
  total: number
  pageCount?: number
  pageSize?: number
}>()

const emit = defineEmits<{
  'update:page': [page: number]
}>()

// Create a computed property for the current page that emits an event when changed
const currentPage = computed({
  get: () => props.page,
  set: (value) => emit('update:page', value)
})
</script>

<template>
  <UPagination 
    v-model="currentPage" 
    :total="total"
    :page-count="pageCount"
    :page-size="pageSize"
  />
</template>
