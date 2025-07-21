<template>
  <div class="video-player">
    <h1>{{ $t('videoPlayer.title') }}</h1>
    <p>{{ $t('videoPlayer.loading') }}</p>
    <p v-if="id">Video ID: {{ id }}</p>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    id?: string
  }

  defineProps<Props>()
</script>

<style scoped>
  .video-player {
    padding: 40px;
    text-align: center;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #000;
  }

  h1 {
    color: #ffffff;
    font-size: 32px;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 18px;
  }
</style>
