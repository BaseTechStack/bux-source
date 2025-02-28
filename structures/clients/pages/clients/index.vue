<template>
  <div>
    <div class="p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Clients</h1>
        <div class="flex items-center gap-4">
          <div class="flex items-center space-x-2">
            <UButtonGroup size="xl" class="border border-gray-200 dark:border-gray-800 rounded-md">
              <UButton
                :color="store.viewMode === 'grid' ? 'primary' : 'neutral'"
                @click="store.setViewMode('grid')"
                icon="i-heroicons-squares-2x2"
                variant="ghost"
                size="sm"
              />
              <UButton
                :color="store.viewMode === 'table' ? 'primary' : 'neutral'"
                @click="store.setViewMode('table')"
                icon="i-heroicons-table-cells"
                variant="ghost"
                size="sm"
              />
            </UButtonGroup>
          </div>
        
          <UButton
            color="primary"
            icon="i-heroicons-plus"
            @click="modalState.add.isOpen = true"
          >
            Add Client
          </UButton>
        </div>
      </div>
      
      <!-- Pagination -->
      <div class="mt-6 flex py-5 justify-between items-center">
        <BasePerPage
          :pageSize="store.pagination.pageSize"
          @update:pageSize="handlePageSizeChange"
          :options="store.viewMode === 'grid' ? [12, 24, 36, 48] : [10, 20, 50, 100]"
        />
      
        <BasePagination
          :total="store.pagination.total"
          :page="store.pagination.page"
          :items-per-page="store.pagination.pageSize"
          :total-pages="store.pagination.totalPages"
          @update:page="handlePageChange"
        />
      </div>

      <Grid 
        v-if="store.viewMode === 'grid'" 
        :clients="store.items" 
        @edit="editClient" 
        @delete="deleteClient" 
        @view="viewClient"
        :current-page="store.pagination.page"
        :page-size="store.pagination.pageSize"
      />
      <Table 
        v-else 
        :clients="store.items" 
        @edit="editClient" 
        @delete="deleteClient" 
        @view="viewClient"
        :current-page="store.pagination.page"
        :page-size="store.pagination.pageSize"
      />
      
      <!-- Modals -->
      <AddModal 
        v-model="modalState.add.isOpen" 
        @client-added="handleClientAdded"
      />
      
      <EditModal 
        v-model="modalState.edit.isOpen" 
        :item="modalState.edit.item"
        @client-updated="handleClientAdded"
      />
      
      <ViewModal 
        v-model="modalState.view.isOpen" 
        :item="modalState.view.item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useClientsStore, fetchClients } from '../../stores/clientsStore'
import type { Client } from '../../stores/client'

interface ModalState {
  add: {
    isOpen: boolean
  }
  edit: {
    isOpen: boolean
    item: Client | null
  }
  view: {
    isOpen: boolean
    item: Client | null
  }
}

const store = useClientsStore()

const modalState = ref<ModalState>({
  add: { isOpen: false },
  edit: { isOpen: false, item: null },
  view: { isOpen: false, item: null },
})

// Initialize data
onMounted(() => {
  fetchClients()
})

const editClient = (client: Client) => {
  modalState.value.edit.item = client
  modalState.value.edit.isOpen = true
}

const viewClient = (client: Client) => {
  modalState.value.view.item = client
  modalState.value.view.isOpen = true
}

const deleteClient = (client: Client) => {
  if (confirm(`Are you sure you want to delete ${client.firstName} ${client.lastName}?`)) {
    store.delete(client.id)
  }
}

const closeModal = (type: 'add' | 'edit' | 'view') => {
  modalState.value[type].isOpen = false
  if (type !== 'add') {
    modalState.value[type].item = null
  }
}

const handlePageChange = (page: number) => {
  console.log('ClientsPage: Page change event received with page:', page)
  fetchClients(page)
}

const handlePageSizeChange = async (size: number) => {
  // Store's setPageSize now automatically fetches data
  await store.setPageSize(size)
}

const handleClientAdded = () => {
  fetchClients(store.pagination.page)
}
</script>
