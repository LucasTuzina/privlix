<template>
  <div 
    class="privlix-logo" 
    :class="[variant, { clickable: isClickable }]"
    :style="logoStyles"
    @click="handleClick"
  >
    <div class="logo-icon" :style="iconStyles">
      P
    </div>
    <h1 
      v-if="showText" 
      class="logo-text" 
      :style="textStyles"
    >
      Privlix
    </h1>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** Size of the logo */
  size?: 'small' | 'medium' | 'large' | 'xl'
  /** Custom size in pixels for the icon */
  customSize?: number
  /** Logo variant/style */
  variant?: 'default' | 'minimal' | 'brand'
  /** Whether to show the text */
  showText?: boolean
  /** Whether the logo is clickable */
  isClickable?: boolean
  /** Custom text color */
  textColor?: string
  /** Custom icon color */
  iconColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  variant: 'default',
  showText: true,
  isClickable: false,
  textColor: '#ffffff',
  iconColor: '#ffffff'
})

const emit = defineEmits<{
  click: []
}>()

const sizeMap = {
  small: { icon: 24, text: 16, spacing: 8 },
  medium: { icon: 40, text: 28, spacing: 12 },
  large: { icon: 56, text: 36, spacing: 16 },
  xl: { icon: 80, text: 48, spacing: 20 }
}

const currentSize = computed(() => {
  if (props.customSize) {
    return {
      icon: props.customSize,
      text: Math.round(props.customSize * 0.7),
      spacing: Math.round(props.customSize * 0.3)
    }
  }
  return sizeMap[props.size]
})

const logoStyles = computed(() => ({
  cursor: props.isClickable ? 'pointer' : 'default'
}))

const iconStyles = computed(() => ({
  width: `${currentSize.value.icon}px`,
  height: `${currentSize.value.icon}px`,
  fontSize: `${Math.round(currentSize.value.icon * 0.6)}px`,
  color: props.iconColor,
  marginRight: props.showText ? `${currentSize.value.spacing}px` : '0'
}))

const textStyles = computed(() => ({
  fontSize: `${currentSize.value.text}px`,
  color: props.textColor
}))

const handleClick = () => {
  if (props.isClickable) {
    emit('click')
  }
}
</script>

<style scoped>
.privlix-logo {
  display: flex;
  align-items: center;
  user-select: none;
  transition: all 0.2s ease;
}

.privlix-logo.clickable:hover {
  transform: scale(1.02);
}

.logo-icon {
  background: linear-gradient(135deg, #e50914 0%, #f40612 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  box-shadow: 0 4px 12px rgba(229, 9, 20, 0.3);
  transition: all 0.2s ease;
}

.privlix-logo.minimal .logo-icon {
  background: rgba(229, 9, 20, 0.8);
  box-shadow: 0 2px 8px rgba(229, 9, 20, 0.2);
}

.privlix-logo.brand .logo-icon {
  background: linear-gradient(135deg, #e50914 0%, #b8070f 100%);
  box-shadow: 0 6px 20px rgba(229, 9, 20, 0.4);
}

.logo-text {
  font-weight: 700;
  letter-spacing: -0.5px;
  margin: 0;
  white-space: nowrap;
}

.privlix-logo.small .logo-text {
  letter-spacing: -0.3px;
}

.privlix-logo.large .logo-text,
.privlix-logo.xl .logo-text {
  letter-spacing: -0.8px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .privlix-logo.medium .logo-icon {
    width: 32px;
    height: 32px;
    font-size: 19px;
  }
  
  .privlix-logo.medium .logo-text {
    font-size: 24px;
  }
}
</style>
