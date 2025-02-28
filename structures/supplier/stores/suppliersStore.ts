//pinia store for Suppliers

// Add TypeScript declaration for import.meta.client
declare global {
  interface ImportMeta {
    client: boolean
  }
}

import type { Supplier } from './supplier'
import { defineBaseStore, type BaseItem } from '@@/app/stores/baseStore'
import { supplierService } from '../services/supplierService'

const VIEW_MODE_KEY = 'suppliers_view_mode'

// Create the base Suppliers store with the supplier service
export const useSuppliersStore = defineBaseStore<Supplier>('suppliers', VIEW_MODE_KEY, supplierService)

// Adding specialized methods to the store
// Instead of extending, we'll use the store object directly
// and add our specialized methods that call the base methods

// Add these helper methods to provide more descriptive names
export function fetchSuppliers(page = 1, pageSize?: number): Promise<void> {
  console.log('fetchSuppliers called with page:', page, 'pageSize:', pageSize)
  const store = useSuppliersStore()
  return store.fetch(page, pageSize)
}

export function createSupplier(supplierData: Omit<Supplier, 'id'>): Promise<Supplier> {
  const store = useSuppliersStore()
  return store.create(supplierData)
}

export function updateSupplierById(id: number, supplierData: Partial<Omit<Supplier, 'id'>>): Promise<Supplier> {
  const store = useSuppliersStore()
  return store.update(id, supplierData)
}

export function deleteSupplier(id: number): Promise<void> {
  const store = useSuppliersStore()
  return store.delete(id)
}
