//pinia store for clients

// Add TypeScript declaration for import.meta.client
declare global {
  interface ImportMeta {
    client: boolean
  }
}

import { defineStore } from 'pinia'
import type { Client, BasePagination } from './client'
import { useClients } from '../composables/useClients'
export type ViewMode = 'grid' | 'table'

const VIEW_MODE_KEY = 'clients_view_mode'


interface ClientsState {
  clients: Client[]
  loading: boolean
  error: string | null
  viewMode: ViewMode
  pagination: BasePagination
}

export const useClientsStore = defineStore('clients', {
  state: (): ClientsState => ({
    clients: [],
    loading: false,
    error: null,
    viewMode: (typeof window !== 'undefined' ? localStorage.getItem(VIEW_MODE_KEY) as ViewMode : null) || 'grid',
    pagination: {
      total: 0,
      page: 1,
      pageSize: 10,
      totalPages: 0
    }
  }),

  getters: {
    getClientById: (state: ClientsState) => (id: string) => {
      return state.clients.find((client: Client) => client.id === id)
    }
  },

  actions: {
    setLoading(isLoading: boolean) {
      this.loading = isLoading
    },

    setError(error: string | null) {
      this.error = error
    },

    setClients(clients: Client[]) {
      this.clients = clients
    },

    setViewMode(mode: ViewMode) {
      this.viewMode = mode
      if (typeof window !== 'undefined') {
        localStorage.setItem(VIEW_MODE_KEY, mode)
      }
    },

    setPagination(pagination: Partial<BasePagination>) {
      this.pagination = {
        ...this.pagination,
        ...pagination
      }
    },

    async setPageSize(pageSize: number) {
      // Update pagination first
      this.setPagination({
        pageSize,
        page: 1 // Reset to first page
      })
      // Then fetch clients
      await this.fetchClients(1, pageSize)
    },

    addClient(client: Client) {
      this.clients.push(client)
    },

    updateClient(client: Client) {
      const index = this.clients.findIndex((c: Client) => c.id === client.id)
      if (index !== -1) {
        this.clients[index] = client
      }
    },

    removeClient(id: string) {
      this.clients = this.clients.filter(client => client.id !== id)
    },

    async fetchClients(page = 1, pageSize?: number) {
      this.setLoading(true)
      this.setError(null)
      
      // If pageSize is not provided, use the current pageSize from pagination
      // or default to appropriate size based on view mode
      const effectivePageSize = pageSize || this.pagination.pageSize || (this.viewMode === 'grid' ? 12 : 10)
      
      try {
        const { fetchClients } = useClients()
        const { data, pagination } = await fetchClients(page, effectivePageSize)
        this.setClients(data)
        this.setPagination(pagination)
      } catch (err: any) {
        this.setError(err.message || 'Failed to fetch clients')
      } finally {
        this.setLoading(false)
      }
    },

    async createClient(clientData: Omit<Client, 'id'>) {
      this.setLoading(true)
      this.setError(null)
      
      try {
        const { addClient } = useClients()
        const client = await addClient(clientData)
        this.addClient(client)
        return client
      } catch (err: any) {
        this.setError(err.message || 'Failed to create client')
        throw err
      } finally {
        this.setLoading(false)
      }
    },

    async updateClientById(id: string, clientData: Partial<Omit<Client, 'id'>>) {
      this.setLoading(true)
      this.setError(null)
      
      try {
        const { updateClient } = useClients()
        const client = await updateClient(Number(id), clientData)
        this.updateClient(client)
        return client
      } catch (err: any) {
        this.setError(err.message || 'Failed to update client')
        throw err
      } finally {
        this.setLoading(false)
      }
    },

    async deleteClient(id: string) {
      this.setLoading(true)
      this.setError(null)
      
      try {
        const { deleteClient } = useClients()
        await deleteClient(Number(id))
        this.removeClient(id)
      } catch (err: any) {
        this.setError(err.message || 'Failed to delete client')
        throw err
      } finally {
        this.setLoading(false)
      }
    },

    reset() {
      this.clients = []
      this.loading = false
      this.error = null
      this.pagination = {
        total: 0,
        page: 1,
        pageSize: 10,
        totalPages: 0
      }
    }
  }
})