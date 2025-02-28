import type { BaseItem } from '@@/app/stores/baseStore'

export interface Client extends BaseItem {
  firstName: string
  lastName: string
  email: string
  phone: string
  createdAt: string
  updatedAt: string
  // Add any additional fields as needed
}
