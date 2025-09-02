<template>
  <Transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="uiStore.isLoginPromptVisible" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click="uiStore.hideLoginPrompt()">
      <div class="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm m-4 p-8 text-center transform transition-all border border-gray-700/50"
           @click.stop
      >
        <div class="flex flex-col items-center mb-4">
          <div class="p-3 rounded-full bg-gradient-to-r from-[#6209F6]/20 to-[#00b8ff]/20 mb-4 ring-2 ring-gray-700">
            <svg class="w-8 h-8 text-gradient-to-r from-[#6209F6] via-[#DC8AF6] to-[#83D0FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-200 mb-2">Log In to Continue</h2>
          <p class="text-gray-400 text-sm">
            Please log in or create an account to generate videos and access all features.
          </p>
        </div>
        <div class="flex flex-col gap-4 mt-8">
          <button
            @click="handleLogin"
            class="w-full py-3 px-4  bg-gradient-to-r from-[#6209F6] via-[#DC8AF6] to-[#83D0FB] hover:to-[#6209F6]/70 text-white font-bold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#6209F6] focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Log In / Sign Up
          </button>
          <button
            @click="uiStore.hideLoginPrompt()"
            class="w-full py-3 px-4 bg-gray-700/50 hover:bg-gray-700/80 text-gray-300 font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6209F6] focus:ring-offset-2 focus:ring-offset-gray-800 border border-gray-600"
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