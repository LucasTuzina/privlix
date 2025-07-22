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
      :class="{ 'hide-cursor': !showCursor && !showControls }"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
      @mouseenter="handleMouseEnter"
    >
      <video
        ref="videoElement"
        :src="videoUrl"
        autoplay
        class="video-element"
        @loadedmetadata="handleVideoLoaded"
        @timeupdate="handleTimeUpdate"
        @ended="handleVideoEnded"
        @click="togglePlayPause"
        controlslist="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
      >
        {{ $t('videoPlayer.unsupportedBrowser') }}
      </video>

      <!-- Custom Controls Overlay -->
      <div
        class="controls-overlay"
        :class="{ visible: showControls }"
      >
        <!-- Top Bar: Title + Back Button -->
        <div class="top-bar">
          <div class="video-info">
            <h2>{{ getMediaTitle(currentMedia) }}</h2>
            <p v-if="getMediaSubtitle(currentMedia)">{{ getMediaSubtitle(currentMedia) }}</p>
          </div>
          <button
            @click="goBack"
            class="back-button"
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

        <!-- Bottom Bar: Progress + Controls -->
        <div class="bottom-bar">
          <!-- Custom Progress Bar -->
          <div
            class="progress-container"
            @click="seekToPosition"
          >
            <div class="progress-track">
              <div
                class="progress-filled"
                :style="{ width: `${progressPercentage}%` }"
              ></div>
              <div
                class="progress-thumb"
                :style="{ left: `${progressPercentage}%` }"
              ></div>
            </div>
          </div>

          <!-- Time Display -->
          <div class="time-display">
            <span>{{ formatTime(currentTime) }}</span>
            <span>/</span>
            <span>{{ formatTime(duration) }}</span>
          </div>

          <!-- Control Buttons -->
          <div class="control-buttons">
            <button
              @click="togglePlayPause"
              class="control-btn play-pause"
            >
              <svg
                v-if="isPaused"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <svg
                v-else
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </button>

            <button
              @click="toggleMute"
              class="control-btn volume"
            >
              <svg
                v-if="isMuted"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
                />
              </svg>
              <svg
                v-else
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
                />
              </svg>
            </button>

            <button
              @click="toggleFullscreen"
              class="control-btn fullscreen"
            >
              <svg
                v-if="!isFullscreen"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                />
              </svg>
              <svg
                v-else
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
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

  // Control states
  const showControls = ref(true)
  const showCursor = ref(true)
  const isPaused = ref(false)
  const isMuted = ref(false)
  const isFullscreen = ref(false)
  let controlsTimeout: ReturnType<typeof setTimeout> | null = null
  let cursorTimeout: ReturnType<typeof setTimeout> | null = null

  // Computed properties
  const videoUrl = computed(() => {
    return currentMedia.value ? mediaStore.getVideoUrl(currentMedia.value.filePath) : ''
  })

  const progressPercentage = computed(() => {
    if (duration.value === 0) return 0
    return (currentTime.value / duration.value) * 100
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
    if (media.type === 'episode' && media.seriesName) {
      return `${media.seriesName} - S${media.seasonNumber}E${media.episodeNumber}`
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

  // Control handlers
  const togglePlayPause = (): void => {
    if (!videoElement.value) return

    if (videoElement.value.paused) {
      videoElement.value.play()
      isPaused.value = false
    } else {
      videoElement.value.pause()
      isPaused.value = true
    }
  }

  const toggleMute = (): void => {
    if (!videoElement.value) return

    videoElement.value.muted = !videoElement.value.muted
    isMuted.value = videoElement.value.muted
  }

  const toggleFullscreen = (): void => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      isFullscreen.value = true
    } else {
      document.exitFullscreen()
      isFullscreen.value = false
    }
  }

  const seekToPosition = (event: MouseEvent): void => {
    if (!videoElement.value || !duration.value) return

    const progressContainer = event.currentTarget as HTMLElement
    const rect = progressContainer.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const percentage = clickX / rect.width
    const newTime = percentage * duration.value

    videoElement.value.currentTime = newTime
    currentTime.value = newTime
  }

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  // Mouse/Control visibility handlers
  const handleMouseMove = (): void => {
    showControls.value = true
    showCursor.value = true

    // Clear existing timeouts
    if (controlsTimeout) {
      clearTimeout(controlsTimeout)
    }
    if (cursorTimeout) {
      clearTimeout(cursorTimeout)
    }

    // Hide controls after 3 seconds if playing
    controlsTimeout = setTimeout(() => {
      if (!isPaused.value && !isFullscreen.value) {
        showControls.value = false
      }
    }, 3000)

    // Hide cursor after 2 seconds if playing and not hovering controls
    cursorTimeout = setTimeout(() => {
      if (!isPaused.value) {
        showCursor.value = false
      }
    }, 2000)
  }

  const handleMouseEnter = (): void => {
    showControls.value = true
    showCursor.value = true
  }

  const handleMouseLeave = (): void => {
    if (!isPaused.value) {
      showControls.value = false
      showCursor.value = false
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
        togglePlayPause()
        break
      case 'Escape':
        if (document.fullscreenElement) {
          toggleFullscreen()
        } else {
          goBack()
        }
        break
      case 'KeyF':
        event.preventDefault()
        toggleFullscreen()
        break
      case 'KeyM':
        event.preventDefault()
        toggleMute()
        break
    }
  }

  // Track play/pause state
  const updatePlayPauseState = (): void => {
    if (videoElement.value) {
      isPaused.value = videoElement.value.paused

      if (isPaused.value) {
        // When paused, always show controls and cursor
        showControls.value = true
        showCursor.value = true

        // Clear any existing timeouts
        if (controlsTimeout) {
          clearTimeout(controlsTimeout)
        }
        if (cursorTimeout) {
          clearTimeout(cursorTimeout)
        }
      } else {
        // When playing, start auto-hide timers
        handleMouseMove()
      }
    }
  }

  onMounted(() => {
    loadMedia()
    document.addEventListener('keydown', handleKeyPress)

    // Listen for fullscreen changes
    document.addEventListener('fullscreenchange', () => {
      isFullscreen.value = !!document.fullscreenElement
    })
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyPress)
    document.removeEventListener('fullscreenchange', () => {})

    // Clear all timeouts
    if (controlsTimeout) {
      clearTimeout(controlsTimeout)
    }
    if (cursorTimeout) {
      clearTimeout(cursorTimeout)
    }
  })

  // Watch for video element changes to add event listeners
  watch(videoElement, (newVideoElement: HTMLVideoElement | null) => {
    if (newVideoElement) {
      newVideoElement.addEventListener('play', updatePlayPauseState)
      newVideoElement.addEventListener('pause', updatePlayPauseState)
      newVideoElement.addEventListener('volumechange', () => {
        isMuted.value = newVideoElement.muted
      })
    }
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
    cursor: default;
  }

  .player-container.hide-cursor {
    cursor: none;
  }

  .video-element {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: var(--text-black);
  }

  /* Remove native controls completely */
  .video-element::-webkit-media-controls {
    display: none !important;
  }

  .video-element::-webkit-media-controls-enclosure {
    display: none !important;
  }

  /* Custom Controls Overlay */
  .controls-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    opacity: 0;
    transition: opacity var(--transition-normal);
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.8) 0%,
      transparent 20%,
      transparent 80%,
      rgba(0, 0, 0, 0.9) 100%
    );
  }

  .controls-overlay.visible {
    opacity: 1;
    pointer-events: auto;
  }

  /* Top Bar */
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: var(--spacing-lg);
  }

  .video-info {
    flex: 1;
    color: var(--text-primary);
  }

  .video-info h2 {
    margin: 0 0 var(--spacing-sm) 0;
    font-size: var(--font-2xl);
    font-weight: var(--font-bold);
    text-shadow: 0 2px 4px var(--shadow-heavy);
  }

  .video-info p {
    margin: 0;
    font-size: var(--font-base);
    color: var(--text-secondary);
    text-shadow: 0 1px 2px var(--shadow-heavy);
  }

  .back-button {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-lg);
    background: rgba(0, 0, 0, 0.7);
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

  /* Bottom Bar */
  .bottom-bar {
    padding: var(--spacing-lg);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  /* Progress Bar */
  .progress-container {
    cursor: pointer;
    padding: var(--spacing-sm) 0;
  }

  .progress-track {
    position: relative;
    height: 6px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-filled {
    height: 100%;
    background: var(--privlix-red);
    border-radius: 3px;
    transition: width 0.1s ease;
  }

  .progress-thumb {
    position: absolute;
    top: -3px;
    width: 12px;
    height: 12px;
    background: var(--privlix-red);
    border-radius: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity var(--transition-normal);
  }

  .progress-container:hover .progress-thumb {
    opacity: 1;
  }

  /* Control Buttons Row */
  .control-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .time-display {
    color: var(--text-primary);
    font-size: var(--font-sm);
    font-weight: var(--font-medium);
    text-shadow: 0 1px 2px var(--shadow-heavy);
    display: flex;
    gap: var(--spacing-xs);
  }

  .control-btn {
    width: 48px;
    height: 48px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
    backdrop-filter: blur(10px);
  }

  .control-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  .control-btn:active {
    transform: scale(0.95);
  }

  .control-btn svg {
    width: 24px;
    height: 24px;
  }

  .play-pause {
    width: 56px;
    height: 56px;
    background: var(--privlix-red);
  }

  .play-pause:hover {
    background: var(--privlix-red-hover);
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
    .top-bar {
      padding: var(--spacing-md);
    }

    .bottom-bar {
      padding: var(--spacing-md);
    }

    .video-info h2 {
      font-size: var(--font-xl);
    }

    .video-info p {
      font-size: var(--font-sm);
    }

    .back-button {
      padding: var(--spacing-sm) var(--spacing-md);
      font-size: var(--font-sm);
    }

    .back-button svg {
      width: 20px;
      height: 20px;
    }

    .control-btn {
      width: 40px;
      height: 40px;
    }

    .play-pause {
      width: 48px;
      height: 48px;
    }

    .control-btn svg {
      width: 20px;
      height: 20px;
    }
  }

  /* Fullscreen optimizations */
  .player-container:fullscreen {
    cursor: default;
  }

  .player-container:fullscreen.hide-cursor {
    cursor: none;
  }

  .player-container:fullscreen .controls-overlay:not(.visible) {
    cursor: none;
  }
</style>
