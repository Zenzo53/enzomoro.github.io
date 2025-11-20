// Scroll to Top Button
class ScrollToTop {
  constructor() {
    this.button = null;
    this.scrollThreshold = 300; // Show button after scrolling 300px
    this.init();
  }

  init() {
    this.createButton();
    this.setupListeners();
    this.updateButtonVisibility();
  }

  createButton() {
    // Create button element
    this.button = document.createElement('button');
    this.button.id = 'scroll-to-top';
    this.button.className = 'scroll-to-top';
    this.button.setAttribute('aria-label', 'Scroll to top');
    this.button.innerHTML = '<span aria-hidden="true">↑</span>';

    // Append to body
    document.body.appendChild(this.button);
  }

  setupListeners() {
    // Click handler
    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Scroll handler with throttling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        this.updateButtonVisibility();
      }, 100);
    });
  }

  updateButtonVisibility() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPosition > this.scrollThreshold) {
      this.button.classList.add('visible');
    } else {
      this.button.classList.remove('visible');
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ScrollToTop();
});
