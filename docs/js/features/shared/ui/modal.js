// js/features/shared/ui/modal.js

let activeModal = null;
let previouslyHiddenSiblings = [];

export function setupModal({ openButtonId, modalId, closeButtonId }) {
  const openBtn = openButtonId ? document.getElementById(openButtonId) : null;
  const modal = document.getElementById(modalId);
  const closeBtn = document.getElementById(closeButtonId);

  if (!modal || !closeBtn) return;

  // Helper: Get all focusable elements in modal
  function getFocusableElements() {
    return modal.querySelectorAll(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
  }

  // Helper: Hide all siblings of modal
  function hideSiblings() {
    previouslyHiddenSiblings = [];
    const parent = modal.parentElement;
    if (!parent) return;
    Array.from(parent.children).forEach((el) => {
      if (el !== modal && !el.hasAttribute('aria-hidden')) {
        el.setAttribute('aria-hidden', 'true');
        previouslyHiddenSiblings.push(el);
      }
    });
  }

  // Helper: Restore aria-hidden on siblings
  function restoreSiblings() {
    previouslyHiddenSiblings.forEach((el) => el.removeAttribute('aria-hidden'));
    previouslyHiddenSiblings = [];
  }

  function openModal() {
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('open');
    modal.style.display = 'flex';
    document.body.classList.add('body--no-scroll'); // 🔒 lock scroll
    activeModal = modal;
    hideSiblings();
    getFocusableElements()[0]?.focus();
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('open');
    modal.style.display = 'none';
    document.body.classList.remove('body--no-scroll'); // 🔓 unlock scroll
    activeModal = null;
    restoreSiblings();

    // ✅ Only try to focus if the open button still exists in DOM
    if (openBtn && document.body.contains(openBtn)) {
      setTimeout(() => openBtn.focus(), 50);
    }
  }

  // Attach openBtn if it exists
  if (openBtn) openBtn.addEventListener('click', openModal);

  closeBtn.addEventListener('click', closeModal);

  // Keyboard trap
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      const focusable = Array.from(getFocusableElements());
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Close on Escape key (only if this modal is active)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeModal === modal && modal.style.display !== 'none') {
      closeModal();
    }
  });

  // Optional: Close when clicking outside modal content (unless destructive)
  modal.addEventListener('mousedown', (e) => {
    const isDestructive = modal.classList.contains('modal--destructive');
    if (e.target === modal && !isDestructive) closeModal();
  });

  // Return control functions
  return { openModal, closeModal };
}
