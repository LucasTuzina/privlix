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
          <button
            class="btn-play"
            @click="handlePlayClick"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            {{ $t('hero.play') }}
          </button>
          <button
            class="btn-info"
            @click="handleInfoClick"
          >
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
            {{ $t('hero.moreInfo') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { MediaItem, MediaCollection } from '../../shared/types/MediaTypes'

  interface Props {
    featuredMedia?: MediaItem | MediaCollection | null
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    'play-media': [media: MediaItem | MediaCollection]
    'show-info': [media: MediaItem | MediaCollection]
  }>()

  // Handler for play button
  const handlePlayClick = (): void => {
    if (props.featuredMedia) {
      emit('play-media', props.featuredMedia)
    }
  }

  // Handler for info button
  const handleInfoClick = (): void => {
    if (props.featuredMedia) {
      emit('show-info', props.featuredMedia)
    }
  }

  const getMediaTitle = (media: MediaItem | MediaCollection): string => {
    return media.title
  }
</script>

<style scoped>
  .hero-section {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: var(--hero-height-desktop);
    max-width: var(--content-max-width);
    width: 100%;
    align-items: center;
    padding: var(--navbar-height) var(--spacing-3xl) var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
    position: relative;
    overflow: hidden;
    margin-top: calc(-1 * var(--navbar-height-macos, var(--navbar-height))); /* macOS-aware */
    padding-top: calc(var(--navbar-height-macos, var(--navbar-height)) + 50px); /* macOS-aware */
  }

  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to right,
      var(--bg-overlay) 0%,
      var(--bg-overlay-light) 50%,
      transparent 100%
    );
  }

  .hero-content {
    position: relative;
    z-index: var(--z-base);
    padding: var(--spacing-2xl);
    margin-top: 260px;
    max-width: 600px;
  }

  .hero-content h1 {
    color: var(--text-primary);
    font-size: var(--font-4xl);
    font-weight: var(--font-bold);
    margin-bottom: var(--spacing-md);
    line-height: var(--leading-tight);
    text-shadow: 0 2px 8px var(--shadow-heavy);
  }

  .hero-content p {
    color: var(--text-secondary);
    font-size: var(--font-lg);
    line-height: var(--leading-normal);
    margin-bottom: var(--spacing-lg);
    text-shadow: 0 1px 4px var(--shadow-heavy);
  }

  .hero-actions {
    display: flex;
    gap: var(--spacing-md);
    align-items: center;
  }

  .btn-play,
  .btn-info {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: 10px 20px;
    border: none;
    border-radius: var(--radius-md);
    font-size: var(--font-base);
    font-weight: var(--font-semibold);
    cursor: pointer;
    transition: all var(--transition-normal);
    height: auto;
    min-height: 44px;
  }

  .btn-play {
    background: var(--btn-primary-bg);
    color: var(--btn-primary-color);
  }

  .btn-play:hover {
    background: var(--btn-primary-hover);
    transform: scale(1.05);
  }

  .btn-info {
    background: var(--btn-secondary-bg);
    color: var(--text-primary);
  }

  .btn-info:hover {
    background: var(--btn-secondary-hover);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    .hero-section {
      height: var(--hero-height-mobile);
      padding: var(--navbar-height) var(--spacing-lg) var(--spacing-md);
      margin-top: calc(-1 * var(--navbar-height-macos, var(--navbar-height))); /* macOS-aware */
      padding-top: calc(var(--navbar-height-macos, var(--navbar-height)) + 30px); /* macOS-aware */
    }

    .hero-content h1 {
      font-size: var(--font-3xl);
      margin-bottom: var(--spacing-sm);
    }

    .hero-content p {
      font-size: var(--font-base);
      margin-bottom: var(--spacing-lg);
    }

    .hero-actions {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }

    .btn-play,
    .btn-info {
      padding: var(--spacing-sm) var(--spacing-md);
      min-height: 40px;
    }
  }
</style>
