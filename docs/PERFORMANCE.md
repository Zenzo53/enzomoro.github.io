# Performance Guidelines

This portfolio site prioritizes performance and user experience.

## Performance Metrics

### Lighthouse Targets

- **Performance:** ≥ 90
- **Accessibility:** ≥ 95
- **SEO:** ≥ 90
- **Best Practices:** ≥ 90

### Core Web Vitals

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

## Optimization Techniques

### CSS

- **Single stylesheet:** `css/styles.css` (minimal, no unused rules)
- **Critical CSS:** All above-the-fold styles inline or early-loaded
- **No media query overload:** Efficient responsive breakpoints
- **Minification:** Remove comments/whitespace for production

### JavaScript

- **Vanilla JS:** No frameworks or large libraries
- **Async loading:** Scripts load after DOM
- **Event delegation:** Reduces event listeners
- **Intersection Observer:** Lazy-load animations only when visible

### Images & Assets

- **No raster images:** SVG icons, no PNG/JPG bloat
- **System fonts:** No web font downloads
- **Data URIs:** Icons inlined where appropriate
- **Compressed assets:** GZIP compression by GitHub Pages

### Network & Delivery

- **Static hosting:** GitHub Pages, global CDN
- **HTTP/2:** Multiplexing by default
- **HTTPS:** Forced by GitHub Pages
- **Cache headers:** GitHub Pages default caching

## Size Budget

| Asset | Target | Current |
|-------|--------|---------|
| HTML (per page) | < 20KB | ~15KB |
| CSS | < 50KB | ~35KB |
| JS (total) | < 30KB | ~15KB |
| Images | < 20KB | 0KB |
| **Total page load** | **< 100KB** | **~60KB** |

## Best Practices

### Code Quality

- Minify CSS/JS for production
- Remove console.log statements
- Use semantic HTML (saves rendering)
- Minimize DOM queries

### Rendering Performance

- Use `will-change` sparingly
- GPU-accelerated animations (transform, opacity)
- Avoid layout thrashing
- Batch DOM updates

### Accessibility ⊆ Performance

- Respecting `prefers-reduced-motion` → fewer animations
- Smaller page size → faster for all users
- Semantic HTML → faster parsing

## Monitoring & Reports

### Local Testing

```bash
# Install Lighthouse CLI
npm install -g @lhci/cli@latest lighthouse

# Run audit
lighthouse https://yoursitename.github.io --chrome-flags="--headless"

# Generate report
lhci autorun
```

### Continuous Monitoring

- **Lighthouse CI** – Runs on every push
- **Workflow artifacts** – Reports uploaded to Actions
- **Trend tracking** – Monitor performance over time

## Common Performance Issues & Fixes

### Issue: High LCP
**Solution:** Reduce server response time, defer non-critical JS

### Issue: Layout Shift (CLS)
**Solution:** Reserve space for dynamic content, avoid unsized images

### Issue: Slow JS Execution
**Solution:** Use `requestAnimationFrame`, break long tasks into chunks

### Issue: Render-blocking resources
**Solution:** Async/defer scripts, inline critical CSS

## Future Optimization

- [ ] Image optimization (if images added)
- [ ] Service Worker for offline support
- [ ] HTTP/2 Server Push (if applicable)
- [ ] Preload critical resources

---

**Last Updated:** November 2025  
**Status:** Optimized for production
