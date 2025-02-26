<template>
  <div class="client-detail-container">
    <header class="client-detail-header">
      <NuxtLink to="/clients" class="back-link">
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-arrow-left"
        >
          Back to Clients
        </UButton>
      </NuxtLink>
      <h1 class="client-title">{{ client ? client.name : 'Loading client...' }}</h1>
    </header>

    <div v-if="loading" class="loading-container">
      <ULoading />
      <p>Loading client...</p>
    </div>

    <div v-else-if="error" class="error-container">
      <UAlert
        title="Error"
        color="error"
        variant="soft"
        icon="i-lucide-alert-triangle"
      >
        <template #description>
          {{ error }}
        </template>
      </UAlert>
    </div>

    <UCard v-else-if="client" class="client-detail">
      <template #header>
        <div class="client-meta">
          <UBadge color="neutral" variant="soft">
            Client ID: {{ client.id }}
          </UBadge>
        </div>
      </template>
      
      <div class="client-content">
        <div class="client-info-grid">
          <div class="client-info-item">
            <div class="info-label">Email</div>
            <div class="info-value">{{ client.email }}</div>
          </div>
          
          <div v-if="client.phone" class="client-info-item">
            <div class="info-label">Phone</div>
            <div class="info-value">{{ client.phone }}</div>
          </div>
          
          <div v-if="client.address" class="client-info-item">
            <div class="info-label">Address</div>
            <div class="info-value">{{ client.address }}</div>
          </div>
          
          <div v-if="client.createdAt" class="client-info-item">
            <div class="info-label">Created</div>
            <div class="info-value">{{ new Date(client.createdAt).toLocaleString() }}</div>
          </div>
          
          <div v-if="client.updatedAt" class="client-info-item">
            <div class="info-label">Last Updated</div>
            <div class="info-value">{{ new Date(client.updatedAt).toLocaleString() }}</div>
          </div>
        </div>
      </div>
      
      <template #footer>
        <div class="client-actions">
          <NuxtLink to="/clients/admin">
            <UButton
              color="neutral"
              variant="soft"
              icon="i-lucide-settings"
            >
              Manage Clients
            </UButton>
          </NuxtLink>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Remove middleware since we have a global auth middleware

import { useHead, navigateTo, useRoute } from '#imports'
import { storeToRefs } from 'pinia'
import { useClientsStore } from '../../stores/clientsStore'
import type { Client } from '../../stores/client'

const route = useRoute()
const clientId = Number(route.params.id)

const store = useClientsStore()
const { clients, loading, error } = storeToRefs(store)

// Fetch all clients if not already loaded
if (clients.value.length === 0) {
  await store.fetchClients()
}

// Get the specific client from store
const client = computed(() => store.getClientById(clientId))

// Redirect if client not found
if (!loading.value && !client.value) {
  navigateTo('/clients')
}

const handleUpdateClient = async (updatedData: Partial<Omit<Client, 'id'>>) => {
  try {
    await store.updateClientById(clientId, updatedData)
  } catch (err) {
    // Error is handled by the store
  }
}
</script>
