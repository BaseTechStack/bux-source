<template>
  <div class="p-4">
    <USkeleton v-if="loading" class="h-96" />
    
    <UAlert v-else-if="error" :description="error" color="error" variant="soft" />
    
    <div v-else>
      <div class="flex items-center gap-2 p-2 mb-4">
        <UInput
          v-model="search"
          icon="i-heroicons-magnifying-glass"
          placeholder="Search clients..."
          size="sm"
          class="max-w-sm"
        />
      </div>
      
      <UTable :data="clients" :columns="columns" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Client } from '../../stores/client'
import { ref, h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

interface Props {
  clients: Client[]
  loading?: boolean
  error?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: null
})

const emit = defineEmits<{
  (e: 'edit', client: Client): void
  (e: 'delete', client: Client): void
  (e: 'view', client: Client): void
}>()

const search = ref('')

const BaseCrudActions = resolveComponent('BaseCrudActions')

const columns: TableColumn<Client>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'phone',
    header: 'Phone'
  },
  {
    accessorKey: 'actions',
    header: () => h('div', { class: 'text-right' }, 'Actions'),
    cell: ({ row }) => {
      return h('div', { class: 'flex justify-end gap-2' }, [
        h(BaseCrudActions, {
          structure: 'clients',
          item: row.original,
          actions: 'view,edit,delete',
          onView: () => emit('view', row.original),
          onEdit: () => emit('edit', row.original),
          onDelete: () => emit('delete', row.original)
        })
      ])
    }
  }
]
</script>