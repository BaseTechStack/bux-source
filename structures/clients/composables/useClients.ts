import type { Client, BasePagination } from '../stores/client'

// Use relative API path for Nuxt server routes
const API_URL = 'http://localhost:8001/api'
const X_API_KEY = 'api'

export const useClients = () => {
  const fetchClients = async (page = 1, pageSize = 10) => {
    try {
      const response = await fetch(`${API_URL}/clients?page=${page}&page_size=${pageSize}`, {
        headers: {
          'X-API-KEY': X_API_KEY,
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error(`Failed to fetch clients: ${response.statusText}`)
      }
      
      const result = await response.json()
      
      // Transform the data
      const clients = result.data.map((client: any) => ({
        ...client,
        id: Number(client.id)
      }))
      
      // Transform pagination data
      const pagination: BasePagination = {
        total: result.pagination.total || 0,
        page: result.pagination.page || 1,
        pageSize: result.pagination.page_size || 10,
        totalPages: result.pagination.total_pages || 1
      }
      
      return { data: clients, pagination }
    } catch (err: any) {
      console.error('Error fetching clients:', err)
      throw err
    }
  }

  const addClient = async (client: Omit<Client, 'id'>) => {
    try {
      const response = await fetch(`${API_URL}/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': X_API_KEY,
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(client)
      })
      
      if (!response.ok) {
        throw new Error(`Failed to add client: ${response.statusText}`)
      }
      
      const { data } = await response.json()
      return {
        ...data,
        id: Number(data.id)
      }
    } catch (err: any) {
      console.error('Error adding client:', err)
      throw err
    }
  }

  const updateClient = async (id: number, client: Partial<Omit<Client, 'id'>>) => {
    try {
      const response = await fetch(`${API_URL}/clients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': X_API_KEY,
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(client)
      })
      
      if (!response.ok) {
        throw new Error(`Failed to update client: ${response.statusText}`)
      }
      
      const { data } = await response.json()
      return {
        ...data,
        id: Number(data.id)
      }
    } catch (err: any) {
      console.error('Error updating client:', err)
      throw err
    }
  }

  const deleteClient = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/clients/${id}`, {
        method: 'DELETE',
        headers: {
          'X-API-KEY': X_API_KEY,
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      })
      
      if (!response.ok) {
        throw new Error(`Failed to delete client: ${response.statusText}`)
      }
    } catch (err: any) {
      console.error('Error deleting client:', err)
      throw err
    }
  }

  return {
    fetchClients,
    addClient,
    updateClient,
    deleteClient
  }
}
