//pinia store for clients

// Add TypeScript declaration for import.meta.client
declare global {
  interface ImportMeta {
    client: boolean
  }
}

import type { Client } from './client'
import { defineBaseStore, type BaseItem } from '@@/app/stores/baseStore'
import { clientService } from '../services/clientService'

const VIEW_MODE_KEY = 'clients_view_mode'

// Create the base clients store with the client service
export const useClientsStore = defineBaseStore<Client>('clients', VIEW_MODE_KEY, clientService)

// Adding specialized methods to the store
// Instead of extending, we'll use the store object directly
// and add our specialized methods that call the base methods

// Add these helper methods to provide more descriptive names
export function fetchClients(page = 1, pageSize?: number): Promise<void> {
  console.log('fetchClients called with page:', page, 'pageSize:', pageSize)
  const store = useClientsStore()
  return store.fetch(page, pageSize)
}

export function createClient(clientData: Omit<Client, 'id'>): Promise<Client> {
  const store = useClientsStore()
  return store.create(clientData)
}

export function updateClientById(id: number, clientData: Partial<Omit<Client, 'id'>>): Promise<Client> {
  const store = useClientsStore()
  return store.update(id, clientData)
}

export function deleteClient(id: number): Promise<void> {
  const store = useClientsStore()
  return store.delete(id)
}