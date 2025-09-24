// js/utils/safeOverlay.js
// A safe wrapper around bootstrap-autofill-overlay to prevent errors if the library is missing or fails
export function safeOverlayAttach(input) {
  if (!input || !input.parentNode) return;
  try {
    // The library will be on window or imported normally
    if (window.bootstrapAutofillOverlay?.attach) {
      window.bootstrapAutofillOverlay.attach(input);
    }
  } catch (err) {
    console.warn("Skipped overlay attach:", err.message);
  }
}
