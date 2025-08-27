// js/components/cardListToggle.js
export function initCardListToggle() {
  const toggleBtn = document.getElementById("card-container-list__toggle");
  const panel = document.getElementById("card-container-list__inner");

  if (!toggleBtn || !panel) return;

  toggleBtn.addEventListener("click", () => {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";

    toggleBtn.setAttribute("aria-expanded", String(!isExpanded));
    toggleBtn.innerHTML = isExpanded ? "My Deck ▼" : "My Deck ▲";

    panel.classList.toggle("is-collapsed", isExpanded);
  });
}
