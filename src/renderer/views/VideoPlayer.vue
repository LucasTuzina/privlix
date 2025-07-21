<template>
  <div class="video-player">
    <!-- Loading State -->
    <div
      v-if="isLoading"
      class="loading-state"
    >
      <div class="loading-spinner" />
      <h1>{{ $t('videoPlayer.title') }}</h1>
      <p>{{ $t('videoPlayer.loading') }}</p>
    </div>

    <!-- Error State -->
    <div
      v-else-if="!currentMedia"
      class="error-state"
    >
      <h1>{{ $t('videoPlayer.error') }}</h1>
      <p>{{ $t('videoPlayer.mediaNotFound') }}</p>
      <button
        @click="goBack"
        class="back-button"
      >
        {{ $t('common.back') }}
      </button>
    </div>

    <!-- Video Player -->
    <div
      v-else
      class="player-container"
    >
      <video
        ref="videoElement"
        :src="videoUrl"
        controls
        autoplay
        class="video-element"
        @loadedmetadata="handleVideoLoaded"
        @timeupdate="handleTimeUpdate"
        @ended="handleVideoEnded"
      >
        {{ $t('videoPlayer.unsupportedBrowser') }}
      </video>

      <!-- Video Info Overlay -->
      <div class="video-info">
        <h2>{{ getMediaTitle(currentMedia) }}</h2>
        <p v-if="getMediaSubtitle(currentMedia)">{{ getMediaSubtitle(currentMedia) }}</p>
      </div>

      <!-- Back Button -->
      <button
        @click="goBack"
        class="back-button floating"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.42-1.41L7.83 13H20v-2z" />
        </svg>
        {{ $t('common.back') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useMediaStore } from '../stores/mediaStore'
  import type { MediaItem } from '../../shared/types/MediaTypes'

  interface Props {
    id?: string
  }

  const props = defineProps<Props>()
  const router = useRouter()
  const mediaStore = useMediaStore()

  // Reactive state
  const isLoading = ref(true)
  const currentMedia = ref<MediaItem | null>(null)
  const videoElement = ref<HTMLVideoElement | null>(null)
  const currentTime = ref(0)
  const duration = ref(0)

  // Computed properties
  const videoUrl = computed(() => {
    return currentMedia.value ? mediaStore.getVideoUrl(currentMedia.value.filePath) : ''
  })

  // Load media data
  const loadMedia = async (): Promise<void> => {
    if (!props.id) {
      isLoading.value = false
      return
    }

    isLoading.value = true
    try {
      // Dekodiere die URL-encoded ID zurück zum ursprünglichen Pfad
      const decodedId = decodeURIComponent(props.id)
      const media = mediaStore.getMediaById(decodedId)
      if (media) {
        currentMedia.value = media
      }
    } catch (error) {
      console.error('Error loading media:', error)
    } finally {
      isLoading.value = false
    }
  }

  // Media title and subtitle helpers
  const getMediaTitle = (media: MediaItem): string => {
    return media.title || 'Unknown Title'
  }

  const getMediaSubtitle = (media: MediaItem): string => {
    if (media.type === 'episode' && 'seriesName' in media) {
      const episode = media as any
      return `${episode.seriesName} - S${episode.seasonNumber}E${episode.episodeNumber}`
    }
    return ''
  }

  // Video event handlers
  const handleVideoLoaded = (): void => {
    if (videoElement.value) {
      duration.value = videoElement.value.duration
    }
  }

  const handleTimeUpdate = (): void => {
    if (videoElement.value && currentMedia.value) {
      currentTime.value = videoElement.value.currentTime

      // Update watch progress every 30 seconds
      if (Math.floor(currentTime.value) % 30 === 0) {
        mediaStore.updateWatchProgress(
          currentMedia.value.filePath,
          currentTime.value,
          duration.value
        )
      }
    }
  }

  const handleVideoEnded = (): void => {
    if (currentMedia.value) {
      // Mark as completed
      mediaStore.updateWatchProgress(currentMedia.value.filePath, duration.value, duration.value)
    }
  }

  // Navigation
  const goBack = (): void => {
    router.push('/')
  }

  // Lifecycle
  onMounted(() => {
    loadMedia()
  })

  // Keyboard shortcuts
  const handleKeyPress = (event: KeyboardEvent): void => {
    if (!videoElement.value) return

    switch (event.code) {
      case 'Space':
        event.preventDefault()
        if (videoElement.value.paused) {
          videoElement.value.play()
        } else {
          videoElement.value.pause()
        }
        break
      case 'Escape':
        goBack()
        break
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeyPress)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyPress)
  })
</script>

<style scoped>
  .video-player {
    min-height: 100vh;
    background: var(--text-black);
    display: flex;
    flex-direction: column;
    position: relative;
  }

  /* Loading State */
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
  }

  .loading-spinner {
    width: 60px;
    height: 60px;
    border: 4px solid var(--bg-tertiary);
    border-top: 4px solid var(--privlix-red);
    border-radius: var(--radius-round);
    animation: spin 1s linear infinite;
    margin-bottom: var(--spacing-lg);
  }

  /* Error State */
  .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
    color: var(--text-primary);
  }

  /* Player Container */
  .player-container {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .video-element {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: var(--text-black);
  }

  /* Video Info Overlay */
  .video-info {
    position: absolute;
    top: var(--spacing-lg);
    left: var(--spacing-lg);
    z-index: var(--z-dropdown);
    color: var(--text-primary);
    text-shadow: 0 2px 4px var(--shadow-heavy);
    opacity: 0;
    transition: opacity var(--transition-normal);
    pointer-events: none;
  }

  .player-container:hover .video-info {
    opacity: 1;
  }

  .video-info h2 {
    margin: 0 0 var(--spacing-sm) 0;
    font-size: var(--font-2xl);
    font-weight: var(--font-bold);
  }

  .video-info p {
    margin: 0;
    font-size: var(--font-base);
    color: var(--text-secondary);
  }

  /* Back Button */
  .back-button {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-lg);
    background: var(--bg-overlay);
    border: none;
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-size: var(--font-base);
    cursor: pointer;
    transition: all var(--transition-normal);
    backdrop-filter: blur(10px);
  }

  .back-button:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: scale(1.05);
  }

  .back-button.floating {
    position: absolute;
    top: var(--spacing-lg);
    right: var(--spacing-lg);
    z-index: var(--z-dropdown);
    opacity: 0;
    transition: opacity var(--transition-normal);
  }

  .player-container:hover .floating {
    opacity: 1;
  }

  /* General text styles */
  h1 {
    color: var(--text-primary);
    font-size: var(--font-3xl);
    margin-bottom: var(--spacing-md);
  }

  p {
    color: var(--text-tertiary);
    font-size: var(--font-lg);
    margin-bottom: var(--spacing-md);
  }

  /* Animations */
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* Mobile Responsive */
  @media (max-width: 768px) {
    .video-info {
      top: var(--spacing-sm);
      left: var(--spacing-sm);
    }

    .video-info h2 {
      font-size: var(--font-xl);
    }

    .video-info p {
      font-size: var(--font-sm);
    }

    .back-button.floating {
      top: var(--spacing-sm);
      right: var(--spacing-sm);
      padding: var(--spacing-sm) var(--spacing-md);
      font-size: var(--font-sm);
    }

    .back-button svg {
      width: 20px;
      height: 20px;
    }
  }
</style>
