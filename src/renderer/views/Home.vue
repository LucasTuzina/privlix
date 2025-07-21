<template>
  <div class="home-view">
    <!-- Loading Overlay -->
    <div
      v-if="mediaStore.isLoading"
      class="loading-overlay"
    >
      <div class="loading-spinner" />
      <p>{{ $t('loading.mediaLibrary') }}</p>
    </div>

    <!-- Welcome Screen when no media available -->
    <WelcomeScreen
      v-if="!mediaStore.selectedFolder && !mediaStore.isLoading"
      @select-folder="mediaStore.selectMediaFolder"
    />

    <!-- Main content -->
    <div
      v-else-if="!mediaStore.isLoading"
      class="content-wrapper"
    >
      <!-- Hero Section with Featured Content -->
      <HeroSection
        :featured-media="featuredMedia"
        @play-media="handlePlayMedia"
        @show-info="handleShowInfo"
      />

      <!-- Content sections with proper padding -->
      <div class="content-sections">
        <!-- Recently Watched -->
        <MediaRow
          v-if="mediaStore.recentlyWatched.length > 0"
          :title="$t('mediaRows.continueWatching')"
          :items="mediaStore.recentlyWatched"
          type="continue"
          show-progress
          @media-select="handleMediaSelect"
        />

        <!-- Movies -->
        <MediaRow
          v-if="mediaStore.moviesSorted.length > 0"
          :title="$t('mediaRows.allMovies')"
          :subtitle="$t('mediaRows.sortedAlphabetically')"
          :items="mediaStore.moviesSorted"
          type="movies"
          @media-select="handleMediaSelect"
        />

        <!-- Series -->
        <MediaRow
          v-if="mediaStore.seriesSorted.length > 0"
          :title="$t('mediaRows.allSeries')"
          :subtitle="$t('mediaRows.sortedAlphabetically')"
          :items="mediaStore.seriesSorted"
          type="series"
          @media-select="handleMediaSelect"
        />

        <!-- Statistics Footer -->
        <StatsFooter :stats="mediaStore.mediaStats" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useMediaStore } from '../stores/mediaStore'
  import WelcomeScreen from '../components/WelcomeScreen.vue'
  import HeroSection from '../components/HeroSection.vue'
  import MediaRow from '../components/MediaRow.vue'
  import StatsFooter from '../components/StatsFooter.vue'
  import type { MediaItem, MediaCollection } from '../../shared/types/MediaTypes'

  const mediaStore = useMediaStore()
  const router = useRouter()

  // State für ausgewähltes featured Media
  const selectedFeaturedMedia = ref<MediaItem | MediaCollection | null>(null)

  const featuredMedia = computed((): MediaItem | MediaCollection | null => {
    // Wenn ein Media ausgewählt wurde, zeige das an
    if (selectedFeaturedMedia.value) {
      return selectedFeaturedMedia.value
    }

    // Sonst zeige random movie oder first series for Hero Section
    const allContent = [...mediaStore.mediaLibrary.movies, ...mediaStore.mediaLibrary.series]

    if (allContent.length === 0) return null

    const randomIndex = Math.floor(Math.random() * allContent.length)
    return allContent[randomIndex]
  })

  // Handler für Media-Auswahl aus MediaRow
  const handleMediaSelect = (media: MediaItem | MediaCollection): void => {
    // Setze das Media als featured
    selectedFeaturedMedia.value = media

    // Optional: Automatisch abspielen nach kurzer Verzögerung
    setTimeout(() => {
      handlePlayMedia(media)
    }, 100)
  }

  // Handler für Play Button im HeroSection
  const handlePlayMedia = (media: MediaItem | MediaCollection): void => {
    console.log('Playing media:', media)

    if ('filePath' in media) {
      // Single MediaItem - navigiere zum Player mit URL-encoded ID
      const encodedId = encodeURIComponent(media.id)
      router.push(`/player/${encodedId}`)
    } else if ('episodes' in media && media.episodes.length > 0) {
      // MediaCollection - spiele erste Episode ab
      const firstEpisode = media.episodes[0]
      const encodedId = encodeURIComponent(firstEpisode.id)
      router.push(`/player/${encodedId}`)
    }
  } // Handler für More Info Button im HeroSection
  const handleShowInfo = (media: MediaItem | MediaCollection): void => {
    console.log('Showing info for:', media)
    // TODO: Show detailed info modal or navigate to detail page
  }

  onMounted(async () => {
    // Load data when component mounts
    if (mediaStore.selectedFolder) {
      await mediaStore.loadMediaLibrary()
    }
  })
</script>

<style scoped>
  .home-view {
    position: relative;
  }

  .content-wrapper {
    padding-bottom: var(--spacing-2xl);
  }

  .content-sections {
    padding: 0 var(--spacing-lg);
  }

  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bg-overlay);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: var(--z-modal);
    backdrop-filter: blur(4px);
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

  .loading-overlay p {
    color: var(--text-primary);
    font-size: var(--font-lg);
    font-weight: var(--font-medium);
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
