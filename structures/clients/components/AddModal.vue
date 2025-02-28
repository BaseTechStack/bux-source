<template>
  <UModal 
    v-model:open="isOpen" 
    :title="title || 'New Client'"
    :description="description || 'Add a new client to your system'"
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
          variant="ghost"
          @click="closeModal"
        >
          Cancel
        </UButton>
        <UButton
          color="primary"
          :loading="loading"
          @click="handleSubmit"
        >
          Save
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useClientsStore } from '../stores/clientsStore'

const props = defineProps<{
  open?: boolean
  title?: string
  description?: string
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  'close': []
  'added': []
}>()

const store = useClientsStore()
const { loading } = storeToRefs(store)

const formData = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  company: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
})

const isOpen = computed({
  get: () => {
    console.log('ClientsAddModal - isOpen getter:', props.open);
    return props.open;
  },
  set: (value) => {
    console.log('ClientsAddModal - isOpen setter:', value);
    emit('update:open', value);
  }
})

const closeModal = () => {
  isOpen.value = false
  emit('close')
  formData.value = {
    name: '',
    email: '',
    phone: '',
    address: '',
    company: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}

const handleSubmit = async () => {
  try {
    await store.createClient(formData.value)
    closeModal()
    emit('added')
  } catch (err) {
    // Error is handled by the store
  }
}
</script>