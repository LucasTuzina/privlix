# PrivlixLogo Component - Usage and Configuration

## Overview

The `PrivlixLogo` component is a reusable Vue component that displays the Privlix logo with various sizes, variants, and customization options. All components use the **Composition API with TypeScript** for better type safety and modern Vue.js development.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large' \| 'xl'` | `'medium'` | Predefined logo size |
| `customSize` | `number` | `undefined` | Custom size in pixels for the icon |
| `variant` | `'default' \| 'minimal' \| 'brand'` | `'default'` | Logo variant/style |
| `showText` | `boolean` | `true` | Whether to show the "Privlix" text |
| `isClickable` | `boolean` | `false` | Whether the logo is clickable |
| `textColor` | `string` | `'#ffffff'` | Custom text color |
| `iconColor` | `string` | `'#ffffff'` | Custom icon color |

## Size Map

| Size | Icon (px) | Text (px) | Spacing (px) |
|------|-----------|-----------|-------------|
| `small` | 24 | 16 | 8 |
| `medium` | 40 | 28 | 12 |
| `large` | 56 | 36 | 16 |
| `xl` | 80 | 48 | 20 |

## Events

- `click`: Emitted when the logo is clicked (only if `isClickable` is true)

## Usage in the App

### NavBar.vue (Composition API)
```vue
<script setup lang="ts">
import PrivlixLogo from './PrivlixLogo.vue'
// ... other imports and logic
</script>

<template>
  <PrivlixLogo 
    size="medium" 
    :is-clickable="false"
    variant="default"
  />
</template>
```

### WelcomeScreen.vue (Composition API)
```vue
<script setup lang="ts">
import PrivlixLogo from './PrivlixLogo.vue'
// ... other imports and logic
</script>

<template>
  <PrivlixLogo 
    size="xl" 
    variant="brand"
    :show-text="true"
    text-color="#ffffff"
    icon-color="#ffffff"
  />
</template>
```

## Migration

The following changes were implemented:

### 1. Logo Component Migration:
- **NavBar.vue**: Removed `.brand-logo` and `.brand-text` CSS classes
- **WelcomeScreen.vue**: Replaced manual logo with PrivlixLogo component

### 2. Composition API Migration:
- **NavBar.vue**: From Options API to `<script setup lang="ts">`
- **WelcomeScreen.vue**: From Options API to `<script setup lang="ts">`
- All components now consistently use the **Composition API**

### 3. TypeScript Improvements:
- Complete typing for all Props and Emits
- Correct type definitions for timers and refs
- Template refs properly typed

## Architecture Benefits

- ✅ **Consistency**: Uniform logo design throughout the app
- ✅ **Composition API**: Modern Vue.js 3 syntax used consistently
- ✅ **TypeScript**: Complete type safety and IntelliSense
- ✅ **Maintainability**: Centralized control over logo changes
- ✅ **Flexibility**: Various sizes and variants available
- ✅ **Reusability**: Easy integration into new components
- ✅ **Best Practices**: Modern Vue.js development with `<script setup>`

## Coding Standards

All components now follow these standards:
- `<script setup lang="ts">` for Composition API
- Complete TypeScript typing
- Props with `defineProps<Interface>()`
- Events with `defineEmits<Interface>()`
- English comments for better internationalization
