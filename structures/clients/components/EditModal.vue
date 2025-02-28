<template>
  <UModal 
    v-model:open="isOpen" 
    :title="title || 'Edit Client'"
    :description="description || 'Update client information'"
  >
    <template #body>
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <UFormField label="Name" required>
            <UInput v-model="formData.name" required />
          </UFormField>
          
          <UFormField label="Email" required>
            <UInput v-model="formData.email" type="email" required />
          </UFormField>
          
          <UFormField label="Phone">
            <UInput v-model="formData.phone" type="tel" />
          </UFormField>
          
          <UFormField label="Address">
            <UTextarea v-model="formData.address" />
          </UFormField>

          <UFormField label="Company">
            <UInput v-model="formData.company" />
          </UFormField>
        </div>
      </form>
    </template>

    <template #footer>
      <div class="flex justify-end gap-2">
        <UButton
          color="neutral"
          variant="soft"
          @click="closeModal"
        >
          Cancel
        </UButton>
        <UButton
          color="primary"
          :loading="loading"
          @click="handleSubmit"
        >
          Save Changes
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useClientsStore } from '../stores/clientsStore'
import type { Client } from '../stores/client'

interface Props {
  open?: boolean;
  item: Client | null;
  title?: string;
  description?: string;
}

const props = defineProps<Props>()
const emit = defineEmits(['update:open', 'close', 'updated'])

const store = useClientsStore()
const { loading } = storeToRefs(store)

const client = computed(() => props.item)

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  company: '',
})

watch(() => client.value, (newClient) => {
  if (newClient) {
    formData.name = newClient.name
    formData.email = newClient.email
    formData.phone = newClient.phone || ''
    formData.address = newClient.address || ''
    formData.company = newClient.company || ''
  }
}, { immediate: true })

const isOpen = computed({
  get() {
    return props.open
  },
  set(value) {
    emit('update:open', value)
  }
})

function closeModal() {
  isOpen.value = false
  emit('close')
}

async function handleSubmit() {
  if (!client.value) return
  
  try {
    await store.updateClientById(client.value.id, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      company: formData.company
    })
    
    closeModal()
    emit('updated')
  } catch (error) {
    console.error('Error updating client:', error)
  }
}
</script>