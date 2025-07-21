# Card Components - PrivlixCard and FeatureCard

## Overview

The card system consists of two components that provide a flexible and consistent card-based layout system:

- **`PrivlixCard`**: A general-purpose card component with multiple variants and slots
- **`FeatureCard`**: A specialized card component for displaying features with icons

Both components follow the design system with glass morphism effects, consistent spacing, and responsive design.

## PrivlixCard Component

### Features

- 🎨 **Multiple Variants**: Glass, outline, solid, minimal styles
- 📏 **Flexible Sizing**: Small, medium, large options
- ✨ **Glass Effects**: Backdrop blur and transparency
- 🎯 **Slot System**: Header, content, and footer slots
- 🔄 **Hover Effects**: Configurable hover animations
- ⚡ **Click Support**: Optional click interactions with events
- 💫 **Glow Effects**: Optional logo-like glow styling

### Props

| Prop        | Type                                                        | Default     | Description                |
| ----------- | ----------------------------------------------------------- | ----------- | -------------------------- |
| `title`     | `string`                                                    | `undefined` | Optional card title        |
| `content`   | `string`                                                    | `undefined` | Optional card content text |
| `variant`   | `'default' \| 'glass' \| 'outline' \| 'solid' \| 'minimal'` | `'default'` | Card visual style          |
| `size`      | `'small' \| 'medium' \| 'large'`                            | `'medium'`  | Card size and padding      |
| `hoverable` | `boolean`                                                   | `true`      | Enable hover effects       |
| `clickable` | `boolean`                                                   | `false`     | Enable click interactions  |
| `glowing`   | `boolean`                                                   | `false`     | Enable glow effects        |

### Size Specifications

| Size     | Padding | Border Radius | Title Size | Text Size |
| -------- | ------- | ------------- | ---------- | --------- |
| `small`  | 16px    | 8px           | 16px       | 13px      |
| `medium` | 24px    | 12px          | 18px       | 14px      |
| `large`  | 32px    | 16px          | 20px       | 16px      |

### Variants

#### Default/Glass (Default)

- **Background**: Semi-transparent with backdrop blur
- **Border**: Subtle white border
- **Use Case**: Main content cards, feature displays

#### Outline

- **Background**: Transparent
- **Border**: Prominent outline
- **Use Case**: Secondary content, form containers

#### Solid

- **Background**: Semi-opaque dark background
- **Border**: Minimal border
- **Use Case**: Highlighted content, call-out boxes

#### Minimal

- **Background**: Transparent
- **Border**: None
- **Use Case**: Simple content grouping

### Usage Examples

#### Basic Card

```vue
<PrivlixCard title="Card Title" content="Card content text" />
```

#### Card with Slots

```vue
<PrivlixCard variant="glass" size="large" :hoverable="true">
  <template #header>
    <h3>Custom Header</h3>
    <span class="badge">New</span>
  </template>
  
  <div class="custom-content">
    <p>Custom content with any HTML</p>
  </div>
  
  <template #footer>
    <button>Action</button>
  </template>
</PrivlixCard>
```

#### Clickable Card

```vue
<PrivlixCard
  title="Clickable Card"
  content="This card responds to clicks"
  :clickable="true"
  :glowing="true"
  @click="handleCardClick"
/>
```

### Events

- `click`: Emitted when card is clicked (only when `clickable` is true)

## FeatureCard Component

### Features

- 🎯 **Feature-Specific**: Optimized for displaying app features
- 🔤 **Icon Support**: Built-in icon display with emoji or custom content
- 📝 **Structured Content**: Title and description slots
- 🎨 **Consistent Styling**: Extends PrivlixCard with feature-specific styling
- ✨ **Enhanced Effects**: Special hover animations for icons

### Props

| Prop          | Type                                                        | Default     | Description                  |
| ------------- | ----------------------------------------------------------- | ----------- | ---------------------------- |
| `title`       | `string`                                                    | `undefined` | Feature title                |
| `description` | `string`                                                    | `undefined` | Feature description          |
| `icon`        | `string`                                                    | `undefined` | Feature icon (emoji or text) |
| `variant`     | `'default' \| 'glass' \| 'outline' \| 'solid' \| 'minimal'` | `'glass'`   | Card variant                 |
| `size`        | `'small' \| 'medium' \| 'large'`                            | `'medium'`  | Card size                    |
| `hoverable`   | `boolean`                                                   | `true`      | Enable hover effects         |
| `glowing`     | `boolean`                                                   | `false`     | Enable glow effects          |

### Icon Specifications

| Size     | Icon Size | Icon Margin |
| -------- | --------- | ----------- |
| `small`  | 24px      | 8px bottom  |
| `medium` | 32px      | 12px bottom |
| `large`  | 40px      | 16px bottom |

### Usage Examples

#### Basic Feature Card

```vue
<FeatureCard
  title="Auto Organization"
  description="Automatically organize your media files"
  icon="🎬"
/>
```

#### Custom Icon Slot

```vue
<FeatureCard title="Smart Search" description="Find content with intelligent search">
  <template #icon>
    <SearchIcon class="custom-icon" />
  </template>
</FeatureCard>
```

#### With Footer Actions

```vue
<FeatureCard
  title="Modern Interface"
  description="Beautiful, intuitive design"
  icon="📱"
  variant="glass"
  size="large"
>
  <template #footer>
    <button class="learn-more">Learn More</button>
  </template>
</FeatureCard>
```

## Implementation in WelcomeScreen

The feature grid in WelcomeScreen has been refactored to use FeatureCard components:

```vue
<div class="features-grid">
  <FeatureCard
    :title="$t('welcome.features.autoOrganization.title')"
    :description="$t('welcome.features.autoOrganization.description')"
    icon="🎬"
    variant="glass"
    size="medium"
    :hoverable="true"
  />
  
  <FeatureCard
    :title="$t('welcome.features.smartSearch.title')"
    :description="$t('welcome.features.smartSearch.description')"
    icon="🔍"
    variant="glass"
    size="medium"
    :hoverable="true"
  />
  
  <FeatureCard
    :title="$t('welcome.features.modernInterface.title')"
    :description="$t('welcome.features.modernInterface.description')"
    icon="📱"
    variant="glass"
    size="medium"
    :hoverable="true"
  />
  
  <FeatureCard
    :title="$t('welcome.features.privateData.title')"
    :description="$t('welcome.features.privateData.description')"
    icon="🔒"
    variant="glass"
    size="medium"
    :hoverable="true"
  />
</div>
```

## Design System Integration

### Visual Consistency

- **Glass Morphism**: Consistent backdrop blur and transparency
- **Brand Colors**: Uses theme colors for borders and glows
- **Typography**: Matches app font hierarchy
- **Spacing**: Consistent with overall design system

### Responsive Design

- **Mobile Optimization**: Adjusted font sizes and spacing on small screens
- **Grid Integration**: Works seamlessly with CSS Grid and Flexbox layouts
- **Touch Friendly**: Appropriate touch targets and hover states

### Accessibility

- **Semantic HTML**: Proper heading hierarchy and content structure
- **Focus States**: Visible focus indicators for keyboard navigation
- **Screen Readers**: Proper content structure and ARIA support
- **Color Contrast**: Sufficient contrast ratios for text readability

## Benefits

### Code Organization

- ✅ **Reusability**: Components can be used throughout the application
- ✅ **Maintainability**: Centralized styling and behavior
- ✅ **Consistency**: Uniform card styling across all features
- ✅ **Flexibility**: Multiple variants for different use cases

### Developer Experience

- ✅ **TypeScript Support**: Full type safety and IntelliSense
- ✅ **Slot System**: Flexible content customization
- ✅ **Props API**: Simple and intuitive configuration
- ✅ **Documentation**: Comprehensive usage examples

### User Experience

- ✅ **Visual Appeal**: Modern glass morphism design
- ✅ **Smooth Animations**: Polished hover and transition effects
- ✅ **Responsive**: Works well on all screen sizes
- ✅ **Accessibility**: Inclusive design principles

## Future Extensions

The card system is designed for extensibility:

- **New Variants**: Additional styling variants can be easily added
- **Custom Animations**: More sophisticated hover effects
- **Theme Integration**: CSS custom properties for theming
- **Size Options**: Additional size variants as needed
- **Special Features**: Loading states, badge support, etc.

## CSS Architecture

The components use scoped styles with:

- **CSS Grid/Flexbox**: Modern layout techniques
- **CSS Custom Properties**: For theming and consistency
- **Backdrop Filters**: For glass morphism effects
- **Transform Animations**: For smooth hover effects
- **Media Queries**: For responsive behavior

This architecture ensures maintainable, performant, and visually consistent card components throughout the application.
