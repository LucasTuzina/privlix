<template>
  <div class="hero-section">
    <div class="hero-background">
      <div class="hero-content">
        <h1 v-if="featuredMedia">{{ getMediaTitle(featuredMedia) }}</h1>
        <p v-if="featuredMedia">Featured Content - Discover amazing movies and series</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie, Series } from '../../domain/entities/MediaTypes'

interface Props {
  featuredMedia?: Movie | Series | null
}

defineProps<Props>()

const getMediaTitle = (media: Movie | Series): string => {
  if ('title' in media) {
    return media.title // Movie
  }
  return media.name // Series
}
</script>

<style scoped>
.hero-section {
  height: 400px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  display: flex;
  align-items: center;
  padding: 0 60px;
  margin-bottom: 40px;
}

.hero-content h1 {
  color: #ffffff;
  font-size: 48px;
  margin-bottom: 20px;
}

.hero-content p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
}
</style>
