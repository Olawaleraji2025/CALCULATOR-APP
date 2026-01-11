// Shared functionality for all calculators
document.addEventListener("DOMContentLoaded", () => {
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Keyboard event listener for navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "1") {
      window.location.href = "scientific.html";
    } else if (e.key === "2") {
      window.location.href = "bmi.html";
    } else if (e.key === "3") {
      window.location.href = "age.html";
    }
  });
});

// Format number with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
