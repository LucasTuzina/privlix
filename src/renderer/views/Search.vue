<template>
  <div class="search-view">
    <div class="search-container">
      <h1>{{ $t('search.title') }}</h1>
      <p>{{ $t('common.loading') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Future implementation for search functionality
</script>

<style scoped>
.search-view {
  padding: 40px;
}

.search-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  color: #ffffff;
  font-size: 32px;
  margin-bottom: 20px;
}

p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
}
</style>
