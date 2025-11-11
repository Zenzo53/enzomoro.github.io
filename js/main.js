// Main interactions: Intersection observers, animations
class MainInteractions {
  constructor() {
    this.prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
  }

  setupIntersectionObserver() {
    if (this.prefersReducedMotion) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "fadeInUp 0.6s ease-out";
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all cards and timeline items
    document
      .querySelectorAll(".card, .timeline-item, .skill-category")
      .forEach((el) => {
        observer.observe(el);
      });
  }

  setupScrollAnimations() {
    if (this.prefersReducedMotion) return;

    const skillBars = document.querySelectorAll(".skill-fill");
    const observerOptions = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const percentage = entry.target.style.width;
          entry.target.style.width = "0";
          setTimeout(() => {
            entry.target.style.width = percentage;
          }, 100);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    skillBars.forEach((bar) => observer.observe(bar));
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new MainInteractions();
});
