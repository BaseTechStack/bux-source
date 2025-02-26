export interface Client {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  company?: string
  createdAt: string
  updatedAt: string
  // Add any additional fields as needed
}

export interface BasePagination {
  total: number
  page: number
  pageSize: number
  totalPages: number
}
