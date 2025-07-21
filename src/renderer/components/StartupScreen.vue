<template>
  <div
    v-if="isVisible"
    :class="['startup-screen', { 'fade-out': isFadingOut }]"
  >
    <div class="startup-content">
      <div
        :class="['startup-logo', { animate: isAnimating, glow: isGlowing }]"
        @animationend="handleAnimationEnd"
      >
        <PrivlixLogo
          size="xl"
          variant="brand"
          :show-text="true"
          text-color="#ffffff"
          icon-color="#ffffff"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, nextTick } from 'vue'
  import PrivlixLogo from './PrivlixLogo.vue'
  import bootZoomSoundFile from '@/assets/sound/boot-zoom-in.wav'
  import bootGlowSoundFile from '@/assets/sound/boot-glow.wav'

  // Audio setup
  const bootZoomSound = new Audio(bootZoomSoundFile)
  const bootGlowSound = new Audio(bootGlowSoundFile)

  const emit = defineEmits<{
    'startup-complete': []
  }>()

  // Component state
  const isVisible = ref(true)
  const isAnimating = ref(false)
  const isGlowing = ref(false)
  const isFadingOut = ref(false)

  // Animation timing
  const GLOW_DELAY = 900 // ms - when glow starts during zoom (300ms später)

  const handleAnimationEnd = (event: AnimationEvent): void => {
    if (event.animationName === 'startup-zoom-in') {
      // Zoom animation completed
      console.log('Zoom animation completed')
    } else if (event.animationName === 'startup-glow') {
      // Glow animation completed, start fade out
      isFadingOut.value = true
      setTimeout(() => {
        isVisible.value = false
        emit('startup-complete')
      }, 600) // Wait for fade out animation
    }
  }

  const playBootZoomSound = async (): Promise<void> => {
    try {
      bootZoomSound.volume = 0.6 // Set volume to 60%
      await bootZoomSound.play()
    } catch (error) {
      console.warn('Could not play zoom sound:', error)
    }
  }

  const playBootGlowSound = async (): Promise<void> => {
    try {
      bootGlowSound.volume = 0.4 // Softer for glow effect
      await bootGlowSound.play()
    } catch (error) {
      console.warn('Could not play glow sound:', error)
    }
  }

  onMounted(async () => {
    await nextTick()

    // Start zoom animation and sound immediately
    isAnimating.value = true
    playBootZoomSound()

    // Start glow effect and sound after zoom begins
    setTimeout(() => {
      isGlowing.value = true
      setTimeout(() => {
        playBootGlowSound()
      }, 200)
    }, GLOW_DELAY)

    // Fallback: Force completion after maximum expected time
    setTimeout(() => {
      if (isVisible.value) {
        console.log('Fallback: Forcing startup completion')
        isFadingOut.value = true
        setTimeout(() => {
          isVisible.value = false
          emit('startup-complete')
        }, 600)
      }
    }, 2400) // 2.4 seconds total maximum (0.9s zoom + 0.8s glow + 0.6s fade + buffer)
  })
</script>

<style scoped>
  .startup-screen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #0f0f23 0%, #141414 50%, #0f0f23 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000; /* Above everything else */
  }

  .startup-content {
    text-align: center;
  }

  .startup-logo {
    transform: scale(0.3);
    opacity: 0.3;
    transition: opacity 0.4s ease;
    position: relative;
    overflow: hidden;
    border-radius: 12px;
  }

  .startup-logo.animate {
    animation: startup-zoom-in 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .startup-logo.glow {
    animation:
      startup-zoom-in 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards,
      startup-glow 1.2s ease-out 0.7s forwards;
  }

  /* Zoom in animation - smooth easing */
  @keyframes startup-zoom-in {
    0% {
      transform: scale(0.3);
      opacity: 0.3;
    }
    70% {
      transform: scale(1.05);
      opacity: 0.9;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  /* Simple, smooth glow effect - original rounded glow */
  @keyframes startup-glow {
    0% {
      filter: drop-shadow(0 0 0px rgba(229, 9, 20, 0));
    }
    50% {
      filter: drop-shadow(0 0 20px rgba(229, 9, 20, 0.8));
    }
    100% {
      filter: drop-shadow(0 0 0px rgba(229, 9, 20, 0));
    }
  }

  /* Fade out transition when component becomes invisible */
  .startup-screen {
    transition: opacity 0.6s ease;
  }

  .startup-screen.fade-out {
    opacity: 0;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .startup-logo {
      transform: scale(0.25);
    }

    .startup-logo.animate {
      animation: startup-zoom-in-mobile 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }

    .startup-logo.glow {
      animation:
        startup-zoom-in-mobile 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards,
        startup-glow 0.8s ease-out 0.6s forwards;
    }
  }

  @keyframes startup-zoom-in-mobile {
    0% {
      transform: scale(0.25);
      opacity: 0.3;
    }
    70% {
      transform: scale(0.85);
      opacity: 0.9;
    }
    100% {
      transform: scale(0.8);
      opacity: 1;
    }
  }
</style>
