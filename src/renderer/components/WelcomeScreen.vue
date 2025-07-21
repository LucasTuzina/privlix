<template>
  <div class="welcome-screen">
    <div class="welcome-container">
      <div class="welcome-hero">
        <div class="welcome-logo">
          <PrivlixLogo 
            size="xl" 
            variant="brand"
            :show-text="true"
            text-color="#ffffff"
            icon-color="#ffffff"
          />
        </div>
        
        <h2 class="welcome-title">
          {{ $t('welcome.title') }}
        </h2>
        
        <p class="welcome-description">
          {{ $t('welcome.description') }}
        </p>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🎬</div>
            <h3>{{ $t('welcome.features.autoOrganization.title') }}</h3>
            <p>{{ $t('welcome.features.autoOrganization.description') }}</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🔍</div>
            <h3>{{ $t('welcome.features.smartSearch.title') }}</h3>
            <p>{{ $t('welcome.features.smartSearch.description') }}</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h3>{{ $t('welcome.features.modernInterface.title') }}</h3>
            <p>{{ $t('welcome.features.modernInterface.description') }}</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h3>{{ $t('welcome.features.privateData.title') }}</h3>
            <p>{{ $t('welcome.features.privateData.description') }}</p>
          </div>
        </div>

        <div class="welcome-actions">
          <button @click="handleSelectFolder" class="btn-primary large" :disabled="isSelecting">
            <svg v-if="!isSelecting" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"/>
            </svg>
            <div v-else class="loading-spinner small"></div>
            {{ isSelecting ? $t('welcome.actions.scanning') : $t('welcome.actions.selectFolder') }}
          </button>
          
          <p class="help-text">
            {{ $t('welcome.actions.helpText') }}
          </p>
        </div>
      </div>

      <div class="welcome-preview">
        <div class="preview-image">
          <div class="mock-interface">
            <div class="mock-navbar"></div>
            <div class="mock-hero"></div>
            <div class="mock-rows">
              <div class="mock-row"></div>
              <div class="mock-row"></div>
              <div class="mock-row"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PrivlixLogo from './PrivlixLogo.vue'

const emit = defineEmits<{
  'select-folder': []
}>()

const isSelecting = ref(false)

const handleSelectFolder = async (): Promise<void> => {
  isSelecting.value = true
  try {
    await emit('select-folder')
  } finally {
    isSelecting.value = false
  }
}
</script>

<style scoped>
.welcome-screen {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #141414 50%, #0f0f23 100%);
  display: flex;
  align-items: center;
  padding: 40px 20px;
}

.welcome-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.welcome-hero {
  padding: 20px;
}

.welcome-logo {
  margin-bottom: 40px;
}

.welcome-title {
  font-size: 42px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 20px;
  line-height: 1.2;
}

.welcome-description {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 50px;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 50px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.feature-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(229, 9, 20, 0.3);
  transform: translateY(-2px);
}

.feature-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.feature-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 8px;
}

.feature-card p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin: 0;
}

.welcome-actions {
  text-align: center;
}

.btn-primary.large {
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  min-width: 280px;
  margin-bottom: 16px;
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner.small {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.help-text {
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
  margin: 0;
}

.welcome-preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-image {
  width: 100%;
  max-width: 500px;
  aspect-ratio: 16/10;
  background: linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 100%);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.mock-interface {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mock-navbar {
  height: 40px;
  background: linear-gradient(90deg, #e50914 0%, #f40612 30%, transparent 100%);
  border-radius: 8px;
  opacity: 0.8;
}

.mock-hero {
  height: 120px;
  background: linear-gradient(135deg, #333 0%, #555 100%);
  border-radius: 8px;
  opacity: 0.6;
}

.mock-rows {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mock-row {
  height: 40px;
  background: linear-gradient(90deg, #444 0%, #666 50%, transparent 100%);
  border-radius: 6px;
  opacity: 0.4;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .welcome-container {
    grid-template-columns: 1fr;
    gap: 60px;
    text-align: center;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .welcome-title {
    font-size: 36px;
  }
}

@media (max-width: 768px) {
  .welcome-screen {
    padding: 20px 15px;
  }
  
  .welcome-title {
    font-size: 28px;
  }
  
  .welcome-description {
    font-size: 18px;
  }
  
  .btn-primary.large {
    min-width: 240px;
    font-size: 16px;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
