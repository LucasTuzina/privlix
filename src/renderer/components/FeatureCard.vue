<template>
  <PrivlixCard
    :variant="variant"
    :size="size"
    :hoverable="hoverable"
    :glowing="glowing"
    class="feature-card"
  >
    <template #header>
      <div class="feature-icon">
        <slot name="icon">
          {{ icon }}
        </slot>
      </div>
    </template>

    <div class="feature-content">
      <h3 class="feature-title">
        <slot name="title">{{ title }}</slot>
      </h3>
      <p class="feature-description">
        <slot name="description">{{ description }}</slot>
      </p>
    </div>

    <template
      v-if="$slots.footer"
      #footer
    >
      <slot name="footer" />
    </template>
  </PrivlixCard>
</template>

<script setup lang="ts">
  import PrivlixCard from './PrivlixCard.vue'

  interface Props {
    /** Feature title */
    title?: string
    /** Feature description */
    description?: string
    /** Feature icon (emoji or text) */
    icon?: string
    /** Card variant */
    variant?: 'default' | 'glass' | 'outline' | 'solid' | 'minimal'
    /** Card size */
    size?: 'small' | 'medium' | 'large'
    /** Enable hover effects */
    hoverable?: boolean
    /** Enable glow effect */
    glowing?: boolean
  }

  withDefaults(defineProps<Props>(), {
    variant: 'glass',
    size: 'medium',
    hoverable: true,
    glowing: false,
  })
</script>

<style scoped>
  .feature-card {
    height: 100%;
  }

  .feature-icon {
    font-size: 32px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    line-height: 1;
  }

  .feature-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .feature-title {
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 8px 0;
    line-height: 1.4;
  }

  .feature-description {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.5;
    margin: 0;
    flex: 1;
  }

  /* Size variations */
  :deep(.size-small) .feature-icon {
    font-size: 24px;
    margin-bottom: 8px;
  }

  :deep(.size-small) .feature-title {
    font-size: 16px;
    margin-bottom: 6px;
  }

  :deep(.size-small) .feature-description {
    font-size: 13px;
  }

  :deep(.size-large) .feature-icon {
    font-size: 40px;
    margin-bottom: 16px;
  }

  :deep(.size-large) .feature-title {
    font-size: 20px;
    margin-bottom: 12px;
  }

  :deep(.size-large) .feature-description {
    font-size: 16px;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .feature-icon {
      font-size: 28px;
      justify-content: center;
    }

    .feature-title {
      font-size: 16px;
    }

    .feature-description {
      font-size: 13px;
    }
  }
</style>
