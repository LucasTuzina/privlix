<template>
  <div class="player-layout">
    <!-- Player content without navigation -->
    <main class="player-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
  // Player layout for fullscreen video experience
</script>

<style scoped>
  .player-layout {
    min-height: 100vh;
    background-color: #000;
    display: flex;
    flex-direction: column;
  }

  .player-content {
    flex: 1;
    padding: 0;
    overflow: hidden;
  }
</style>
