// Navigation Toggle & Active Link Highlighting
class Navigation {
  constructor() {
    this.menuToggle = document.querySelector(".menu-toggle");
    this.navMenu = document.querySelector("nav ul");
    this.navLinks = document.querySelectorAll("nav a");
    this.init();
  }

  init() {
    if (this.menuToggle) {
      this.menuToggle.addEventListener("click", () => this.toggleMenu());
    }

    // Close menu when link is clicked
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => this.closeMenu());
    });

    // Highlight active link based on current page
    this.updateActiveLink();

    // Update on scroll for same-page links
    window.addEventListener("scroll", () => this.updateActiveLink());
  }

  toggleMenu() {
    this.navMenu.classList.toggle("active");
  }

  closeMenu() {
    this.navMenu.classList.remove("active");
  }

  updateActiveLink() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    this.navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === currentPage || (currentPage === "" && href === "index.html")) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new Navigation();
});
