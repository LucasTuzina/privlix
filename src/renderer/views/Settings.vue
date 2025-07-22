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

      <!-- Media Library Settings -->
      <div class="settings-section">
        <h2>{{ $t('settings.mediaLibrary') }}</h2>

        <div class="setting-item">
          <div class="setting-info">
            <label>{{ $t('settings.currentFolder') }}</label>
            <p
              v-if="currentMediaFolder"
              class="folder-path"
            >
              {{ currentMediaFolder }}
            </p>
            <p
              v-else
              class="no-folder"
            >
              {{ $t('settings.noFolderSelected') }}
            </p>
          </div>
          <div class="setting-actions">
            <button
              @click="selectNewFolder"
              class="btn-primary"
              :disabled="isLoading"
            >
              {{ currentMediaFolder ? $t('settings.changeFolder') : $t('settings.selectFolder') }}
            </button>
            <button
              v-if="currentMediaFolder"
              @click="unlinkFolder"
              class="btn-danger"
              :disabled="isLoading"
            >
              {{ $t('settings.unlinkFolder') }}
            </button>
          </div>
        </div>

        <div
          v-if="mediaStats.totalMovies > 0 || mediaStats.totalSeries > 0"
          class="setting-item"
        >
          <div class="setting-info">
            <label>{{ $t('settings.libraryStats') }}</label>
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-number">{{ mediaStats.totalMovies }}</span>
                <span class="stat-label">{{ $t('mediaRows.movies') }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ mediaStats.totalSeries }}</span>
                <span class="stat-label">{{ $t('mediaRows.series') }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ mediaStats.totalEpisodes }}</span>
                <span class="stat-label">{{ $t('mediaRows.episodes') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { getCurrentLocale, setLocale } from '../i18n'
  import { ref, onMounted, computed } from 'vue'
  import { useMediaStore } from '../stores/mediaStore'

  const mediaStore = useMediaStore()
  const currentLocale = ref(getCurrentLocale())
  const currentMediaFolder = ref<string | undefined>(undefined)
  const isLoading = ref(false)

  // Computed für Media-Statistiken
  const mediaStats = computed(() => mediaStore.mediaStats)

  const changeLanguage = (event: Event) => {
    const target = event.target as HTMLSelectElement
    const newLocale = target.value
    setLocale(newLocale)
    currentLocale.value = newLocale
  }

  const selectNewFolder = async () => {
    isLoading.value = true
    try {
      await mediaStore.selectMediaFolder()
      await loadCurrentFolder()
    } catch (error) {
      console.error('Error selecting folder:', error)
    } finally {
      isLoading.value = false
    }
  }

  const unlinkFolder = async () => {
    if (
      !confirm(
        'Are you sure you want to unlink the media folder? This will remove all media from the library.'
      )
    ) {
      return
    }

    isLoading.value = true
    try {
      await mediaStore.unlinkMediaFolder()
      currentMediaFolder.value = undefined
    } catch (error) {
      console.error('Error unlinking folder:', error)
    } finally {
      isLoading.value = false
    }
  }

  const loadCurrentFolder = async () => {
    try {
      const folder = await window.electronAPI.getSelectedMediaFolder()
      currentMediaFolder.value = folder
    } catch (error) {
      console.error('Error loading current folder:', error)
    }
  }

  onMounted(async () => {
    currentLocale.value = getCurrentLocale()
    await loadCurrentFolder()
  })
</script>

<style scoped>
  .settings-view {
    background: #141414;
  }

  .settings-container {
    max-width: 800px;
    margin: 0 auto;
  }

  .settings-container h1 {
    color: #ffffff;
    font-size: 32px;
    margin-bottom: 30px;
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

  .setting-info {
    flex: 1;
  }

  .setting-info label {
    color: #ffffff;
    font-weight: 500;
    font-size: 16px;
    display: block;
    margin-bottom: 8px;
  }

  .folder-path {
    color: #b3b3b3;
    font-size: 14px;
    margin: 0;
    word-break: break-all;
    font-family: monospace;
    background: #2a2a2a;
    padding: 8px 12px;
    border-radius: 4px;
  }

  .no-folder {
    color: #888;
    font-size: 14px;
    margin: 0;
    font-style: italic;
  }

  .setting-actions {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .btn-primary,
  .btn-danger {
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-primary {
    background: #e50914;
    color: #ffffff;
  }

  .btn-primary:hover:not(:disabled) {
    background: #f40612;
  }

  .btn-danger {
    background: #dc3545;
    color: #ffffff;
  }

  .btn-danger:hover:not(:disabled) {
    background: #c82333;
  }

  .btn-primary:disabled,
  .btn-danger:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-top: 8px;
  }

  .stat-item {
    text-align: center;
    background: #2a2a2a;
    padding: 16px;
    border-radius: 6px;
  }

  .stat-number {
    display: block;
    color: #e50914;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .stat-label {
    color: #b3b3b3;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
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

  @media (max-width: 768px) {
    .settings-container {
      padding: 0 10px;
    }

    .setting-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }

    .setting-info {
      width: 100%;
    }

    .setting-actions {
      width: 100%;
      justify-content: flex-start;
    }

    .language-select {
      min-width: 100%;
    }

    .stats-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .folder-path {
      font-size: 12px;
    }
  }
</style>
