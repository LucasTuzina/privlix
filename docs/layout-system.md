# Layout System

The application uses a flexible, modular layout system with dedicated layout components.

## Layout Components

### BaseLayout
Main layout for standard pages (Home, Settings, Search):
- Fixed navigation bar at top with z-index: 1000
- Two layout modes: `standard` and `overlay`
- Consistent padding and spacing management

### PlayerLayout
Fullscreen layout for video playback:
- No navigation bar for immersive experience
- Black background optimized for video content

## Layout Modes

### Standard Mode (`layout-mode="standard"`)
- Content starts **below** the navbar (90px top padding)
- Used for: Settings, Search, and other content pages
- Ensures proper spacing under fixed navbar

### Overlay Mode (`layout-mode="overlay"`)
- Content starts **from the top**, behind the navbar (0px top padding)
- Used for: Home page with hero background that extends behind navbar
- NavBar floats over content with transparency/overlay effect

## Dynamic Layout Classes

The layout system supports dynamic content classes based on routes:
- `no-horizontal-padding`: For pages like Home that need full-width content (hero sections)
- Standard padding (20px): Applied to Settings, Search, and other content pages

## Usage Examples

### Home Page: Overlay mode with no horizontal padding
```vue
<BaseLayout layout-mode="overlay" content-class="no-horizontal-padding">
  <HeroSection /> <!-- Background extends behind navbar -->
  <div class="content-sections">
    <!-- Content sections with their own padding -->
  </div>
</BaseLayout>
```

### Settings Page: Standard mode with normal padding
```vue
<BaseLayout layout-mode="standard">
  <div class="settings-content">
    <!-- Content starts below navbar -->
  </div>
</BaseLayout>
```

## Benefits
✅ **Modular**: Easy to switch layout modes per page  
✅ **Consistent**: Unified navbar positioning across all pages  
✅ **Flexible**: Supports both overlay and standard content positioning  
✅ **Responsive**: Adapts to different screen sizes automatically
