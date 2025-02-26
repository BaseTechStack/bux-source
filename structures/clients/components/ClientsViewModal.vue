<template>
  <USlideover 
    v-model:open="isOpen" 
    :title="title || 'View Client'"
    :description="description || 'View client details'"
    side="right"
  >
    <template #body>
      <div class="space-y-4" v-if="client">
        <div class="grid grid-cols-1 gap-4">
          <div class="client-info-item">
            <div class="font-medium text-gray-500">Name</div>
            <div>{{ client.name }}</div>
          </div>
          
          <div class="client-info-item">
            <div class="font-medium text-gray-500">Email</div>
            <div>{{ client.email }}</div>
          </div>
          
          <div v-if="client.phone" class="client-info-item">
            <div class="font-medium text-gray-500">Phone</div>
            <div>{{ client.phone }}</div>
          </div>
          
          <div v-if="client.address" class="client-info-item">
            <div class="font-medium text-gray-500">Address</div>
            <div>{{ client.address }}</div>
          </div>
          
          <div v-if="client.company" class="client-info-item">
            <div class="font-medium text-gray-500">Company</div>
            <div>{{ client.company }}</div>
          </div>
          
          <div v-if="client.createdAt" class="client-info-item">
            <div class="font-medium text-gray-500">Created</div>
            <div>{{ new Date(client.createdAt).toLocaleString() }}</div>
          </div>
          
          <div v-if="client.updatedAt" class="client-info-item">
            <div class="font-medium text-gray-500">Last Updated</div>
            <div>{{ new Date(client.updatedAt).toLocaleString() }}</div>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end">
        <UButton
          color="neutral"
          variant="ghost"
          @click="closeModal"
        >
          Close
        </UButton>
      </div>
    </template>
  </USlideover>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useClientsStore } from '../stores/clientsStore'
import type { Client } from '../stores/client'

interface Props {
  open?: boolean;
  item: Client | null;
  title?: string;
  description?: string;
}

const props = defineProps<Props>()
const emit = defineEmits(['update:open', 'close'])

// Get the client from the item prop
const client = computed<Client | null>(() => {
  return props.item as Client
})

const isOpen = computed({
  get() {
    return props.open
  },
  set(value) {
    emit('update:open', value)
  }
})

function closeModal() {
  isOpen.value = false
  emit('close')
}
</script>

<style scoped>
.client-info-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}
</style>
