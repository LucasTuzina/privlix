<template>
  <div id="app">
    <!-- Startup Screen -->
    <StartupScreen
      v-if="showStartupScreen"
      @startup-complete="handleStartupComplete"
    />

    <!-- Main App Content (hidden during startup) -->
    <template v-else>
      <!-- Player Layout for fullscreen video -->
      <PlayerLayout v-if="isPlayerMode">
        <router-view />
      </PlayerLayout>

      <!-- Base Layout for all other pages -->
      <BaseLayout
        v-else
        :content-class="getContentClass"
        :layout-mode="getLayoutMode"
      >
        <router-view />
      </BaseLayout>
    </template>

    <!-- Notification System (always present) -->
    <NotificationContainer />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useMediaStore } from './stores/mediaStore'
  import StartupScreen from './components/StartupScreen.vue'
  import BaseLayout from './components/BaseLayout.vue'
  import PlayerLayout from './components/PlayerLayout.vue'
  import NotificationContainer from './components/NotificationContainer.vue'

  const route = useRoute()
  const mediaStore = useMediaStore()

  // Startup screen state
  const showStartupScreen = ref(true)

  const handleStartupComplete = (): void => {
    showStartupScreen.value = false
  }

  const isPlayerMode = computed(() => {
    return route.name === 'Player'
  })

  // Determine content class based on current route
  const getContentClass = computed(() => {
    if (route.name === 'Home') {
      return 'no-horizontal-padding'
    }
    return ''
  })

  // Determine layout mode based on current route
  const getLayoutMode = computed(() => {
    if (route.name === 'Home') {
      return 'overlay' // Content starts from top, behind navbar for hero background
    }
    return 'standard' // Content starts below navbar
  })

  // Load media library on app start
  mediaStore.loadMediaLibrary()
</script>

<style>
  /* Global Styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background-color: #141414;
    color: #ffffff;
    line-height: 1.6;
  }

  #app {
    min-height: 100vh;
    position: relative;
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #2a2a2a;
  }

  ::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #777;
  }

  /* Netflix-like Button Styles */
  .btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
  }

  .btn-primary {
    background-color: #e50914;
    color: white;
  }

  .btn-primary:hover {
    background-color: #f40612;
    transform: scale(1.05);
  }

  .btn-secondary {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
  }

  .btn-secondary:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  .btn-ghost {
    background-color: transparent;
    color: #ffffff;
    border: 2px solid rgba(255, 255, 255, 0.5);
  }

  .btn-ghost:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.8);
  }

  /* Grid Layout */
  .media-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    padding: 20px;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .media-grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 12px;
      padding: 15px;
    }
  }

  /* Loading States */
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #333;
    border-top: 4px solid #e50914;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* Transitions */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease;
  }

  .slide-enter-from {
    transform: translateX(-100%);
  }

  .slide-leave-to {
    transform: translateX(100%);
  }
</style>
