import type { Supplier } from '../stores/supplier'
import type { BaseService } from '@@/app/services/baseService'
import { useSuppliers } from '../composables/useSuppliers'
import type { BasePagination } from '@@/app/types/base'

// Adapt useSuppliers to implement the BaseService interface
export class SupplierService implements BaseService<Supplier> {
  private suppliersApi = useSuppliers()

  async fetch(page = 1, pageSize = 10): Promise<{ items: Supplier[], pagination: BasePagination }> {
    console.log('SupplierService.fetch called with page:', page, 'pageSize:', pageSize)
    const result = await this.suppliersApi.fetchSuppliers(page, pageSize)
    console.log('SupplierService API response:', result)
    return {
      items: result.suppliers.map((supplier: Supplier) => ({
        ...supplier,
        id: Number(supplier.id)
      })),
      pagination: result.pagination
    }
  }

  async create(data: Omit<Supplier, 'id'>): Promise<{ item: Supplier }> {
    const result = await this.suppliersApi.createSupplier(data)
    return {
      item: {
        ...result.supplier,
        id: Number(result.supplier.id)
      }
    }
  }

  async update(id: number, data: Partial<Omit<Supplier, 'id'>>): Promise<{ item: Supplier }> {
    const result = await this.suppliersApi.updateSupplier(id, data)
    return {
      item: {
        ...result.supplier,
        id: Number(result.supplier.id)
      }
    }
  }

  async delete(id: number): Promise<void> {
    await this.suppliersApi.deleteSupplier(id)
  }
}

// Export singleton instance
export const supplierService = new SupplierService()
