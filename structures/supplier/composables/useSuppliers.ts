import type { Supplier } from '../stores/supplier'
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

export const useSuppliers = () => {
  const api = useApi()

  const fetchSuppliers = async (page = 1, pageSize = 10) => {
    console.log('useSuppliers.fetchSuppliers called with page:', page, 'pageSize:', pageSize)
    const result = await api.get(`/suppliers?page=${page}&limit=${pageSize}`)
    console.log('useSuppliers API response:', result)
    const total = result.pagination?.total || 0
    const pagination: BasePagination = {
      total: total,
      page: result.pagination?.page || 1,
      pageSize: pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize))
    }
    console.log('useSuppliers returning pagination:', pagination)
    return { suppliers: result.data, pagination }
  }

  const createSupplier = async (supplierData: Omit<Supplier, 'id'>) => {
    const result = await api.post('/suppliers', supplierData)
    return { supplier: result.data }
  }

  const updateSupplier = async (id: number, supplierData: Partial<Omit<Supplier, 'id'>>) => {
    const result = await api.put(`/suppliers/${id}`, supplierData)
    return { supplier: result.data }
  }

  const deleteSupplier = async (id: number) => {
    await api.delete(`/suppliers/${id}`)
  }

  return {
    fetchSuppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier
  }
}
