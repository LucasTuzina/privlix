<template>
  <div class="media-row">
    <div class="row-header">
      <h2>{{ title }}</h2>
      <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
    </div>
    <div class="media-grid">
      <div 
        v-for="item in items" 
        :key="getItemKey(item)"
        class="media-item"
      >
        <div class="media-card">
          <div class="media-image">
            <img 
              v-if="getThumbnail(item)" 
              :src="getThumbnail(item)!" 
              :alt="getTitle(item)"
            />
            <div v-else class="placeholder-image">
              {{ getTitle(item).charAt(0).toUpperCase() }}
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
import { useMediaStore } from '../stores/mediaStore'
import type { MediaFile, Series } from '@domain/entities/MediaTypes'

interface Props {
  title: string
  subtitle?: string
  items: (MediaFile | Series)[]
  type: 'movies' | 'series' | 'continue'
  showProgress?: boolean
}

defineProps<Props>()

const mediaStore = useMediaStore()

const getThumbnail = (item: MediaFile | Series): string | null => {
  if ('episodes' in item && item.episodes.length > 0) {
    // Series - use first episode's thumbnail
    return mediaStore.getThumbnailUrl(item.episodes[0].thumbnailPath)
  } else if ('thumbnailPath' in item) {
    // MediaFile
    return mediaStore.getThumbnailUrl(item.thumbnailPath)
  }
  return null
}

const getTitle = (item: MediaFile | Series): string => {
  if ('name' in item) {
    return item.name // Series
  }
  return item.title || 'Unknown' // MediaFile
}

const getSubtitle = (item: MediaFile | Series): string => {
  if ('name' in item) {
    // Series
    return `${item.totalEpisodes} Episodes`
  }
  
  // MediaFile
  const mediaFile = item as MediaFile
  if (mediaFile.type === 'episode' && 'seriesName' in mediaFile) {
    const episode = mediaFile as any // Episode type
    return `S${episode.seasonNumber}E${episode.episodeNumber}`
  }
  
  return mediaFile.type === 'movie' ? 'Movie' : 'Media'
}

const getItemKey = (item: MediaFile | Series): string => {
  if ('name' in item) {
    return `series-${item.name}`
  }
  return `media-${item.id}`
}
</script>

<style scoped>
.media-row {
  margin-bottom: 40px;
  padding: 0 60px;
}

.row-header {
  margin-bottom: 20px;
}

.row-header h2 {
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
}

.subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  margin: 0;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.media-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;
  cursor: pointer;
}

.media-card:hover {
  transform: scale(1.05);
}

.media-image {
  aspect-ratio: 16/9;
  background: #333;
  position: relative;
}

.media-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-image {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #555 0%, #333 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
}

.media-info {
  padding: 12px;
}

.media-info h3 {
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  line-height: 1.3;
}

.media-info p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin: 0;
}
</style>
