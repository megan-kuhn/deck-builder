// js/features/shared/ui/modal.js
let activeModal = null;
let previouslyHiddenSiblings = [];
let lastFocusedElement = null;

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
      if (el !== modal && !el.hasAttribute("aria-hidden")) {
        el.setAttribute("aria-hidden", "true");
        previouslyHiddenSiblings.push(el);
      }
    });
  }

  // Helper: Restore aria-hidden on siblings
  function restoreSiblings() {
    previouslyHiddenSiblings.forEach((el) => el.removeAttribute("aria-hidden"));
    previouslyHiddenSiblings = [];
  }

  function openModal(triggerEl = null) {
    // Remember who opened this modal
    lastFocusedElement = triggerEl || document.activeElement;

    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("open");
    modal.style.display = "flex";
    document.body.classList.add("body--no-scroll");
    activeModal = modal;
    hideSiblings();

    // Focus the first element inside
    const focusable = getFocusableElements();
    if (focusable.length > 0) {
      focusable[0].focus();
    }
  }

  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    modal.classList.remove("open");
    modal.style.display = "none";
    activeModal = null;
    restoreSiblings();

    requestAnimationFrame(() => {
      document.body.classList.remove("body--no-scroll");
    });

    // Dispatch a close event for external cleanup hooks
    modal.dispatchEvent(new Event("close"));

    // Restore focus universally
    if (lastFocusedElement && document.body.contains(lastFocusedElement)) {
      setTimeout(() => lastFocusedElement.focus(), 50);
    } else if (openBtn && document.body.contains(openBtn)) {
      setTimeout(() => openBtn.focus(), 50);
    }
  }

  // Attach open button if present
  if (openBtn) {
    openBtn.addEventListener("click", (e) => openModal(e.currentTarget));
  }

  closeBtn.addEventListener("click", closeModal);

  // Keyboard trap
  modal.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
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

  // Close on Escape (only active modal)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && activeModal === modal && modal.style.display !== "none") {
      closeModal();
    }
  });

  // Close when clicking outside content (desktop + mobile)
  ["mousedown", "touchstart"].forEach((evt) => {
    modal.addEventListener(evt, (e) => {
      const isDestructive = modal.classList.contains("modal--destructive");
      if (e.target === modal && !isDestructive) closeModal();
    });
  });

  return { openModal, closeModal };
}
