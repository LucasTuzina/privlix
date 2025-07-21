<template>
  <div class="settings-view">
    <div class="settings-container">
      <h1>{{ $t('settings.title') }}</h1>
      
      <!-- Language Selection -->
      <div class="settings-section">
        <h2>{{ $t('settings.general') }}</h2>
        
        <div class="setting-item">
          <label for="language-select">{{ $t('settings.language') }}</label>
          <select 
            id="language-select" 
            :value="currentLocale" 
            @change="changeLanguage"
            class="language-select"
          >
            <option value="en">English</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
      </div>
      
      <p class="settings-placeholder">{{ $t('common.loading') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentLocale, setLocale } from '../i18n'
import { ref, onMounted } from 'vue'

const currentLocale = ref(getCurrentLocale())

const changeLanguage = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const newLocale = target.value
  setLocale(newLocale)
  currentLocale.value = newLocale
}

onMounted(() => {
  currentLocale.value = getCurrentLocale()
})
</script>

<style scoped>
.settings-view {
  min-height: 100vh;
  padding: 40px;
  background: #141414;
}

.settings-container {
  max-width: 800px;
  margin: 0 auto;
}

.settings-container h1 {
  color: #ffffff;
  font-size: 32px;
  margin-bottom: 40px;
}

.settings-section {
  background: #1f1f1f;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid #333;
}

.settings-section h2 {
  color: #ffffff;
  font-size: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #333;
  padding-bottom: 12px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #2a2a2a;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-item label {
  color: #ffffff;
  font-weight: 500;
  font-size: 16px;
}

.language-select {
  background: #2a2a2a;
  color: #ffffff;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  min-width: 120px;
}

.language-select:focus {
  outline: none;
  border-color: #e50914;
}

.language-select option {
  background: #2a2a2a;
  color: #ffffff;
}

.settings-placeholder {
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  text-align: center;
  margin-top: 40px;
}

@media (max-width: 768px) {
  .settings-view {
    padding: 20px;
  }
  
  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .language-select {
    min-width: 100%;
  }
}
</style>
