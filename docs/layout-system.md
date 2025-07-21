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

## Special Layout Considerations

### WelcomeScreen Component

The WelcomeScreen is used within the Home page's overlay layout mode and includes special responsive handling:

#### NavBar Overlap Prevention

- Uses `padding-top: max(40px, 90px)` to ensure content never goes behind the fixed navbar
- Responsive padding adjusts for different screen sizes:
  - Desktop: 90px top padding (70px navbar + 20px margin)
  - Tablet (≤768px): 80px top padding
  - Mobile (≤480px): 70px top padding

#### Viewport Height Management

- Container uses `min-height: calc(100vh - 130px)` to prevent unnecessary scrolling on larger screens
- On mobile devices, switches to `min-height: auto` to allow natural scrolling when needed
- Responsive gap adjustments: 80px → 60px → 40px → 30px

#### Responsive Grid Behavior

- Desktop: 2-column grid (content + preview)
- Tablet/Mobile (≤1024px): Single column, centered layout
- Features grid: 2x2 → 1x4 on mobile for better readability

```vue
<!-- WelcomeScreen responsive structure -->
<div class="welcome-screen">  <!-- min-height: 100vh, smart top padding -->
  <div class="welcome-container">  <!-- responsive grid, height calculations -->
    <div class="welcome-hero">  <!-- content area -->
      <div class="features-grid">  <!-- 2x2 → 1x4 responsive -->
        <FeatureCard ... />
      </div>
    </div>
    <div class="welcome-preview">  <!-- hidden on mobile -->
      <!-- Preview mockup -->
    </div>
  </div>
</div>
```

## Benefits

✅ **Modular**: Easy to switch layout modes per page  
✅ **Consistent**: Unified navbar positioning across all pages  
✅ **Flexible**: Supports both overlay and standard content positioning  
✅ **Responsive**: Adapts to different screen sizes automatically
