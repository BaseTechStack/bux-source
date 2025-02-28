import type { Client } from '../stores/client'
import type { BaseService } from '@@/app/services/baseService'
import { useClients } from '../composables/useClients'
import type { BasePagination } from '@@/app/types/base'

// Adapt useClients to implement the BaseService interface
export class ClientService implements BaseService<Client> {
  private clientsApi = useClients()

  async fetch(page = 1, pageSize = 10): Promise<{ items: Client[], pagination: BasePagination }> {
    console.log('ClientService.fetch called with page:', page, 'pageSize:', pageSize)
    const result = await this.clientsApi.fetchClients(page, pageSize)
    console.log('ClientService API response:', result)
    return {
      items: result.clients.map((client: Client) => ({
        ...client,
        id: Number(client.id)
      })),
      pagination: result.pagination
    }
  }

  async create(data: Omit<Client, 'id'>): Promise<{ item: Client }> {
    const result = await this.clientsApi.createClient(data)
    return {
      item: {
        ...result.client,
        id: Number(result.client.id)
      }
    }
  }

  async update(id: number, data: Partial<Omit<Client, 'id'>>): Promise<{ item: Client }> {
    const result = await this.clientsApi.updateClient(id, data)
    return {
      item: {
        ...result.client,
        id: Number(result.client.id)
      }
    }
  }

  async delete(id: number): Promise<void> {
    await this.clientsApi.deleteClient(id)
  }
}

// Export singleton instance
export const clientService = new ClientService()
