# Accessibility Statement

This portfolio website is designed and built to meet WCAG 2.1 Level AA+ accessibility standards.

## Accessibility Features

### Semantic HTML5

All pages use semantic markup with proper landmarks:
- `<header>` – Navigation
- `<nav>` – Menu with `aria-label`
- `<main id="main">` – Primary content
- `<section role="region" aria-label="...">` – Content sections
- `<footer role="contentinfo">` – Footer information

### Color & Contrast

- **Text contrast:** ≥ 4.5:1 (WCAG AA+)
- **Background:** Dark theme reduces eye strain
- **Color not sole differentiator:** Important info includes text, not just color

### Keyboard Navigation

- **Tab order:** Logical and intuitive
- **Focus indicators:** Visible 2px outline on all interactive elements
- **Skip link:** "Skip to main content" at top of page
- **No keyboard traps:** All controls accessible without mouse

### Screen Reader Support

- ARIA labels on buttons: `aria-label="Toggle navigation menu"`
- Form fields: Associated labels with `<label for="...">`
- Icon buttons: Text alternatives via ARIA
- Dynamic content: Updates announced

### Motion & Animation

- All animations respect `prefers-reduced-motion` media query
- Users can disable motion in browser settings → smooth experience
- No auto-playing content or flashing elements

### Mobile & Responsive

- **Mobile-first design:** Works at 360px and up
- **Touch targets:** ≥44x44px minimum (WCAG 2.5.5)
- **Viewport:** Proper `<meta name="viewport">` tag
- **Zoom:** 200% zoom fully supported

### Form Accessibility

- All inputs have associated `<label>` tags
- Required fields marked with `*` and `aria-required="true"`
- Error messages linked to fields
- Honeypot spam protection field hidden visually and from screen readers

### Link Attributes

All external links include:
- `target="_blank"` – Opens in new tab (expected behavior)
- `rel="noopener noreferrer"` – Security & privacy
- Visual indicator `::after { content: " ↗"; }`

### Fonts & Typography

- **Base font size:** 1rem (default 16px, user-scalable)
- **Line height:** 1.6 for readability
- **Font stack:** System UI fonts (no custom fonts required)
- **Letter spacing:** Appropriate for headings and navigation

## Testing & Compliance

### Automated Testing

- **html5validator** – HTML structure validation
- **WAVE** – Web Accessibility Evaluation Tool
- **Axe DevTools** – Chrome/Firefox extension
- **Lighthouse** – Accessibility audit (≥95 score)

### Manual Testing

- Keyboard-only navigation (no mouse)
- Screen reader testing (NVDA, JAWS)
- High contrast mode (Windows, macOS)
- Zoom to 200%
- Mobile gesture navigation

### Browser Support

✓ Chrome/Chromium  
✓ Firefox  
✓ Safari  
✓ Edge  
✗ Internet Explorer 11 (not supported)

## Known Limitations

1. **GitHub Pages CSP:** HTTP headers not supported; meta tag CSP used instead
2. **Custom fonts:** None used; system fonts only
3. **Video/Audio:** Not included in this version; captions would be added if present
4. **PDF downloads:** None; all content in HTML

## Assistive Technologies

This site is compatible with:

- **Screen readers:** NVDA, JAWS, VoiceOver
- **Magnification:** ZoomText, browser zoom
- **Speech input:** Dragon NaturallySpeaking
- **Switch control:** Eye-tracking devices
- **High contrast:** Windows High Contrast mode

## Reporting Accessibility Issues

If you encounter an accessibility barrier:

1. **Email:** accessibility@example.com
2. **Include:**
   - Page URL
   - Browser/device
   - Assistive technology used
   - Detailed description
   - Steps to reproduce

**Response time:** 48 hours

## Additional Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)
- [Deque University](https://dequeuniversity.com/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

---

**Last Updated:** November 2025  
**WCAG Conformance:** Level AA+
