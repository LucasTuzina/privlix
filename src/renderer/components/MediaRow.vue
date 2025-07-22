<template>
  <div class="media-row">
    <div class="row-header">
      <h2>{{ title }}</h2>
      <p
        v-if="subtitle"
        class="subtitle"
      >
        {{ subtitle }}
      </p>
    </div>
    <div class="media-grid">
      <div
        v-for="item in items"
        :key="getItemKey(item)"
        class="media-item"
        @click="handleMediaClick(item)"
      >
        <div class="media-card">
          <div class="media-image">
            <img
              v-if="getThumbnail(item)"
              :src="getThumbnail(item)!"
              :alt="getTitle(item)"
            />
            <div
              v-else
              class="placeholder-image"
            >
              {{ getTitle(item).charAt(0).toUpperCase() }}
            </div>

            <!-- Progress Bar für Continue Watching -->
            <div
              v-if="type === 'continue' && showProgress && getWatchProgress(item)"
              class="progress-overlay"
            >
              <div
                class="progress-bar"
                :style="{ width: `${getWatchProgress(item)}%` }"
              ></div>
            </div>
          </div>
          <div class="media-info">
            <h3>{{ getTitle(item) }}</h3>
            <p>{{ getSubtitle(item) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { MediaItem, MediaCollection } from '../../shared/types/MediaTypes'

  interface Props {
    title: string
    subtitle?: string
    items: (MediaItem | MediaCollection)[]
    type: 'movies' | 'series' | 'continue'
    showProgress?: boolean
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    'media-select': [media: MediaItem | MediaCollection]
  }>()

  // Handler für Media Click
  const handleMediaClick = (media: MediaItem | MediaCollection): void => {
    emit('media-select', media)
  }

  const getThumbnail = (item: MediaItem | MediaCollection): string | null => {
    if ('episodes' in item && item.episodes.length > 0) {
      // MediaCollection - use first episode's thumbnail
      return null // TODO: implement thumbnail path
    } else if ('filePath' in item) {
      // MediaItem
      return null // TODO: implement thumbnail path
    }
    return null
  }

  const getTitle = (item: MediaItem | MediaCollection): string => {
    return item.title || 'Unknown'
  }

  const getSubtitle = (item: MediaItem | MediaCollection): string => {
    if ('episodes' in item) {
      // MediaCollection
      return `${item.episodeCount} Episodes`
    }

    // MediaItem
    const mediaItem = item as MediaItem
    if (mediaItem.type === 'episode' && mediaItem.seriesName) {
      return `S${mediaItem.seasonNumber}E${mediaItem.episodeNumber}`
    }

    return mediaItem.type === 'movie' ? 'Movie' : 'Media'
  }

  const getItemKey = (item: MediaItem | MediaCollection): string => {
    return `media-${item.id}`
  }

  const getWatchProgress = (item: MediaItem | MediaCollection): number => {
    // Nur für MediaItems (nicht Collections) und nur für Continue-Watching
    if ('filePath' in item && props.type === 'continue') {
      // Da die recentlyWatched Items vom Backend kommen, simulieren wir hier einen Progress
      // In der realen Implementierung würden wir den Progress aus dem MediaStore/Backend holen
      // Für now verwenden wir einen Mock-Wert basierend auf der Item-ID
      const mockProgress = Math.floor(Math.random() * 80) + 10 // 10-90%
      return mockProgress
    }
    return 0
  }
</script>

<style scoped>
  .media-row {
    margin-bottom: var(--spacing-2xl);
    padding: 0 var(--spacing-lg);
  }

  .row-header {
    margin-bottom: var(--spacing-lg);
  }

  .row-header h2 {
    color: var(--text-primary);
    font-size: var(--font-2xl);
    font-weight: var(--font-bold);
    margin-bottom: var(--spacing-xs);
  }

  .subtitle {
    color: var(--text-tertiary);
    font-size: var(--font-base);
    margin: 0;
  }

  .media-grid {
    display: grid;
    padding: 0px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--spacing-md);
  }

  .media-card {
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: transform var(--transition-fast);
    cursor: pointer;
    border: 1px solid var(--border-primary);
  }

  .media-card:hover {
    transform: scale(1.05);
    background: var(--bg-card-hover);
    border-color: var(--border-secondary);
  }

  .media-image {
    aspect-ratio: 16/9;
    background: var(--bg-tertiary);
    position: relative;
  }

  .media-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Progress Bar Overlay */
  .progress-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  }

  .progress-bar {
    height: 100%;
    background: var(--privlix-red);
    border-radius: 0 0 0 var(--radius-lg);
    transition: width var(--transition-normal);
  }

  .placeholder-image {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--border-tertiary) 0%, var(--bg-tertiary) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-4xl);
    font-weight: var(--font-bold);
    color: var(--text-muted);
  }

  .media-info {
    padding: var(--spacing-sm);
  }

  .media-info h3 {
    color: var(--text-primary);
    font-size: var(--font-base);
    font-weight: var(--font-semibold);
    margin-bottom: var(--spacing-xs);
    line-height: var(--leading-tight);
  }

  .media-info p {
    color: var(--text-tertiary);
    font-size: var(--font-sm);
    margin: 0;
  }

  /* Mobile Responsive */
  @media (max-width: 768px) {
    .media-row {
      padding: 0 var(--spacing-md);
      margin-bottom: var(--spacing-xl);
    }

    .media-grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: var(--spacing-sm);
    }

    .row-header h2 {
      font-size: var(--font-xl);
    }

    .subtitle {
      font-size: var(--font-sm);
    }

    .placeholder-image {
      font-size: var(--font-2xl);
    }
  }
</style>
