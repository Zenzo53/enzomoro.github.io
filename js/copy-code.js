// Copy to Clipboard for Code Snippets
class CopyCode {
  constructor() {
    this.init();
  }

  init() {
    // Find all code blocks
    const codeBlocks = document.querySelectorAll('pre code, pre, code.code-block');

    codeBlocks.forEach(block => {
      // Skip if already has copy button
      if (block.parentElement.querySelector('.copy-btn')) return;

      // Create wrapper if needed
      let wrapper = block.closest('pre') || block.parentElement;

      // Make sure wrapper has position relative
      if (getComputedStyle(wrapper).position === 'static') {
        wrapper.style.position = 'relative';
      }

      // Create copy button
      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-btn';
      copyBtn.innerHTML = `
        <span class="copy-icon">📋</span>
        <span class="copy-text">Copy</span>
      `;
      copyBtn.setAttribute('aria-label', 'Copy code to clipboard');

      // Add click listener
      copyBtn.addEventListener('click', () => this.copyToClipboard(block, copyBtn));

      // Insert button
      wrapper.appendChild(copyBtn);
    });
  }

  async copyToClipboard(codeBlock, button) {
    // Get the text content
    const code = codeBlock.textContent || codeBlock.innerText;

    try {
      // Use modern Clipboard API if available
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(code);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = code;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      // Show success feedback
      this.showSuccess(button);
    } catch (err) {
      console.error('Failed to copy:', err);
      this.showError(button);
    }
  }

  showSuccess(button) {
    const icon = button.querySelector('.copy-icon');
    const text = button.querySelector('.copy-text');

    // Change to checkmark
    icon.textContent = '✓';
    text.textContent = 'Copied!';
    button.classList.add('copied');

    // Reset after 2 seconds
    setTimeout(() => {
      icon.textContent = '📋';
      text.textContent = 'Copy';
      button.classList.remove('copied');
    }, 2000);
  }

  showError(button) {
    const text = button.querySelector('.copy-text');
    text.textContent = 'Failed';

    setTimeout(() => {
      text.textContent = 'Copy';
    }, 2000);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new CopyCode();
});
