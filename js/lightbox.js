// Lightbox Image Viewer
class Lightbox {
  constructor() {
    this.lightbox = null;
    this.currentIndex = 0;
    this.images = [];
    this.init();
  }

  init() {
    this.createLightbox();
    this.setupImageListeners();
    this.setupKeyboardNav();
  }

  createLightbox() {
    // Create lightbox container
    this.lightbox = document.createElement('div');
    this.lightbox.id = 'lightbox';
    this.lightbox.className = 'lightbox';
    this.lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
        <button class="lightbox-prev" aria-label="Previous image">&#10094;</button>
        <button class="lightbox-next" aria-label="Next image">&#10095;</button>
        <img src="" alt="" class="lightbox-image">
        <div class="lightbox-caption"></div>
      </div>
    `;

    document.body.appendChild(this.lightbox);

    // Setup close button
    this.lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.close());

    // Setup navigation buttons
    this.lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.prev());
    this.lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.next());

    // Close on background click
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.close();
      }
    });
  }

  setupImageListeners() {
    // Add click listeners to all images with lightbox class
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (target.classList.contains('lightbox-trigger')) {
        e.preventDefault();
        this.open(target);
      }
    });
  }

  setupKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('active')) return;

      switch(e.key) {
        case 'Escape':
          this.close();
          break;
        case 'ArrowLeft':
          this.prev();
          break;
        case 'ArrowRight':
          this.next();
          break;
      }
    });
  }

  open(imageElement) {
    // Get all images in the same gallery
    const gallery = imageElement.closest('[data-gallery]');
    if (gallery) {
      this.images = Array.from(gallery.querySelectorAll('.lightbox-trigger'));
    } else {
      this.images = [imageElement];
    }

    this.currentIndex = this.images.indexOf(imageElement);
    this.showImage();
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  close() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }

  showImage() {
    const img = this.images[this.currentIndex];
    const lightboxImg = this.lightbox.querySelector('.lightbox-image');
    const caption = this.lightbox.querySelector('.lightbox-caption');

    lightboxImg.src = img.src || img.dataset.fullsize || img.href;
    lightboxImg.alt = img.alt || '';
    caption.textContent = img.dataset.caption || img.alt || '';

    // Show/hide navigation buttons
    const prevBtn = this.lightbox.querySelector('.lightbox-prev');
    const nextBtn = this.lightbox.querySelector('.lightbox-next');

    if (this.images.length > 1) {
      prevBtn.style.display = 'block';
      nextBtn.style.display = 'block';
    } else {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    }
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.showImage();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.showImage();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Lightbox();
});
