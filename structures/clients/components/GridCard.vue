<!-- Generic GridCard component -->
<template>
  <UCard 
    :class="[
      'grid-card',
      `grid-card--${size}`,
      { 'grid-card--hover': hover }
    ]" 
    :ui="{
      body: 'p-0',
      header: 'p-4',
      footer: 'p-4'
    }"
  >
    <template #header>
      <slot name="header">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold line-clamp-1">{{ computedTitle }}</h3>
            <p v-if="computedSubtitle" class="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{{ computedSubtitle }}</p>
          </div>
          <slot name="actions"></slot>
        </div>
      </slot>
    </template>
    
    <div class="grid-card-content p-4">
      <slot name="content">
        <div class="space-y-3">
          <div 
            v-for="(field, index) in displayFields" 
            :key="index"
            class="grid-card-field flex items-start gap-2"
          >
            <UIcon 
              v-if="field.icon" 
              :name="field.icon" 
              class="flex-shrink-0 mt-0.5 w-4 h-4 text-gray-500 dark:text-gray-400" 
            />
            <div class="flex-1 min-w-0">
              <div v-if="field.label" class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                {{ field.label }}
              </div>
              <div class="text-sm line-clamp-2" :class="field.valueClass">
                <slot :name="`field-${field.key}`" :value="getFieldValue(field.key)">
                  {{ formatFieldValue(field.key, getFieldValue(field.key), field.format) }}
                </slot>
              </div>
            </div>
          </div>
        </div>
      </slot>
    </div>

    <template #footer>
      <slot name="footer">
        <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div v-if="computedTimestamp" class="flex items-center gap-1">
            <UIcon name="i-heroicons-clock" class="w-3.5 h-3.5" />
            {{ formatDate(computedTimestamp) }}
          </div>
          <slot name="footer-actions"></slot>
        </div>
      </slot>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Field {
  key: string;
  label?: string;
  icon?: string;
  format?: string;
  valueClass?: string;
}

interface Props {
  /**
   * The data object to display
   */
  item: Record<string, any>;
  
  /**
   * The title of the card (can be a field key from the item)
   */
  title?: string;
  
  /**
   * The subtitle of the card (can be a field key from the item)
   */
  subtitle?: string;
  
  /**
   * Fields to display in the card
   */
  fields?: Field[];
  
  /**
   * Timestamp field to display in the footer
   */
  timestamp?: string;
  
  /**
   * Card size variant
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Enable hover effects
   */
  hover?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  hover: true,
  fields: () => [],
});

// Computed properties
const displayFields = computed(() => {
  return props.fields;
});

const computedTitle = computed(() => {
  if (typeof props.title === 'string' && props.item && props.title in props.item) {
    return props.item[props.title];
  }
  return props.title;
});

const computedSubtitle = computed(() => {
  if (typeof props.subtitle === 'string' && props.item && props.subtitle in props.item) {
    return props.item[props.subtitle];
  }
  return props.subtitle;
});

const computedTimestamp = computed(() => {
  if (typeof props.timestamp === 'string' && props.item && props.timestamp in props.item) {
    return props.item[props.timestamp];
  }
  return props.timestamp;
});

// Methods
function getFieldValue(key: string): any {
  return props.item?.[key];
}

function formatFieldValue(key: string, value: any, format?: string): string {
  if (value === undefined || value === null) return '';
  
  if (format === 'date') {
    return formatDate(value);
  }
  
  if (format === 'currency') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }
  
  if (format === 'phone') {
    // Simple phone formatting
    return value.toString();
  }
  
  return value.toString();
}

function formatDate(date: string | Date): string {
  if (!date) return '';
  
  const dateObj = date instanceof Date ? date : new Date(date);
  
  // Check if the date is valid
  if (isNaN(dateObj.getTime())) return '';
  
  // Format the date
  return dateObj.toLocaleDateString(undefined, { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}
</script>