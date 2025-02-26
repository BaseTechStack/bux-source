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
          v-model:pageSize="pageSize"
          :options="store.viewMode === 'grid' ? [12, 24, 36, 48] : [10, 20, 50, 100]"
          @update:pageSize="handlePageSizeChange"
        />
        <BasePagination
          :total="pagination.total"
          :page="currentPage"
          :pageSize="pageSize"
          @update:page="handlePageChange"
        />
      </div>
      <ModeGrid 
        v-if="store.viewMode === 'grid'" 
        :clients="clients" 
        @edit="editClient" 
        @delete="deleteClient" 
        @view="viewClient"
        :current-page="currentPage"
        :page-size="pageSize"
      />
      <ModeTable 
        v-else 
        :clients="clients" 
        @edit="editClient" 
        @delete="deleteClient" 
        @view="viewClient"
        :current-page="currentPage"
        :page-size="pageSize"
      />
      
    
      
      <!-- Modals -->
      <ClientsAddModal 
        v-model:open="modalState.add.isOpen" 
        @close="closeModal('add')"
        @added="store.fetchClients"
        title="New Client"
        description="Add a new client to your system"
      />
      
      <ClientsEditModal 
        v-model:open="modalState.edit.isOpen" 
        :item="modalState.edit.item"
        @close="closeModal('edit')"
        title="Edit Client"
        description="Update client information"
      />
      
      <ClientsViewModal 
        v-model:open="modalState.view.isOpen" 
        :item="modalState.view.item"
        @close="closeModal('view')"
        title="View Client"
        description="View client details"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useClientsStore } from '../../stores/clientsStore'
import type { Client } from '../../stores/client'
import ClientsAddModal from '../../components/ClientsAddModal.vue'
import ClientsEditModal from '../../components/ClientsEditModal.vue'
import ClientsViewModal from '../../components/ClientsViewModal.vue'
   
const store = useClientsStore()
const { clients, pagination } = storeToRefs(store)

// Define proper types for modal state
interface ModalState {
  add: { isOpen: boolean };
  edit: { isOpen: boolean; item: Client | null };
  view: { isOpen: boolean; item: Client | null };
}

const modalState = ref<ModalState>({
  add: { isOpen: false },
  edit: { isOpen: false, item: null },
  view: { isOpen: false, item: null },
})

const currentPage = ref(1)
const pageSize = ref(10)

onMounted(async () => {
  if (!store.viewMode) {
    store.setViewMode('grid') // Set default view mode if not set
  }
  await store.fetchClients()
  // Initialize currentPage from store
  currentPage.value = pagination.value.page
  pageSize.value = pagination.value.pageSize
})

// Watch for pagination changes from the store
watch(() => pagination.value, (newPagination) => {
  currentPage.value = newPagination.page
  pageSize.value = newPagination.pageSize
}, { deep: true })

// Watch for view mode changes to adjust page size
watch(() => store.viewMode, async (newMode) => {
  // Adjust page size based on view mode
  const newPageSize = newMode === 'grid' ? 12 : 10
  if (pageSize.value !== newPageSize) {
    await store.setPageSize(newPageSize)
  }
}, { immediate: true })

// Watch for local page size changes
watch(() => pageSize.value, async (newSize, oldSize) => {
  if (oldSize && newSize !== oldSize) {
    await store.setPageSize(newSize)
  }
})

const editClient = (client: Client) => {
  modalState.value.edit.isOpen = true
  modalState.value.edit.item = client
}

const viewClient = (client: Client) => {
  modalState.value.view.isOpen = true
  modalState.value.view.item = client
}

const deleteClient = async (client: Client) => {
  if (confirm('Are you sure you want to delete this client?')) {
    await store.deleteClient(client.id)
  }
}

const closeModal = (type: 'add' | 'edit' | 'view') => {
  modalState.value[type].isOpen = false
  if (type !== 'add') {
    modalState.value[type].item = null
  }
}

const handlePageChange = async (page: number) => {
  currentPage.value = page
  await store.fetchClients(page, pageSize.value)
}

const handlePageSizeChange = async (size: number) => {
  await store.setPageSize(size)
}

// Initialize pageSize from store
onMounted(() => {
  pageSize.value = store.pagination.pageSize
})

// Watch for store pagination changes
watch(() => store.pagination.pageSize, (newSize) => {
  if (newSize !== pageSize.value) {
    pageSize.value = newSize
  }
})

// Watch for view mode changes
watch(() => store.viewMode, (newMode) => {
  const defaultSize = newMode === 'grid' ? 12 : 10
  if (pageSize.value !== defaultSize) {
    handlePageSizeChange(defaultSize)
  }
})
</script>
