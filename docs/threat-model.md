# Threat Model

## Asset Inventory

### High-Value Assets

1. **Contact Information** – Email, social links (public by design)
2. **Project Portfolio** – Code samples, demos (public by design)
3. **GitHub Repository** – Source code, deployment configurations
4. **Domain/GitHub Pages** – Site availability, reputation

### Protected Assets

1. **Formspree Form Data** – User messages (retained by Formspree, see their privacy policy)
2. **GitHub Secrets** – Credentials, deployment tokens (GitHub manages)
3. **Analytics Data (optional)** – User behavior (Plausible Analytics manages)

---

## Threat Categories & Mitigations

### 1. Website Defacement / Code Injection

**Threat:** Attacker modifies site content or injects malicious code

**Attack Vectors:**
- Compromise GitHub account (2FA bypass, phishing)
- Inject code via form submissions
- CSS/JS vulnerabilities (XSS)
- Supply chain attack (malicious dependencies)

**Mitigations:**

- ✓ **2FA enforced** on GitHub account
- ✓ **No external JS libraries** – vanilla JS only
- ✓ **CSP with `frame-ancestors 'none'`** – prevent framing
- ✓ **No `innerHTML` with user input** – safe DOM methods only
- ✓ **No npm/build dependencies** – no supply chain risk
- ✓ **CodeQL SAST scanning** – detects JS vulnerabilities
- ✓ **Gitleaks secret scanning** – blocks credential commits

**Residual Risk:** Medium (depends on GitHub account security)

---

### 2. Credential Leakage / Secret Exposure

**Threat:** API keys, tokens, or credentials exposed in code/history

**Attack Vectors:**
- Hardcoded secrets in source code
- Accidental commit of `.env` files
- GitHub history browsing
- Dependency vulnerabilities

**Mitigations:**

- ✓ **Gitleaks** – fails workflow if secrets detected
- ✓ **No build dependencies** – no transitive leaks
- ✓ **GitHub Secrets** – credentials never in repo
- ✓ `.gitignore` – .env, local config files
- ✓ **No credentials in workflows** – use masked secrets

**Residual Risk:** Low (scanning + manual review)

---

### 3. XSS (Cross-Site Scripting)

**Threat:** Malicious script injection via form data or URL parameters

**Attack Vectors:**
- Reflected XSS (URL parameters – NOT applicable, no backend)
- Stored XSS (form data – NOT applicable, no database)
- DOM-based XSS (JavaScript manipulation)

**Mitigations:**

- ✓ **No `innerHTML` with user input** – use `textContent`
- ✓ **CSP with `script-src 'self'`** – blocks external scripts
- ✓ **No inline event handlers** – all `addEventListener`
- ✓ **CodeQL SAST** – detects XSS patterns
- ✓ **No eval() or `Function()` constructor**

**Residual Risk:** Very Low (static site + safe DOM methods)

---

### 4. Clickjacking

**Threat:** Attacker embeds site in malicious iframe, tricks user into clicking hidden elements

**Attack Vectors:**
- Framing site in attacker's iframe
- Overlay attack (button under hidden iframe)

**Mitigations:**

- ✓ **CSP `frame-ancestors 'none'`** – prevents framing
- ✓ **GitHub Pages served over HTTPS** – secure by default

**Residual Risk:** Very Low (CSP enforced)

---

### 5. CSRF (Cross-Site Request Forgery)

**Threat:** Attacker tricks user into submitting form to attacker's server

**Attack Vectors:**
- Hidden form submissions
- `<img>` tag with GET request side effect

**Mitigations:**

- ✓ **Formspree handles CSRF tokens** – not our concern
- ✓ **No state-changing GET requests**
- ✓ **POST-only for forms** – state-changing operations
- ✓ **SameSite cookie attributes** (handled by Formspree)

**Residual Risk:** Low (Formspree's responsibility)

---

### 6. Information Disclosure

**Threat:** Sensitive information exposed via error messages, headers, or comments

**Attack Vectors:**
- Detailed error messages in console
- Source maps deployed
- Comments in production code
- Verbose error responses

**Mitigations:**

- ✓ **No source maps in production** – minified JS only
- ✓ **Minimal error logging** – no sensitive data
- ✓ **Remove console.log statements** – production build
- ✓ **CSP report-only** – monitors violations without blocking
- ✓ **OWASP ZAP scans** – detects info leaks

**Residual Risk:** Low (static site, limited verbosity)

---

### 7. Denial of Service (DoS)

**Threat:** Attacker overwhelms site, making it unavailable

**Attack Vectors:**
- DDoS against GitHub Pages
- Form spam (honeypot bypass)
- Resource exhaustion (heavy animations)

**Mitigations:**

- ✓ **GitHub Pages DDoS protection** – handled by GitHub
- ✓ **Honeypot field** – spam detection
- ✓ **Formspree rate limiting** – prevents form spam
- ✓ **Efficient JS** – no CPU-intensive operations
- ✓ **Respects `prefers-reduced-motion`** – lighter animations

**Residual Risk:** Low (third-party services handle DDoS)

---

### 8. Supply Chain Attack

**Threat:** Malicious third-party service compromises site

**Attack Vectors:**
- Formspree compromise
- Plausible Analytics compromise
- GitHub Pages compromise

**Mitigations:**

- ✓ **No npm dependencies** – no package manager attack
- ✓ **Minimal third-party dependencies** – only Formspree + Plausible (optional)
- ✓ **Trusted vendors** – GitHub, Formspree, Plausible
- ✓ **Subresource Integrity (SRI)** – if external scripts added
- ✓ **Regular security audits** – vendor security reviews

**Residual Risk:** Medium (depends on third-party vendors)

---

### 9. Account Compromise (GitHub)

**Threat:** Attacker gains access to GitHub account, modifies site/code

**Attack Vectors:**
- Weak password
- Phishing attack
- Malware on local machine
- Compromised recovery codes

**Mitigations:**

- ✓ **2FA enabled** (recommended: authenticator app, not SMS)
- ✓ **Strong password** – 16+ chars, random
- ✓ **Recovery codes backed up securely**
- ✓ **IP whitelisting** (optional, enterprise GitHub)
- ✓ **Review authorized apps** – revoke unused
- ✓ **SSH keys** – instead of HTTPS token (no password in git)

**Residual Risk:** Medium (depends on user's local security)

---

### 10. Data Privacy Violations

**Threat:** User data collected/retained without consent

**Attack Vectors:**
- Analytics tracking without opt-in
- Form data retained indefinitely
- Third-party cookies
- GDPR/CCPA violations

**Mitigations:**

- ✓ **Analytics disabled by default** – must opt-in to config
- ✓ **Privacy policy in footer** – clear data handling
- ✓ **Formspree privacy compliance** – GDPR-ready
- ✓ **No tracking cookies** – no cookies at all
- ✓ **Consent banner** (if analytics enabled)

**Residual Risk:** Low (explicit opt-in + compliance)

---

## Risk Matrix

| Threat | Likelihood | Impact | Mitigation | Residual Risk |
|--------|-----------|--------|-----------|---------------|
| Defacement | Low | High | CSP, 2FA, SAST | Medium |
| Secrets Leak | Low | High | Gitleaks, .gitignore | Low |
| XSS | Low | High | CSP, safe DOM | Very Low |
| Clickjacking | Very Low | Medium | CSP frame-ancestors | Very Low |
| CSRF | Very Low | Medium | Formspree tokens | Low |
| Info Disclosure | Low | Medium | Minimize verbosity | Low |
| DoS | Low | High | Third-party protection | Low |
| Supply Chain | Low | High | Minimal deps, trusted vendors | Medium |
| Account Compromise | Medium | Critical | 2FA, strong password | Medium |
| Privacy Violations | Low | Medium | Opt-in, privacy policy | Low |

---

## Security Testing Schedule

| Test | Frequency | Tool |
|------|-----------|------|
| SAST (CodeQL) | Every push + nightly | GitHub CodeQL |
| DAST (ZAP Baseline) | Nightly + manual | OWASP ZAP |
| Secret Scanning | Every push | Gitleaks |
| Dependency Check | On config change | npm audit (if applicable) |
| Accessibility Audit | Every push | Lighthouse |
| Link Validation | Every push | Lychee |

---

## Incident Response Plan

### Detection

- Monitor GitHub Actions for workflow failures
- Subscribe to GitHub security alerts
- Review CSP violations (if report-only enabled)

### Response

1. **Confirm incident** – Is it real or false alarm?
2. **Contain** – Disable compromised credentials, revoke access
3. **Eradicate** – Remove malicious code, update secrets
4. **Recover** – Redeploy clean version, notify users
5. **Learn** – Post-incident review, improve controls

### Escalation

- **Critical:** Email security@example.com immediately
- **High:** Report within 24 hours
- **Medium/Low:** Address in next release

---

## Assumptions & Limitations

### Assumptions

- GitHub account remains secure (user responsibility)
- Third-party services (Formspree, Plausible) remain trustworthy
- Site visitors are not adversarial
- No law enforcement or nation-state attackers targeted

### Out of Scope

- Client-side malware (user's machine)
- Physical security of infrastructure
- Social engineering of site owner
- 0-day vulnerabilities in GitHub/third-parties

---

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CVSS Risk Rating](https://www.first.org/cvss/)
- [Microsoft Threat Modeling](https://www.microsoft.com/en-us/securityengineering/sdl/threatmodeling)

---

**Last Updated:** November 2025  
**Status:** Active  
**Next Review:** June 2026
