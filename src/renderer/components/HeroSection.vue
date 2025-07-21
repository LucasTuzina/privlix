<template>
  <div class="hero-section">
    <div class="hero-background">
      <div class="hero-content">
        <h1 v-if="featuredMedia">{{ getMediaTitle(featuredMedia) }}</h1>
        <p v-if="featuredMedia">{{ $t('hero.featuredContent') }}</p>
        <div
          v-if="featuredMedia"
          class="hero-actions"
        >
          <button class="btn-play">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            Play
          </button>
          <button class="btn-info">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
              />
            </svg>
            More Info
          </button>
        </div>
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
    height: 500px; /* Increased height to account for navbar overlay */
    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
    display: flex;
    align-items: center;
    padding: 70px 60px 40px; /* Top padding for navbar space */
    margin-bottom: 40px;
    position: relative;
    overflow: hidden;
    margin-top: -70px; /* Pull up to go behind navbar */
    padding-top: 140px; /* Adjust padding to account for navbar */
  }

  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      transparent 100%
    );
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 600px;
  }

  .hero-content h1 {
    color: #ffffff;
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 20px;
    line-height: 1.2;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }

  .hero-content p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 18px;
    line-height: 1.5;
    margin-bottom: 30px;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  }

  .hero-actions {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .btn-play,
  .btn-info {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-play {
    background: #ffffff;
    color: #000000;
  }

  .btn-play:hover {
    background: rgba(255, 255, 255, 0.8);
    transform: scale(1.05);
  }

  .btn-info {
    background: rgba(109, 109, 110, 0.7);
    color: #ffffff;
  }

  .btn-info:hover {
    background: rgba(109, 109, 110, 0.9);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    .hero-section {
      height: 400px;
      padding: 70px 20px 20px; /* Adjusted padding for mobile */
      margin-top: -70px; /* Keep the navbar overlay effect */
      padding-top: 120px; /* Adjusted for mobile navbar */
    }

    .hero-content h1 {
      font-size: 32px;
    }

    .hero-content p {
      font-size: 16px;
    }

    .hero-actions {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
  }
</style>
