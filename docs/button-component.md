# PrivlixButton Component - Usage and Configuration

## Overview

The `PrivlixButton` component is a highly customizable, reusable button component with modern styling, loading states, and icon support. It features a glow effect similar to the PrivlixLogo and provides consistent button styling throughout the application.

## Features

- ✨ **Multiple Variants**: Primary, secondary, success, danger, ghost
- 📏 **Flexible Sizing**: Small, medium, large, XL options
- 🎨 **Logo-like Glow Effects**: Beautiful shadows and hover animations
- 🔄 **Loading States**: Built-in spinner with disabled interactions
- 🎯 **Icon Support**: Predefined icons or custom icon slots
- ♿ **Accessibility**: Focus states, ARIA support, keyboard navigation
- 📱 **Responsive**: Adapts to mobile screen sizes

## Props

| Prop             | Type                                                                     | Default     | Description                               |
| ---------------- | ------------------------------------------------------------------------ | ----------- | ----------------------------------------- |
| `text`           | `string`                                                                 | `undefined` | Button text content                       |
| `icon`           | `'folder' \| 'search' \| 'play' \| 'settings' \| 'download' \| 'upload'` | `undefined` | Predefined icon type                      |
| `size`           | `'small' \| 'medium' \| 'large' \| 'xl'`                                 | `'medium'`  | Button size variant                       |
| `variant`        | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'ghost'`           | `'primary'` | Button style variant                      |
| `loading`        | `boolean`                                                                | `false`     | Shows loading spinner and disables button |
| `disabled`       | `boolean`                                                                | `false`     | Disables button interactions              |
| `customIconSize` | `number`                                                                 | `undefined` | Override default icon size in pixels      |

## Size Specifications

| Size     | Padding   | Font Size | Min Height | Min Width (large+) | Icon Size |
| -------- | --------- | --------- | ---------- | ------------------ | --------- |
| `small`  | 8px 16px  | 14px      | 36px       | -                  | 16px      |
| `medium` | 12px 24px | 16px      | 44px       | -                  | 20px      |
| `large`  | 16px 32px | 18px      | 52px       | 280px              | 24px      |
| `xl`     | 20px 40px | 20px      | 60px       | 320px              | 28px      |

## Variants

### Primary (Default)

- **Background**: Red gradient with glow effect
- **Use Case**: Main action buttons (Submit, Select Folder)
- **Hover**: Enhanced glow, slight lift animation

### Secondary

- **Background**: Semi-transparent with backdrop blur
- **Use Case**: Secondary actions, cancel buttons
- **Hover**: Increased opacity and border

### Success

- **Background**: Green gradient with glow
- **Use Case**: Confirm actions, success states

### Danger

- **Background**: Red gradient (different tone)
- **Use Case**: Delete, warning actions

### Ghost

- **Background**: Transparent with border
- **Use Case**: Subtle actions, tertiary buttons

## Usage Examples

### Basic Button

```vue
<PrivlixButton text="Click Me" @click="handleClick" />
```

### Button with Icon

```vue
<PrivlixButton
  text="Select Folder"
  icon="folder"
  size="large"
  variant="primary"
  @click="selectFolder"
/>
```

### Loading State

```vue
<PrivlixButton
  :text="loading ? 'Scanning...' : 'Start Scan'"
  icon="search"
  :loading="loading"
  @click="startScan"
/>
```

### Custom Icon Slot

```vue
<PrivlixButton text="Custom Action" size="large">
  <template #icon>
    <MyCustomIcon />
  </template>
</PrivlixButton>
```

### Different Variants

```vue
<!-- Primary action -->
<PrivlixButton text="Save" variant="primary" />

<!-- Secondary action -->
<PrivlixButton text="Cancel" variant="secondary" />

<!-- Success action -->
<PrivlixButton text="Complete" variant="success" />

<!-- Danger action -->
<PrivlixButton text="Delete" variant="danger" />

<!-- Ghost action -->
<PrivlixButton text="More Options" variant="ghost" />
```

## Events

- `click`: Emitted when button is clicked (only when not disabled or loading)

## Accessibility

The component includes:

- **Keyboard Support**: Focus states with visible outlines
- **Screen Reader Support**: Proper ARIA labels and states
- **Disabled States**: Proper cursor and interaction handling
- **Focus Management**: Clear focus indicators

## Implementation in WelcomeScreen

The original button in WelcomeScreen has been replaced with:

```vue
<PrivlixButton
  :text="isSelecting ? $t('welcome.actions.scanning') : $t('welcome.actions.selectFolder')"
  icon="folder"
  size="large"
  variant="primary"
  :loading="isSelecting"
  @click="handleSelectFolder"
/>
```

## Design System Integration

- **Consistent with PrivlixLogo**: Similar glow effects and gradients
- **Theme Colors**: Uses the same red brand colors (#e50914, #f40612)
- **Typography**: Matches app font weights and sizes
- **Animations**: Consistent hover and transition effects

## Future Extensions

The component is designed to be extensible:

- Additional icon types can be easily added
- New color variants can be added to the variant system
- Custom styling can be applied via CSS custom properties
- More size options can be added to the size map

## Benefits

- ✅ **Consistency**: Uniform button styling across the application
- ✅ **Maintainability**: Central button logic and styling
- ✅ **Flexibility**: Multiple variants and sizes for different use cases
- ✅ **User Experience**: Beautiful animations and loading states
- ✅ **Accessibility**: Built-in accessibility features
- ✅ **Developer Experience**: Simple API with TypeScript support
