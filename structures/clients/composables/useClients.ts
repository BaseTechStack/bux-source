import type { Client } from '../stores/client'
import type { BasePagination } from '@@/app/types/base'
import { useApi } from '@@/app/composables/useApi'

interface ApiResponse<T> {
  data: T
  pagination?: {
    total: number
    page: number
    total_pages: number
  }
}

export const useClients = () => {
  const api = useApi()

  const fetchClients = async (page = 1, pageSize = 10) => {
    console.log('useClients.fetchClients called with page:', page, 'pageSize:', pageSize)
    const result = await api.get(`/clients?page=${page}&limit=${pageSize}`)
    console.log('useClients API response:', result)
    const total = result.pagination?.total || 0
    const pagination: BasePagination = {
      total: total,
      page: result.pagination?.page || 1,
      pageSize: pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize))
    }
    console.log('useClients returning pagination:', pagination)
    return { clients: result.data, pagination }
  }

  const createClient = async (clientData: Omit<Client, 'id'>) => {
    const result = await api.post('/clients', clientData)
    return { client: result.data }
  }

  const updateClient = async (id: number, clientData: Partial<Omit<Client, 'id'>>) => {
    const result = await api.put(`/clients/${id}`, clientData)
    return { client: result.data }
  }

  const deleteClient = async (id: number) => {
    await api.delete(`/clients/${id}`)
  }

  return {
    fetchClients,
    createClient,
    updateClient,
    deleteClient
  }
}
