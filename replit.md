# Overview

This is a pure frontend birthday celebration website for Christopher Hite. The application serves a static HTML/CSS/JavaScript site that features an interactive celebration animation system. When users click a celebration button, the site triggers a bubble and balloon animation that displays the birthday person's photos and personalized messages. The project is designed to be simple, customizable, and deployable without any backend infrastructure.

# Recent Changes

**October 29, 2025** - Transformed into comprehensive multi-page birthday website:
- Redesigned home page with clean hero section and navigation menu (removed blocking content)
- Created Photo Gallery page with responsive grid layout and lightbox feature for viewing all 24 photos
- Created Birthday Wishes page with 6 heartfelt wish cards
- Created About Christopher page celebrating him
- Implemented navigation bar across all pages for easy browsing
- Maintained bubble celebration animation on home page
- Updated CSS for professional multi-page layout with consistent theming
- Fixed server.py for reliable restarts with allow_reuse_address
- All pages are fully responsive for mobile and desktop viewing

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Technology Stack**: Pure HTML5, CSS3, and vanilla JavaScript with no frameworks or build tools.

**Rationale**: The project requirements explicitly call for a simple, static frontend that can run instantly on Replit or any static hosting without dependencies. This approach ensures:
- Zero setup time and immediate deployment
- No build process required
- Maximum compatibility across browsers
- Easy customization for non-technical users

**Architecture Pattern**: Single Page Application (SPA) with component-based animation system.

The frontend is organized into three core files:
- `index.html` - DOM structure and semantic layout
- `style.css` - Visual styling with gradient backgrounds and animation keyframes
- `script.js` - Animation logic, image loading, and event handling

## Static File Server

**Solution**: Python HTTP server serving files from the `/public` directory on port 5000.

**Rationale**: Python's built-in `http.server` module provides a zero-dependency solution for local development. The custom handler:
- Disables caching for faster development iteration
- Serves all static assets from a single directory
- Requires no additional installation or configuration

**Alternative Considered**: Node.js with Express was considered but rejected to avoid npm dependencies and keep the project purely Python-based for server functionality.

## Animation System

**Architecture**: Event-driven animation engine using CSS animations and JavaScript DOM manipulation.

**Key Components**:
1. **Bubble Generation**: Dynamically creates floating bubble elements with randomized properties (size, position, color, duration)
2. **Image Loading**: Asynchronously loads all images from `/public/images` directory for randomized display
3. **Balloon System**: Separate visual layer for background balloon animations
4. **Pop Interaction**: Click handlers for bubble interaction with message reveals

**Design Decision**: CSS animations over JavaScript-based animation libraries.

**Rationale**:
- Better performance using GPU acceleration
- Smoother animations with native browser optimizations
- No external dependencies
- Simpler customization through CSS variables

**Pros**: Hardware accelerated, lightweight, easy to customize
**Cons**: Limited to CSS-supported animation types, less precise timing control

## State Management

**Solution**: Simple boolean flag (`isAnimating`) to prevent concurrent animations.

**Rationale**: The application has minimal state requirements - only tracking whether an animation is currently active. A single variable suffices without introducing state management complexity.

## Customization Architecture

**Design Pattern**: Configuration constants at the top of `script.js`.

All customizable values are centralized in clearly labeled constant declarations:
- `BIRTHDAY_PERSON_NAME` - Recipient's name
- `BIRTHDAY_MESSAGES` - Array of celebration messages
- `ANIMATION_DURATION` - Timing controls
- `BUBBLE_COUNT` / `BALLOON_COUNT` - Quantity parameters
- `BUBBLE_COLORS` / `BALLOON_COLORS` - Color palettes

**Rationale**: This approach makes the site easily customizable without requiring code understanding. Users can modify values in one location with inline comments explaining each parameter.

## Responsive Design

**Solution**: Fluid layouts with viewport-relative units and CSS Grid/Flexbox.

**Design Decisions**:
- Percentage-based positioning for bubbles and balloons
- Relative font sizes (rem units)
- Backdrop blur effects for depth
- Media queries for mobile optimization

**Rationale**: Ensures the celebration animation works seamlessly across desktop and mobile devices without separate code paths.

## Asset Management

**Dynamic Image Loading**: JavaScript reads from `/public/images` directory at runtime rather than hardcoding filenames.

**Problem Addressed**: Users can add/remove photos without modifying code.

**Implementation**: The script programmatically loads all images from the directory and randomly assigns them to bubbles during animation.

**Limitation**: Static file servers cannot list directory contents, so the implementation likely uses a predefined array or fetch-based approach with known filenames.

# External Dependencies

## Static Assets

**Images**: User-provided photos stored in `/public/images/` directory
- Dynamically loaded at runtime
- Randomized assignment to bubble elements
- No specific format requirements (supports standard web formats)

**Audio (Optional)**: Background music file at `/public/audio/birthday.mp3`
- Play/pause controls mentioned in requirements
- Not yet implemented in current codebase

## Browser APIs

**DOM Manipulation**: Standard DOM APIs for element creation and event handling
- `document.createElement()`
- `addEventListener()`
- `appendChild()` / `removeChild()`

**CSS Animation APIs**: 
- CSS transitions and keyframe animations
- Transform and opacity properties for smooth effects

**Timing APIs**:
- `setTimeout()` for animation cleanup
- `setInterval()` or `requestAnimationFrame()` for continuous effects

## No External Services

The project intentionally avoids:
- No CDN dependencies
- No external API calls
- No database connections
- No authentication services
- No third-party libraries or frameworks

This isolation ensures the site works offline and loads instantly without network dependencies.