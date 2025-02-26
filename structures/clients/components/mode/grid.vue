<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <GridCard 
      v-for="client in clients" 
      :key="client.id" 
      :item="client"
      title="name"
      subtitle="email"
      :fields="[
        { key: 'phone', icon: 'i-heroicons-phone', label: 'Phone' },
        { key: 'company', icon: 'i-heroicons-building-office', label: 'Company' },
        { key: 'address', icon: 'i-heroicons-map-pin', label: 'Address' }
      ]"
      timestamp="createdAt"
      hover
    >
      <template #actions>
        <BaseCrudActions 
          structure="clients"
          :item="client" 
          actions="edit,delete"
          @edit="$emit('edit', $event)"
          @delete="$emit('delete', $event)"
        />
      </template>
      
      <template #footer-actions>
        <UButton
          size="xs"
          color="primary"
          variant="ghost"
          icon="i-heroicons-eye"
          @click="$emit('view', client)"
        >
          View
        </UButton>
      </template>
    </GridCard>
  </div>
</template>

<script setup lang="ts">
import { GridCard } from '#components';
import type { Client } from '../../stores/client'
  
defineProps<{
  clients: Client[]
}>()

defineEmits<{
  (e: 'view', client: Client): void
  (e: 'edit', client: Client): void
  (e: 'delete', client: Client): void
}>()
</script>