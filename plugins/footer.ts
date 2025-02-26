 import { defineNuxtPlugin, useNuxtApp } from '#app'
import { ref } from 'vue'
import type { Ref, Component } from 'vue'

// Extend the Nuxt app interface to include our footer methods
declare module '#app' {
  interface NuxtApp {
    $footerComponentName: Ref<string | null>
    $footerProps: Ref<Record<string, any>>
    $setFooterContent: (componentName: string, props?: Record<string, any>) => void
    $clearFooterContent: () => void
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  // Create reactive references
  const footerComponentName = ref<string | null>(null)
  const footerProps = ref<Record<string, any>>({})

  // Method to set the footer content
  const setFooterContent = (componentName: string, props: Record<string, any> = {}) => {
    footerComponentName.value = componentName
    footerProps.value = props
  }

  // Method to clear the footer content
  const clearFooterContent = () => {
    footerComponentName.value = null
  }

  // Add the footer content and methods to the Nuxt app context
  nuxtApp.provide('footerComponentName', footerComponentName)
  nuxtApp.provide('footerProps', footerProps)
  nuxtApp.provide('setFooterContent', setFooterContent)
  nuxtApp.provide('clearFooterContent', clearFooterContent)
})
