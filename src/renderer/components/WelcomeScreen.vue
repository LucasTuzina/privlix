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
          <FeatureCard
            :title="$t('welcome.features.autoOrganization.title')"
            :description="$t('welcome.features.autoOrganization.description')"
            icon="🎬"
            variant="glass"
            size="medium"
            :hoverable="true"
          />

          <FeatureCard
            :title="$t('welcome.features.smartSearch.title')"
            :description="$t('welcome.features.smartSearch.description')"
            icon="🔍"
            variant="glass"
            size="medium"
            :hoverable="true"
          />

          <FeatureCard
            :title="$t('welcome.features.modernInterface.title')"
            :description="$t('welcome.features.modernInterface.description')"
            icon="📱"
            variant="glass"
            size="medium"
            :hoverable="true"
          />

          <FeatureCard
            :title="$t('welcome.features.privateData.title')"
            :description="$t('welcome.features.privateData.description')"
            icon="🔒"
            variant="glass"
            size="medium"
            :hoverable="true"
          />
        </div>

        <div class="welcome-actions">
          <PrivlixButton
            :text="
              isSelecting ? $t('welcome.actions.scanning') : $t('welcome.actions.selectFolder')
            "
            icon="folder"
            size="large"
            variant="primary"
            :loading="isSelecting"
            @click="handleSelectFolder"
          />

          <p class="help-text">
            {{ $t('welcome.actions.helpText') }}
          </p>
        </div>
      </div>

      <div class="welcome-preview">
        <div class="preview-image">
          <div class="mock-interface">
            <div class="mock-navbar" />
            <div class="mock-hero" />
            <div class="mock-rows">
              <div class="mock-row" />
              <div class="mock-row" />
              <div class="mock-row" />
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
  import PrivlixButton from './PrivlixButton.vue'
  import FeatureCard from './FeatureCard.vue'

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
    /* Ensure content doesn't go behind navigation */
    padding-top: max(40px, 90px); /* At least 90px for navbar + margin */
  }

  .welcome-container {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    width: 100%;
    /* Ensure container doesn't exceed viewport height */
    min-height: calc(100vh - 130px); /* Account for navbar and padding */
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
    margin-bottom: 35px;
    line-height: 1.6;
  }

  .features-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 35px;
  }

  .welcome-actions {
    text-align: center;
  }

  .help-text {
    color: rgba(255, 255, 255, 0.6);
    font-size: 16px;
    margin: 16px 0 0 0;
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
      min-height: calc(100vh - 120px); /* Adjust for smaller screens */
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
      padding-top: max(20px, 80px); /* Navbar space for mobile */
      /* Allow some scrolling on mobile if needed */
      min-height: auto;
    }

    .welcome-container {
      min-height: calc(100vh - 100px);
      gap: 40px;
    }

    .welcome-logo {
      display: flex;
      justify-content: center;
    }

    .welcome-title {
      font-size: 28px;
    }

    .welcome-description {
      font-size: 18px;
      margin-bottom: 30px;
    }

    .features-grid {
      margin-bottom: 30px;
    }
  }

  @media (max-width: 480px) {
    .welcome-screen {
      padding-top: max(15px, 70px); /* Even smaller navbar on very small screens */
    }

    .welcome-container {
      min-height: calc(100vh - 85px);
      gap: 30px;
    }

    .welcome-title {
      font-size: 24px;
    }

    .welcome-description {
      font-size: 16px;
      margin-bottom: 25px;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
