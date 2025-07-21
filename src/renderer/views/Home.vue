<template>
  <div class="home-view">
    <!-- Loading Overlay -->
    <div v-if="mediaStore.isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p>Loading media library...</p>
    </div>

    <!-- Welcome Screen when no media available -->
    <WelcomeScreen 
      v-if="!mediaStore.selectedFolder && !mediaStore.isLoading"
      @select-folder="mediaStore.selectMediaFolder"
    />

    <!-- Main content -->
    <div v-else-if="!mediaStore.isLoading" class="main-content">
      <!-- Hero Section with Featured Content -->
      <HeroSection :featured-media="featuredMedia" />

      <!-- Recently Watched -->
      <MediaRow
        v-if="mediaStore.recentlyWatched.length > 0"
        title="Continue Watching"
        :items="mediaStore.recentlyWatched"
        type="continue"
        show-progress
      />

      <!-- Movies -->
      <MediaRow
        v-if="mediaStore.moviesSorted.length > 0"
        title="All Movies"
        subtitle="Sorted alphabetically"
        :items="mediaStore.moviesSorted"
        type="movies"
      />

      <!-- Series -->
      <MediaRow
        v-if="mediaStore.seriesSorted.length > 0"
        title="All Series"
        subtitle="Sorted alphabetically"
        :items="mediaStore.seriesSorted"
        type="series"
      />

      <!-- Statistics Footer -->
      <StatsFooter :stats="mediaStore.mediaStats" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useMediaStore } from '../stores/mediaStore'
import WelcomeScreen from '../components/WelcomeScreen.vue'
import HeroSection from '../components/HeroSection.vue'
import MediaRow from '../components/MediaRow.vue'
import StatsFooter from '../components/StatsFooter.vue'
import type { Movie, Series } from '../../domain/entities/MediaTypes'

const mediaStore = useMediaStore()

const featuredMedia = computed((): Movie | Series | null => {
  // Select random movie or first series for Hero Section
  const allContent = [
    ...mediaStore.mediaLibrary.movies,
    ...mediaStore.mediaLibrary.series
  ]
  
  if (allContent.length === 0) return null
  
  const randomIndex = Math.floor(Math.random() * allContent.length)
  return allContent[randomIndex]
})

onMounted(async () => {
  // Load data when component mounts
  if (mediaStore.selectedFolder) {
    await mediaStore.loadMediaLibrary()
  }
})
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  position: relative;
}

.main-content {
  padding-bottom: 60px;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #333;
  border-top: 4px solid #e50914;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

.loading-overlay p {
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
