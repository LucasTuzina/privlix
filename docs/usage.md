# Usage Guide

Complete guide to using Privlix for organizing and watching your local media collection.

## 🚀 Getting Started

### First Launch Setup

1. **Welcome Screen**
   - Launch Privlix for the first time
   - You'll see a welcome screen with setup instructions

2. **Select Media Folder**
   - Click "Select Media Folder" button
   - Navigate to your main video directory (e.g., `/Users/yourname/Movies`)
   - Click "Select" to confirm

3. **Automatic Media Scan**
   - Privlix automatically scans all subdirectories
   - Video files are categorized as Movies or Series
   - Progress is shown during the scan process
   - Large collections may take a few minutes

4. **Start Watching**
   - Browse your organized collection
   - Navigate through Movies and Series sections
   - Click any video to start watching

## 🎥 Video Playback

### Custom Video Player Features

**Playback Controls**:

- **Play/Pause**: Click video or spacebar
- **Progress Bar**: Click to seek to specific time
- **Volume**: Click volume button to mute/unmute
- **Fullscreen**: Click fullscreen button or press `F`

**Keyboard Shortcuts**:

- `Space` - Play/Pause
- `F` - Toggle Fullscreen
- `M` - Mute/Unmute
- `Escape` - Exit fullscreen or return to library

**Progress Tracking**:

- Automatically saves your watch progress
- Shows progress bar on media thumbnails
- Continue watching from where you left off

### Video Player Interface

- **Top Bar**: Video title and back button (visible on hover)
- **Bottom Bar**: Custom progress bar, time display, and controls
- **Auto-Hide**: Controls hide automatically during playback
- **Mouse Control**: Controls appear when moving mouse

## 📁 Media Organization

### Automatic Recognition

**Movies**: Automatically detected as standalone video files
**Series**: Recognized by file naming patterns and folder structure

### Supported Video Formats

✅ **Fully Supported**:

- MP4 (.mp4)
- MKV (.mkv)
- AVI (.avi)
- MOV (.mov)
- WebM (.webm)
- M4V (.m4v)

⚠️ **Limited Support** (Alpha version):

- WMV (.wmv)
- FLV (.flv)
- Other formats may work but aren't guaranteed

### Recommended Folder Structure

For best results, organize your media like this:

```
Media/
├── Movies/
│   ├── The Matrix (1999).mp4
│   ├── Inception (2010).mkv
│   └── Interstellar (2014)/
│       └── Interstellar (2014).mp4
└── TV Shows/
    ├── Breaking Bad/
    │   ├── Season 01/
    │   │   ├── Breaking Bad S01E01.mkv
    │   │   ├── Breaking Bad S01E02.mkv
    │   │   └── ...
    │   ├── Season 02/
    │   │   └── ...
    └── Game of Thrones/
        ├── S01/
        │   ├── Game.of.Thrones.S01E01.mp4
        │   └── ...
```

### Series Naming Patterns

**Supported Patterns**:

- `Show Name S01E01.ext`
- `Show Name Season 1 Episode 1.ext`
- `Show.Name.1x01.ext`
- `Show Name - S01E01.ext`

## 🔍 Navigation

### Home Screen

**Continue Watching**:

- Shows recently watched videos
- Displays watch progress with red progress bars
- Click to resume from where you left off

**All Movies**: Alphabetically sorted movie collection
**All Series**: Organized series with episode counts

### Navigation Bar

**Available Options**:

- **Home**: Return to main dashboard
- **Settings**: Access preferences and folder management
- **Language**: Switch between English and German

**⚠️ Note**: Search functionality is planned for the beta version and not yet implemented in this alpha release.

## ⚙️ Settings & Preferences

### Media Folder Management

**Current Folder**: Shows your selected media directory
**Library Statistics**: Displays counts of movies, series, and episodes
**Unlink Folder**: Remove current folder and select a new one

### Language Settings

- **English**: Default language
- **German**: Complete German translation
- **Language Switching**: Changes immediately without restart

### Application Preferences

- **Theme**: Dark theme (additional themes planned)
- **Playback**: Video player settings and preferences
- **Interface**: UI customization options

## 🎯 Tips & Best Practices

### Organizing Your Collection

1. **Consistent Naming**: Use standard naming conventions
2. **Proper Structure**: Separate movies and series into folders
3. **Season Organization**: Group episodes by seasons
4. **Quality Indicators**: Include resolution in filenames (optional)

### Optimizing Performance

1. **SSD Storage**: Faster loading and scanning
2. **Organized Structure**: Reduces scan time
3. **Supported Formats**: Use MP4/MKV for best compatibility
4. **File Sizes**: Balance quality vs. storage space

### Using the Library Effectively

1. **Browse Collections**: Navigate through Movies and Series sections
2. **Continue Watching**: Easily resume from your last position
3. **Progress Tracking**: Red progress bars show watch progress
4. **Navigation**: Use navbar to switch between different views

## 🚨 Troubleshooting

### Media Not Showing

**Check**:

- File formats are supported
- Files aren't corrupted or encrypted
- Proper folder permissions
- File names contain readable text

**Solutions**:

- Rename files with clear titles
- Move files to properly named folders
- Check file extensions
- Refresh by unlinking and re-selecting folder

### Playback Issues

**Video Won't Play**:

- Check file format compatibility
- Verify file isn't corrupted
- Try different video file
- Check system codec support

**Audio Issues**:

- Check video file has audio track
- Verify system audio settings
- Try different video file

### Performance Issues

**Slow Loading**:

- Large collections take time to scan
- Consider organizing into smaller folders
- Use SSD storage for better performance
- Close other applications during scan

**Memory Usage**:

- Restart application if slow
- Check available system memory
- Consider smaller video files if needed

## 🔮 Coming Soon (Beta Features)

### Planned Improvements

- **Search Functionality**: Advanced search and filtering capabilities
- **Thumbnails**: Automatic video thumbnail extraction
- **Subtitles**: Support for SRT and VTT subtitle files
- **Metadata**: Enhanced movie/series information
- **Playlists**: Custom collections and playlists
- **Cloud Sync**: Optional cloud backup of watch progress

### Feedback & Support

- **Bug Reports**: Use GitHub Issues for problems
- **Feature Requests**: Suggest new features via GitHub
- **Documentation**: Check `/docs` folder for technical details
- **Community**: Join development discussions

```

```
