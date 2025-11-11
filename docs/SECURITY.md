# Security Policy

This document outlines the security practices, policies, and guidelines for this portfolio website.

## 1. Content Security Policy (CSP)

### Report-Only Implementation

This site uses a **report-only** CSP to monitor violations without blocking functionality. GitHub Pages doesn't support HTTP headers, so CSP is implemented via `<meta>` tag.

### Recommended CSP

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://plausible.io;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: https:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://formspree.io https://plausible.io;
  frame-ancestors 'none'
" />
```

### Policy Rationale

- **default-src 'self'** – Only allow same-origin resources by default
- **script-src 'unsafe-inline'** – Vanilla JS requires inline scripts; no third-party frameworks
- **style-src 'unsafe-inline'** – CSS is embedded in styles.css; no external stylesheets
- **img-src** – Allow SVG/data URIs for icons
- **frame-ancestors 'none'** – Prevent clickjacking by disallowing framing
- **connect-src** – Only allow connections to Formspree (forms) and Plausible (analytics)

## 2. Attack Surface & Mitigations

### XSS (Cross-Site Scripting)

**Mitigation:**
- No external JavaScript libraries – vanilla JS only
- No `innerHTML` with user input – use `textContent` or safe DOM methods
- All external links use `target="_blank" rel="noopener noreferrer"`
- No inline event handlers (all event listeners use `addEventListener`)

### CSRF (Cross-Site Request Forgery)

**Mitigation:**
- Formspree handles CSRF token generation for forms
- No state-changing GET requests
- All form submissions use POST

### Clickjacking

**Mitigation:**
- CSP `frame-ancestors 'none'` prevents embedding in iframes
- No sensitive actions in clickable regions

### Injection Attacks

**Mitigation:**
- No backend/database – static site only
- No user input execution
- Form data sent only to Formspree (trusted third-party)

### Sensitive Data Exposure

**Mitigation:**
- No API keys hardcoded
- All secrets stored in GitHub Secrets
- Contact info is public-facing intentionally (portfolio)
- HTTPS enforced by GitHub Pages

## 3. Secret Scanning

### Gitleaks Workflow

Gitleaks runs on every push and PR to detect:
- AWS keys and secrets
- GitHub tokens
- Private keys (RSA, PGP, etc.)
- Database credentials
- API tokens

**Policy:** Any detected secret **fails the workflow** and blocks the commit.

### Best Practices

- Use `.gitignore` for `.env` and local config files
- Never commit credentials to version control
- Rotate any exposed secrets immediately
- Use GitHub Secrets for CI/CD credentials

## 4. Dependency Security

### Build Dependencies

This static site has **no npm/build dependencies** committed to the repository. All security tooling runs in GitHub Actions:

- html5validator (Docker)
- stylelint (npx, CI only)
- Gitleaks (GitHub Action)
- CodeQL (GitHub Action)
- OWASP ZAP (GitHub Action)
- Lighthouse (GitHub Action)

### Third-Party Assets

- **Fonts:** System UI font stack (no CDN)
- **Icons:** Unicode symbols (no dependencies)
- **Analytics (optional):** Plausible Analytics (privacy-focused)
- **Forms:** Formspree (serverless, GDPR-compliant)

### SBOM (Software Bill of Materials)

See `SBOM.md` for complete inventory.

## 5. SAST (Static Application Security Testing)

### CodeQL for JavaScript

CodeQL scans for:
- XSS vulnerabilities
- SQL injection patterns
- CSRF weaknesses
- Insecure cryptography
- Path traversal flaws

**View Results:** Settings → Security → Code scanning → CodeQL alerts

## 6. DAST (Dynamic Application Security Testing)

### OWASP ZAP Baseline

ZAP scans the deployed site for:
- Missing security headers
- SSL/TLS misconfigurations
- Cookie security issues
- Outdated library versions
- Information disclosure

**Schedule:** Nightly at 3 AM UTC + manual triggers

**Failure Policy:** High/Medium alerts fail the workflow

## 7. Incident Response

### Reporting a Vulnerability

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email security concerns to: `your.email@example.com`
3. Include description, reproduction steps, and severity
4. Expected response time: 48 hours

### Scope

This security policy covers:
- The portfolio website codebase
- GitHub Pages deployment
- GitHub Actions workflows

This policy does NOT cover:
- Third-party services (Formspree, Plausible, GitHub)
- User devices or networks
- Social engineering attacks

### Patch Timeline

- **Critical:** Fixed within 24 hours
- **High:** Fixed within 7 days
- **Medium:** Fixed within 30 days
- **Low:** Fixed in next release

## 8. Privacy

### Data Collection

- **Disabled by default** – No analytics, no tracking
- **Optional:** Privacy-respecting analytics (Plausible) can be enabled
- **Forms:** Data sent to Formspree; not retained by this site

### External Services

- **Formspree** – GDPR-compliant form handler
- **Plausible (optional)** – Privacy-first analytics (no cookies)
- **GitHub** – Repository hosting and Pages deployment

See Formspree and Plausible privacy policies for details.

## 9. Compliance

### WCAG 2.1 AA+

- Semantic HTML5 with landmarks
- Color contrast ≥ 4.5:1 (AA+)
- Keyboard navigation fully supported
- ARIA labels for interactive controls
- Respects `prefers-reduced-motion`

See `ACCESSIBILITY.md` for details.

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6 JavaScript support required
- CSS Grid and Flexbox
- No IE11 support

---

## 10. Security Checklist

- [ ] CSP meta tag present in all pages
- [ ] No inline event handlers
- [ ] External links use `rel="noopener noreferrer"`
- [ ] No hardcoded secrets
- [ ] Gitleaks passes on all commits
- [ ] CodeQL scan passes
- [ ] ZAP baseline scan passes
- [ ] HTTPS enforced (GitHub Pages default)
- [ ] No mixed content warnings
- [ ] 404 page configured

---

## 11. GitHub Actions Security

### Workflow Permissions

All workflows run with minimal permissions:
- `contents: read` – Read repository
- `security-events: write` – Report findings
- `checks: write` – Upload reports
- `pull-requests: write` – Comment on PRs

### Action Versions

- **Pinned to stable versions** – No floating tags (v1, v2)
- **Regularly updated** – Dependency updates scheduled
- **Signed commits** – Workflows can require signed commits

### Secrets Management

- No secrets exposed in workflow logs
- Secrets stored in GitHub Settings → Secrets
- Limited to necessary actions only

---

## 12. References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [Web Security Academy](https://portswigger.net/web-security)

---

**Last Updated:** November 2025  
**Status:** Active  
**Next Review:** June 2026
