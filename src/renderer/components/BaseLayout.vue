<template>
  <div class="base-layout">
    <!-- Main Navigation -->
    <NavBar />
    
    <!-- Main Content Area with flexible positioning -->
    <main :class="['main-content', contentClass, layoutMode]">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'

interface Props {
  contentClass?: string
  /** Layout mode: 'standard' (content below navbar) or 'overlay' (content starts from top, behind navbar) */
  layoutMode?: 'standard' | 'overlay'
}

withDefaults(defineProps<Props>(), {
  contentClass: '',
  layoutMode: 'standard'
})
</script>

<style scoped>
.base-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  /* Default horizontal padding for most views */
  padding-left: 20px;
  padding-right: 20px;
}

/* Standard layout - content starts below navbar */
.main-content.standard {
  padding-top: 90px; /* Space for fixed NavBar (70px) + extra margin (20px) */
  padding-bottom: 40px;
}

/* Overlay layout - content starts from top, behind navbar */
.main-content.overlay {
  padding-top: 0;
  padding-bottom: 40px;
}

/* Special class for views that need no horizontal padding (like Home with hero section) */
.main-content.no-horizontal-padding {
  padding-left: 0;
  padding-right: 0;
}

/* Responsive padding */
@media (max-width: 768px) {
  .main-content {
    padding-top: 80px;
    padding-bottom: 20px;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding-top: 70px;
    padding-bottom: 20px;
  }
}
</style>
