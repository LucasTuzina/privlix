# StartupScreen Component - Boot Animation and Sound

## Overview

The `StartupScreen` component provides an engaging boot animation that plays at application startup. It features the Privlix logo with a smooth zoom-in animation, glow effect, and accompanying boot sound.

## Features

- 🎬 **Logo Animation**: Smooth zoom-in effect with easing curve
- ✨ **Glow Effect**: Brand-colored glow that intensifies during animation
- 🔊 **Boot Sound**: Plays `boot.wav` sound file during startup
- 📱 **Responsive**: Adapts animation scale for different screen sizes
- ⚡ **Performance**: Optimized animations with CSS transforms and filters

## Animation Timeline

| Time     | Event         | Description                           |
| -------- | ------------- | ------------------------------------- |
| 0ms      | Start         | Logo at 30% scale, 30% opacity        |
| 0-1200ms | Zoom In       | Smooth scale to 100%, opacity to 100% |
| 800ms    | Glow Start    | Brand-colored glow effect begins      |
| 1200ms   | Zoom Complete | Logo reaches final size               |
| 1600ms   | Glow Complete | Glow reaches final intensity          |
| 2000ms   | Fade Out      | Component fades out                   |
| 2400ms   | Complete      | `startup-complete` event emitted      |

## Props

The StartupScreen component doesn't accept props - it's a self-contained startup animation.

## Events

| Event              | Payload | Description                                                  |
| ------------------ | ------- | ------------------------------------------------------------ |
| `startup-complete` | `void`  | Emitted when animation completes and screen should be hidden |

## Usage

### Basic Integration

```vue
<template>
  <div id="app">
    <!-- Startup Screen -->
    <StartupScreen
      v-if="showStartupScreen"
      @startup-complete="handleStartupComplete"
    />

    <!-- Main App Content -->
    <template v-else>
      <!-- Your app content here -->
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import StartupScreen from './components/StartupScreen.vue'

  const showStartupScreen = ref(true)

  const handleStartupComplete = (): void => {
    showStartupScreen.value = false
  }
</script>
```

## Technical Implementation

### Animation Architecture

The component uses a two-phase animation system:

1. **Zoom Phase**: CSS transform scale from 0.3 to 1.0 over 1.2 seconds
2. **Glow Phase**: CSS filter drop-shadow effects starting at 0.8 seconds

### Animation Curves

- **Zoom**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` - Smooth easing with gentle overshoot
- **Glow**: `ease-in-out` - Simple easing for natural glow transition

### Audio Integration

```typescript
import bootSoundFile from '@/assets/sound/boot.wav'

const bootSound = new Audio(bootSoundFile)

const playBootSound = async (): Promise<void> => {
  try {
    bootSound.volume = 0.6 // Set to 60% volume
    await bootSound.play()
  } catch (error) {
    console.warn('Could not play boot sound:', error)
    // Continue without sound - don't block startup
  }
}
```

### Responsive Behavior

| Screen Size          | Logo Scale | Animation           |
| -------------------- | ---------- | ------------------- |
| **Desktop** (>768px) | 0.3 → 1.0  | Full animation      |
| **Mobile** (≤768px)  | 0.25 → 0.8 | Scaled down version |

## Styling Architecture

### Core Animations

```css
/* Zoom animation with overshoot */
@keyframes startup-zoom-in {
  0% {
    transform: scale(0.3);
    opacity: 0.3;
  }
  70% {
    transform: scale(1.05); /* Slight overshoot */
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Multi-layered glow effect */
@keyframes startup-glow {
  0% {
    filter: drop-shadow(0 0 0 rgba(229, 9, 20, 0));
  }
  50% {
    filter: drop-shadow(0 0 20px rgba(229, 9, 20, 0.8)) drop-shadow(0 0 40px rgba(229, 9, 20, 0.6))
      drop-shadow(0 0 60px rgba(229, 9, 20, 0.4));
  }
  100% {
    filter: drop-shadow(0 0 15px rgba(229, 9, 20, 0.6)) drop-shadow(0 0 30px rgba(229, 9, 20, 0.4))
      drop-shadow(0 0 45px rgba(229, 9, 20, 0.2));
  }
}
```

### Z-Index Management

- **StartupScreen**: `z-index: 10000` - Above all other content
- **NavBar**: `z-index: 1000` - Below startup screen
- **Notifications**: Default z-index - Can appear over startup if needed

## Performance Considerations

### Optimizations

- ✅ **CSS Transforms**: Uses `transform: scale()` instead of changing width/height
- ✅ **CSS Filters**: Hardware-accelerated drop-shadow effects
- ✅ **Single Animation**: Combines zoom and glow into one timeline
- ✅ **No JavaScript Animation**: All animations handled by CSS for 60fps performance

### Memory Management

- ✅ **Component Cleanup**: Component is completely removed after animation
- ✅ **Audio Cleanup**: Audio object is created once and reused
- ✅ **Event Listeners**: Proper cleanup of animation event listeners

## Integration with App Architecture

### App.vue Integration

The StartupScreen is integrated at the top level of the application:

```vue
<!-- App.vue structure -->
<template>
  <div id="app">
    <!-- Startup Screen (highest priority) -->
    <StartupScreen
      v-if="showStartupScreen"
      @startup-complete="handleStartupComplete"
    />

    <!-- Main App (hidden during startup) -->
    <template v-else>
      <PlayerLayout v-if="isPlayerMode">
        <router-view />
      </PlayerLayout>
      <BaseLayout
        v-else
        :content-class="getContentClass"
        :layout-mode="getLayoutMode"
      >
        <router-view />
      </BaseLayout>
    </template>

    <!-- Notifications (always available) -->
    <NotificationContainer />
  </div>
</template>
```

### State Management

- **Local State**: Uses simple `ref(true)` for startup screen visibility
- **No Store Integration**: Deliberately isolated from application state
- **Event-Driven**: Uses emit events for clean component communication

## Asset Requirements

### Audio File

- **Location**: `src/renderer/assets/sound/boot.wav`
- **Format**: WAV audio file
- **Size**: ~380KB (included in build)
- **Volume**: Set to 60% by default

### Dependencies

- **PrivlixLogo**: Must be available with size "xl"
- **CSS Variables**: Uses brand colors (--brand-red: #e50914)

## Accessibility

### Considerations

- **Reduced Motion**: Consider adding `@media (prefers-reduced-motion: reduce)` support
- **Audio Control**: Currently no option to disable boot sound
- **Skip Option**: Could add skip button for accessibility

### Future Enhancements

```css
/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  .startup-logo.animate {
    animation: none;
    transform: scale(1);
    opacity: 1;
  }

  .startup-logo.glow {
    filter: none;
  }
}
```

## Browser Compatibility

- ✅ **Modern Browsers**: Chrome, Firefox, Safari, Edge (2020+)
- ✅ **CSS Features**: Transform, filter, animation support required
- ✅ **Audio Support**: Web Audio API for boot sound
- ⚠️ **Older Browsers**: May not support backdrop-filter or advanced animations

## Troubleshooting

### Common Issues

1. **No Sound**: Check browser audio permissions and file path
2. **Animation Choppy**: Ensure hardware acceleration is enabled
3. **Logo Not Showing**: Verify PrivlixLogo component import
4. **Z-Index Issues**: StartupScreen should have highest z-index (10000)

### Debug Mode

Add this to enable startup screen debugging:

```typescript
// In StartupScreen.vue
const handleAnimationEnd = (event: AnimationEvent): void => {
  console.log('Animation event:', event.animationName)
  // ... rest of handler
}
```

## Future Enhancements

- [ ] Skip button for accessibility
- [ ] Audio volume control
- [ ] Multiple boot sounds/themes
- [ ] Preload logo assets
- [ ] Reduced motion support
- [ ] Custom branding options
