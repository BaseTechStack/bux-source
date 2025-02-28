import type { BaseItem } from '@@/app/stores/baseStore'

export interface Supplier extends BaseItem {
  name: string;
  contact: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  createdAt: string;
  updatedAt: string;
  // Add any additional fields as needed
}
