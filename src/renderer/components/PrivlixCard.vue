<template>
  <div
    :class="[
      'privlix-card',
      `variant-${variant}`,
      `size-${size}`,
      {
        hoverable: hoverable,
        clickable: clickable,
        glowing: glowing,
      },
    ]"
    @click="handleClick"
  >
    <!-- Header slot for title, icons, etc. -->
    <div
      v-if="$slots.header || title"
      class="card-header"
    >
      <slot name="header">
        <h3
          v-if="title"
          class="card-title"
        >
          {{ title }}
        </h3>
      </slot>
    </div>

    <!-- Main content area -->
    <div class="card-content">
      <slot>
        <p
          v-if="content"
          class="card-text"
        >
          {{ content }}
        </p>
      </slot>
    </div>

    <!-- Footer slot for actions, metadata, etc. -->
    <div
      v-if="$slots.footer"
      class="card-footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    /** Card title */
    title?: string
    /** Card content text */
    content?: string
    /** Card variant/style */
    variant?: 'default' | 'glass' | 'outline' | 'solid' | 'minimal'
    /** Card size */
    size?: 'small' | 'medium' | 'large'
    /** Enable hover effects */
    hoverable?: boolean
    /** Enable click interactions */
    clickable?: boolean
    /** Enable glow effect */
    glowing?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
    size: 'medium',
    hoverable: true,
    clickable: false,
    glowing: false,
  })

  const emit = defineEmits<{
    click: [event: MouseEvent]
  }>()

  const handleClick = (event: MouseEvent): void => {
    if (props.clickable) {
      emit('click', event)
    }
  }
</script>

<style scoped>
  .privlix-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }

  .privlix-card.clickable {
    cursor: pointer;
  }

  .privlix-card.hoverable:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .privlix-card.glowing {
    box-shadow: 0 4px 12px rgba(229, 9, 20, 0.2);
  }

  .privlix-card.glowing.hoverable:hover {
    border-color: rgba(229, 9, 20, 0.3);
    box-shadow: 0 6px 20px rgba(229, 9, 20, 0.3);
  }

  /* Size Variants */
  .size-small {
    padding: 16px;
    border-radius: 8px;
  }

  .size-medium {
    padding: 24px;
    border-radius: 12px;
  }

  .size-large {
    padding: 32px;
    border-radius: 16px;
  }

  /* Variant Styles */
  .variant-glass {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }

  .variant-outline {
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: none;
  }

  .variant-solid {
    background: rgba(20, 20, 30, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.05);
    backdrop-filter: none;
  }

  .variant-minimal {
    background: transparent;
    border: none;
    backdrop-filter: none;
    padding: 16px;
  }

  /* Card Structure */
  .card-header {
    margin-bottom: 12px;
  }

  .card-title {
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
    line-height: 1.4;
  }

  .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .card-text {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.5;
    margin: 0;
  }

  .card-footer {
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* Size-specific adjustments */
  .size-small .card-title {
    font-size: 16px;
  }

  .size-small .card-text {
    font-size: 13px;
  }

  .size-small .card-header {
    margin-bottom: 8px;
  }

  .size-small .card-footer {
    margin-top: 12px;
  }

  .size-large .card-title {
    font-size: 20px;
  }

  .size-large .card-text {
    font-size: 16px;
  }

  .size-large .card-header {
    margin-bottom: 16px;
  }

  .size-large .card-footer {
    margin-top: 20px;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .size-medium {
      padding: 20px;
    }

    .size-large {
      padding: 24px;
    }

    .card-title {
      font-size: 16px;
    }

    .card-text {
      font-size: 13px;
    }
  }
</style>
