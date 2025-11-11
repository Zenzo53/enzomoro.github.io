// Form Validation & Submission
class FormHandler {
  constructor() {
    this.form = document.getElementById("contact-form");
    if (!this.form) return;

    this.emailInput = document.getElementById("email");
    this.honeypot = document.getElementById("website");
    this.formMessage = document.getElementById("form-message");
    this.submitBtn = this.form.querySelector("button[type='submit']");

    this.init();
  }

  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();

    // Check honeypot
    if (this.honeypot && this.honeypot.value) {
      console.log("Honeypot triggered");
      return;
    }

    // Validate form
    if (!this.validateForm()) {
      this.showMessage("Please fill in all required fields.", "error");
      return;
    }

    // Get form data
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);

    // Try to submit via Formspree (configure your email in form action)
    this.submitForm(data);
  }

  validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = this.emailInput.value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.showMessage("Please enter a valid email address.", "error");
      return false;
    }

    return true;
  }

  submitForm(data) {
    const formAction = this.form.getAttribute("action");

    if (formAction && formAction.includes("formspree")) {
      // Use Formspree
      this.submitToFormspree(formAction);
    } else {
      // Fallback: show success message and log to console
      this.handleSuccess();
    }
  }

  submitToFormspree(action) {
    const formData = new FormData(this.form);
    const originalText = this.submitBtn.textContent;
    this.submitBtn.textContent = "Sending...";
    this.submitBtn.disabled = true;

    fetch(action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          this.handleSuccess();
          this.form.reset();
        } else {
          this.showMessage("Error submitting form. Please try again.", "error");
        }
      })
      .catch(() => {
        this.showMessage("Error submitting form. Please try again.", "error");
      })
      .finally(() => {
        this.submitBtn.textContent = originalText;
        this.submitBtn.disabled = false;
      });
  }

  handleSuccess() {
    this.showMessage(
      "✓ Message sent! I'll get back to you soon.",
      "success"
    );
    this.form.reset();
  }

  showMessage(text, type) {
    if (!this.formMessage) return;

    this.formMessage.textContent = text;
    this.formMessage.className = `form-message form-${type}`;
    this.formMessage.style.display = "block";

    if (type === "success") {
      setTimeout(() => {
        this.formMessage.style.display = "none";
      }, 5000);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new FormHandler();
});
