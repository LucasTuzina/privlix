<template>
  <footer class="stats-footer">
    <div class="stats-container">
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-number">{{ stats.totalMovies }}</div>
          <div class="stat-label">Movies</div>
        </div>
        
        <div class="stat-item">
          <div class="stat-number">{{ stats.totalSeries }}</div>
          <div class="stat-label">Series</div>
        </div>
        
        <div class="stat-item">
          <div class="stat-number">{{ stats.totalEpisodes }}</div>
          <div class="stat-label">Episodes</div>
        </div>
        
        <div class="stat-item">
          <div class="stat-number">{{ stats.totalFiles }}</div>
          <div class="stat-label">Total Files</div>
        </div>
      </div>
      
      <div class="footer-info">
        <p>Privlix - Your Private Media Library</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { MediaStats } from '@domain/entities/MediaTypes'

interface Props {
  stats: MediaStats
}

withDefaults(defineProps<Props>(), {
  stats: () => ({
    totalMovies: 0,
    totalSeries: 0,
    totalEpisodes: 0,
    totalFiles: 0,
    totalSize: 0
  })
})
</script>

<style scoped>
.stats-footer {
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.5) 100%);
  padding: 40px 60px 20px;
  margin-top: 60px;
}

.stats-container {
  max-width: 1200px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  margin-bottom: 32px;
}

.stat-item {
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  color: #e50914;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.footer-info {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-info p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  margin: 0;
}

@media (max-width: 768px) {
  .stats-footer {
    padding: 40px 20px 20px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .stat-number {
    font-size: 28px;
  }
}
</style>
