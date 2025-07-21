<template>
  <div class="language-switcher">
    <select
      :value="currentLocale"
      @change="changeLanguage"
      class="language-select"
      title="Language"
    >
      <option value="en">EN</option>
      <option value="de">DE</option>
    </select>
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
  .language-switcher {
    display: inline-block;
  }

  .language-select {
    background: rgba(0, 0, 0, 0.6);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    padding: 6px 8px;
    font-size: 12px;
    min-width: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .language-select:hover {
    background: rgba(0, 0, 0, 0.8);
    border-color: rgba(255, 255, 255, 0.5);
  }

  .language-select:focus {
    outline: none;
    border-color: #e50914;
    box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.2);
  }

  .language-select option {
    background: #2a2a2a;
    color: #ffffff;
  }
</style>
