<template>
  <button
    :class="[
      'privlix-button',
      `size-${size}`,
      `variant-${variant}`,
      { loading: loading, disabled: disabled },
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <div class="button-content">
      <!-- Loading spinner -->
      <div
        v-if="loading"
        class="loading-spinner"
      />

      <!-- Icon (SVG or slot) -->
      <div
        v-else-if="icon || $slots.icon"
        class="button-icon"
      >
        <slot name="icon">
          <svg
            v-if="icon"
            :width="iconSize"
            :height="iconSize"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path :d="getIconPath(icon)" />
          </svg>
        </slot>
      </div>

      <!-- Text content -->
      <span
        v-if="$slots.default || text"
        class="button-text"
      >
        <slot>{{ text }}</slot>
      </span>
    </div>
  </button>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  interface Props {
    /** Button text */
    text?: string
    /** Predefined icon type */
    icon?: 'folder' | 'search' | 'play' | 'settings' | 'download' | 'upload'
    /** Button size */
    size?: 'small' | 'medium' | 'large' | 'xl'
    /** Button variant/style */
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost'
    /** Loading state */
    loading?: boolean
    /** Disabled state */
    disabled?: boolean
    /** Custom icon size */
    customIconSize?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 'medium',
    variant: 'primary',
    loading: false,
    disabled: false,
  })

  const emit = defineEmits<{
    click: []
  }>()

  const iconSize = computed(() => {
    if (props.customIconSize) return props.customIconSize

    const sizeMap = {
      small: 16,
      medium: 20,
      large: 24,
      xl: 28,
    }
    return sizeMap[props.size]
  })

  const getIconPath = (iconType: string): string => {
    const icons: Record<string, string> = {
      folder:
        'M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z',
      search:
        'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
      play: 'M8 5v14l11-7z',
      settings:
        'M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z',
      download: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z',
      upload: 'M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z',
    }
    return icons[iconType] || icons.folder
  }

  const handleClick = (): void => {
    if (!props.disabled && !props.loading) {
      emit('click')
    }
  }
</script>

<style scoped>
  .privlix-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 12px;
    font-family: inherit;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
    user-select: none;
    outline: none;
  }

  .privlix-button:focus-visible {
    outline: 2px solid rgba(229, 9, 20, 0.5);
    outline-offset: 2px;
  }

  .button-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    position: relative;
    z-index: 1;
  }

  .button-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .button-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .loading-spinner {
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  /* Size Variants */
  .size-small {
    padding: 8px 16px;
    font-size: 14px;
    min-height: 36px;
    border-radius: 8px;
  }

  .size-small .loading-spinner {
    width: 16px;
    height: 16px;
  }

  .size-small .button-content {
    gap: 6px;
  }

  .size-medium {
    padding: 12px 24px;
    font-size: 16px;
    min-height: 44px;
    border-radius: 10px;
  }

  .size-medium .loading-spinner {
    width: 20px;
    height: 20px;
  }

  .size-large {
    padding: 16px 32px;
    font-size: 18px;
    min-height: 52px;
    min-width: 280px;
    border-radius: 12px;
  }

  .size-large .loading-spinner {
    width: 24px;
    height: 24px;
  }

  .size-large .button-content {
    gap: 10px;
  }

  .size-xl {
    padding: 20px 40px;
    font-size: 20px;
    min-height: 60px;
    min-width: 320px;
    border-radius: 14px;
  }

  .size-xl .loading-spinner {
    width: 28px;
    height: 28px;
  }

  .size-xl .button-content {
    gap: 12px;
  }

  /* Color Variants */
  .variant-primary {
    background: linear-gradient(135deg, #e50914 0%, #f40612 100%);
    color: #ffffff;
    box-shadow:
      0 4px 12px rgba(229, 9, 20, 0.3),
      0 0 0 1px rgba(229, 9, 20, 0.1);
  }

  .variant-primary:hover:not(.disabled):not(.loading) {
    background: linear-gradient(135deg, #f40612 0%, #e50914 100%);
    box-shadow:
      0 6px 20px rgba(229, 9, 20, 0.4),
      0 0 0 1px rgba(229, 9, 20, 0.2);
  }

  .variant-primary:active:not(.disabled):not(.loading) {
    transform: translateY(0);
    box-shadow:
      0 2px 8px rgba(229, 9, 20, 0.3),
      0 0 0 1px rgba(229, 9, 20, 0.2);
  }

  .variant-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
  }

  .variant-secondary:hover:not(.disabled):not(.loading) {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .variant-success {
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
  }

  .variant-success:hover:not(.disabled):not(.loading) {
    box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
  }

  .variant-danger {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }

  .variant-danger:hover:not(.disabled):not(.loading) {
    box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
  }

  .variant-ghost {
    background: transparent;
    color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .variant-ghost:hover:not(.disabled):not(.loading) {
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.2);
  }

  /* States */
  .disabled,
  .loading {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  .loading {
    pointer-events: none;
  }

  /* Animations */
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .size-large {
      min-width: 240px;
      font-size: 16px;
    }

    .size-xl {
      min-width: 280px;
      font-size: 18px;
    }
  }
</style>
