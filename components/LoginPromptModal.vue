<template>
  <Transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="uiStore.isLoginPromptVisible" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click="uiStore.hideLoginPrompt()">
      <div class="relative bg-[#111827] rounded-2xl shadow-2xl w-full max-w-sm m-4 p-8 text-center transform transition-all border border-[#1F2937] overflow-hidden"
           @click.stop
      >
        <!-- Aurora background effect -->
        <div class="aurora-background"></div>
        <div class="flex flex-col items-center mb-4 relative z-10">
          <div class="p-3 rounded-full bg-gradient-to-r from-[#2563EB]/20 to-[#1D4ED8]/20 mb-4 ring-2 ring-[#1F2937]">
            <svg class="w-8 h-8 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-white mb-2">Log In to Continue</h2>
          <p class="text-[#D1D5DB] text-sm">
            Please log in or create an account to generate podcasts and access all VibeVoice features.
          </p>
        </div>
        <div class="flex flex-col gap-4 mt-8 relative z-10">
          <button
            @click="handleLogin"
            class="w-full py-3 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-lg shadow-lg shadow-blue-500/20 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 focus:ring-offset-[#111827]"
          >
            Log In / Sign Up
          </button>
          <button
            @click="uiStore.hideLoginPrompt()"
            class="w-full py-3 px-4 bg-[#1F2937] hover:bg-[#374151] text-[#D1D5DB] font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 focus:ring-offset-[#111827] border border-[#374151]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import { useUiStore } from '~/stores/ui'

const uiStore = useUiStore()

const handleLogin = () => {
  uiStore.hideLoginPrompt()
  // Use nextTick to ensure the modal is hidden before triggering the click
  nextTick(() => {
    const loginButton = document.getElementById('bindLogin')
    if (loginButton) {
      loginButton.click()
    } else {
      console.error('Login button with id "bindLogin" not found.')
      // Optionally, show a toast notification about the error
    }
  })
}
</script> 