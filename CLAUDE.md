# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a cybersecurity portfolio website for Enzo Moro, built as a static site using vanilla HTML/CSS/JavaScript. The site is hosted on GitHub Pages and includes comprehensive DevSecOps automation via GitHub Actions. The project emphasizes security best practices, accessibility (WCAG 2.1 AA+), and performance optimization.

## Architecture

### Static Site Structure
- **6 HTML pages**: index.html (homepage), about.html (experience/timeline), projects.html (portfolio with filtering), contact.html (Formspree integration), devsecops.html (security practices), 404.html (custom error page)
- **Single CSS file**: css/styles.css (~1,200 lines) with design system using CSS custom properties
- **Vanilla JavaScript**: No frameworks - uses modern browser APIs (Intersection Observer, matchMedia)
- **Data-driven content**: Projects and skills loaded from JSON files in assets/data/

### Key Design Patterns
- **Dark cybersecurity theme**: Matrix-green (`--color-accent-primary: #00ff88`) and cyan accents on dark blue background
- **Accessibility-first**: Skip links, ARIA labels, keyboard navigation, reduced motion support
- **Progressive enhancement**: Core content works without JavaScript; enhancements add animations and interactivity
- **Content Security Policy (CSP)**: Strict CSP meta tag in all HTML files, report-only mode

## Development Commands

### Local Development
```bash
# Serve locally (Python)
python -m http.server 8000
# Visit http://localhost:8000

# Serve locally (Node.js)
npx http-server -p 8000
```

### Validation & Testing
```bash
# Validate HTML
npx html5validator --root .

# Validate CSS
npx stylelint "**/*.css"

# Check for broken links
npx lychee --exclude-mail .

# Secret scanning (local)
docker run --rm -v "$(pwd):/path" zricethezav/gitleaks:latest detect --source="/path" -v

# Lighthouse audit
npx lighthouse https://enzomoro.github.io --view
```

### GitHub Pages Deployment
- Push to `main` branch automatically triggers deployment
- Site URL: https://enzomoro.github.io
- GitHub Actions workflows run on push/PR (see CI/CD section below)

## Configuration Files

### URLs to Update (Post-Deployment)
When deploying to a different GitHub Pages URL:
1. `.github/workflows/zap-baseline.yml` - Line 23: `target:` URL
2. `.github/workflows/lighthouse.yml` - Line 21: `url:` in collect array
3. `lighthouserc.json` - Line 4: `url:` array
4. `sitemap.xml` - All `<loc>` tags
5. All HTML files - `<link rel="canonical">` and `<meta property="og:url">`

### Formspree Integration (contact.html)
- Line 104: Update `action="https://formspree.io/f/YOUR_FORM_ID"`
- Requires account at formspree.io to create form endpoint
- Honeypot spam protection implemented in js/form.js

### Analytics (Optional)
- `js/analytics.js` - Currently disabled by default (`enabled: false`)
- Supports Plausible or Fathom for privacy-first tracking
- Set `enabled: true` and configure provider/site ID to enable

## Data Files

### assets/data/projects.json
```json
{
  "projects": [
    {
      "id": 1,
      "title": "Project Name",
      "category": "Security Engineering" | "Red Team" | "Infrastructure & DevOps",
      "summary": "Brief description",
      "role": "Role title",
      "highlights": ["Achievement 1", "Achievement 2"],
      "tech": ["Tag1", "Tag2"],
      "repo_url": null | "https://github.com/...",
      "live_url": null | "https://...",
      "images": []
    }
  ]
}
```
- Categories filter projects on projects.html
- Used to dynamically generate project cards with modal details

### assets/data/skills.json
```json
{
  "categories": [
    {
      "name": "Category Name",
      "skills": [
        {
          "name": "Skill Name",
          "level": 1-5, // 1=novice, 5=expert
          "icon": "🔍"
        }
      ]
    }
  ]
}
```
- Proficiency levels (1-5) render as visual progress bars on about.html
- Icons display inline with skill names

## CI/CD - GitHub Actions Workflows

All workflows located in `.github/workflows/`:

### ci.yml (HTML/CSS/Links Validation)
- **Triggers**: Push/PR to main
- **Jobs**:
  - html5validator for HTML validation
  - stylelint for CSS linting (JSON output)
  - lychee for broken link detection
- **Artifacts**: Validation reports uploaded on completion

### codeql.yml (SAST)
- **Triggers**: Push/PR to main, nightly schedule (2:30 AM)
- **Language**: JavaScript
- **Purpose**: Static analysis for security vulnerabilities

### gitleaks.yml (Secret Scanning)
- **Triggers**: Push/PR to main
- **Purpose**: Prevent credential commits
- **Tool**: Gitleaks v8+

### lighthouse.yml (Performance Audit)
- **Triggers**: Push to main
- **Config**: Uses lighthouserc.json
- **Thresholds**: Performance ≥90, Accessibility ≥95, SEO ≥90
- **Artifacts**: Lighthouse reports (.html) uploaded

### zap-baseline.yml (DAST)
- **Triggers**: Nightly schedule (3 AM), manual workflow_dispatch
- **Purpose**: OWASP ZAP baseline scan against deployed site
- **Config**: Scans https://enzomoro.github.io (update for custom domain)

## JavaScript Architecture

### js/theme.js
- Dark/light mode toggle functionality
- Persists theme preference in localStorage
- Smooth theme transitions using CSS custom properties
- Updates toggle button icon dynamically (☀️/🌙)
- Applies theme via `data-theme` attribute on `<html>`

### js/scroll-to-top.js
- Scroll-to-top button appears after scrolling 300px
- Smooth scroll animation to page top
- Button fades in/out with visibility threshold
- Throttled scroll event handling for performance

### js/lightbox.js
- Image lightbox viewer for project galleries
- Keyboard navigation (←/→ arrows, Escape to close)
- Click outside to close
- Supports image galleries with prev/next navigation
- Displays image captions from `data-caption` or `alt` attributes
- Add class `lightbox-trigger` to images to enable

### js/copy-code.js
- Copy-to-clipboard for code snippets
- Auto-detects all `<pre>`, `<code>` blocks
- Visual feedback (checkmark) on successful copy
- Fallback support for older browsers without Clipboard API
- Currently enabled on devsecops.html page

### js/nav.js
- Mobile menu toggle functionality
- Active navigation link highlighting
- Hamburger menu (☰) button for mobile
- Uses `addEventListener` for event handling

### js/main.js
- Intersection Observer for fade-in animations on scroll
- Skill bar animations (width transition on viewport entry)
- Respects `prefers-reduced-motion` media query
- Class-based structure (`MainInteractions`)

### js/form.js
- Contact form validation (client-side)
- Formspree integration with honeypot protection
- Input sanitization before submission
- Success/error message display

### js/analytics.js
- Disabled by default (`enabled: false`)
- Privacy-first analytics (Plausible/Fathom)
- Does not track by default - respects user privacy

## Styling System (css/styles.css)

### CSS Custom Properties (Design Tokens)
Located in `:root` selector for dark theme:
```css
--color-accent-primary: #00ff88;    /* Matrix green */
--color-accent-secondary: #00ccff;  /* Cyan */
--color-bg-primary: #0a0e27;        /* Dark blue */
--spacing-xs: 0.25rem;
--font-size-base: 1rem;
/* ... etc */
```

Light theme variables (applied via `[data-theme="light"]`):
```css
--color-accent-primary: #059669;    /* Green */
--color-accent-secondary: #0284c7;  /* Blue */
--color-bg-primary: #f8fafc;        /* Light gray */
/* ... etc */
```

### Responsive Breakpoints
```css
--breakpoint-mobile: 640px;
--breakpoint-tablet: 768px;
--breakpoint-desktop: 1024px;
--breakpoint-wide: 1440px;
```

### Key Components
- `.card` - Reusable card component with gradient border on hover
- `.timeline-item` - Vertical timeline with left border accent
- `.skill-category` - Skill group with progress bars
- `.modal` - Project detail modals (triggered from projects.html)
- `.badge` - Technology/category tags
- `.theme-toggle` - Dark/light mode toggle button in navigation
- `.scroll-to-top` - Floating scroll-to-top button (bottom-right)
- `.lightbox` - Full-screen image viewer with navigation
- `.copy-btn` - Copy-to-clipboard button for code blocks

### Accessibility Features
- Skip-to-content link (`.skip-to-content`)
- Focus indicators on all interactive elements
- ARIA labels on navigation and sections
- Color contrast ≥4.5:1 (WCAG AA+)
- `prefers-reduced-motion` media query disables animations

## Security Considerations

### Content Security Policy
- Defined in `<meta http-equiv="Content-Security-Policy">` in all HTML `<head>` sections
- Allows: self, Formspree, Plausible, Google Fonts
- Blocks: inline scripts (except trusted), external resources
- `frame-ancestors 'none'` prevents clickjacking

### No Inline Event Handlers
- All JavaScript uses `addEventListener`
- No `onclick`, `onload`, or similar attributes in HTML
- Reduces XSS attack surface

### External Dependencies
- **Zero runtime dependencies** - Vanilla JS only
- Google Fonts (optional) loaded via CSP-approved domain
- Formspree for form backend (CSP-approved)

## Documentation

### docs/ folder
- **SECURITY.md**: CSP policy details, threat model, incident response process
- **ACCESSIBILITY.md**: WCAG 2.1 AA+ compliance checklist and testing results
- **PERFORMANCE.md**: Optimization techniques, bundle size budget (<100KB total)
- **threat-model.md**: Risk assessment and security testing schedule

### Project docs
- **README.md**: Main deployment and customization guide
- **SETUP_COMPLETE.md**: Comprehensive project summary and launch checklist
- **LAUNCH_CHECKLIST.md**: Quick reference for deployment steps

## Common Customization Tasks

### Updating Colors
Edit `:root` and `[data-theme="light"]` variables in css/styles.css:
```css
/* Dark theme */
:root {
  --color-accent-primary: #yourcolor;
  --color-accent-secondary: #yourcolor;
}

/* Light theme */
[data-theme="light"] {
  --color-accent-primary: #yourcolor;
  --color-accent-secondary: #yourcolor;
}
```

### Adding New Projects
1. Edit `assets/data/projects.json`
2. Add new object to `projects` array with all required fields
3. Projects automatically populate on projects.html with filtering

### Updating Skills/Proficiency
1. Edit `assets/data/skills.json`
2. Adjust `level` values (1-5 scale)
3. Skills automatically render with progress bars on about.html

### Changing Social Links
Update footer links in all HTML files:
- GitHub URL (currently placeholder)
- LinkedIn URL (https://www.linkedin.com/in/enzocmoro/)
- Spotify URL (https://open.spotify.com/user/enzocmoro-br)
- Email (enzocmoro@gmail.com)

### Using Lightbox for Images
To enable lightbox viewer for images:
1. Add class `lightbox-trigger` to the `<img>` element
2. Optionally wrap in `<div data-gallery="gallery-name">` for multi-image galleries
3. Add `data-caption="Your caption"` for image descriptions

Example:
```html
<div data-gallery="project-1">
  <img src="image1.jpg" alt="Screenshot" class="lightbox-trigger" data-caption="Project overview">
  <img src="image2.jpg" alt="Details" class="lightbox-trigger" data-caption="Feature details">
</div>
```

### Adding Copy-to-Clipboard to Pages
The copy-code.js script is currently enabled on devsecops.html. To enable on other pages:
1. Add `<script src="js/copy-code.js"></script>` before other scripts
2. Code blocks in `<pre>` or `<code>` tags automatically get copy buttons

## Performance Targets

From lighthouserc.json:
- **Performance**: ≥90
- **Accessibility**: ≥95
- **SEO**: ≥90
- **Cumulative Layout Shift (CLS)**: ≤0.1
- **Largest Contentful Paint (LCP)**: ≤2.5s

Current size: ~60KB total (well under 100KB budget)

## Git Workflow

### Current Branch
- Main branch: `main`
- GitHub Pages deploys from `main` branch, `/root` folder

### Modified Files (Uncommitted)
Current git status shows modifications to:
- about.html
- assets/data/projects.json
- assets/data/skills.json
- contact.html
- devsecops.html
- index.html
- projects.html

### Workflow Automation
- All workflows run on push to main
- CodeQL and ZAP run on schedule (nightly)
- Lighthouse runs only on push to main (not PRs)

## Browser Support

Target browsers:
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features used (Intersection Observer, classes, arrow functions)
- CSS Grid and Flexbox for layouts
- No IE11 support required

## Key Files NOT to Modify

- `robots.txt` - SEO directives
- `sitemap.xml` - Search engine sitemap (update URLs only)
- `.github/workflows/*.yml` - CI/CD pipelines (update URLs only)
- `lighthouserc.json` - Performance thresholds (update URLs only)

## Troubleshooting

### Workflows Failing
- Check GitHub Actions tab for detailed logs
- Common issues: Invalid HTML, broken links, CSP violations
- Review workflow-specific artifacts for validation reports

### Contact Form Not Working
- Verify Formspree form ID is correctly configured
- Check CSP allows formspree.io domain
- Test in incognito to rule out browser extensions

### Site Not Updating After Push
- Wait 2-3 minutes for GitHub Pages rebuild
- Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
- Check repository Settings → Pages for deployment status

### Low Lighthouse Scores
- Run audit locally: `npx lighthouse <URL> --view`
- Check for missing images, heavy JavaScript, layout shifts
- Review PERFORMANCE.md for optimization guidelines
