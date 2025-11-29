// ChaseCase Page JavaScript

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgressBar');
    if (!progressBar) return;

    function updateProgress() {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = totalScroll / windowHeight;
        progressBar.style.width = `${scroll * 100}%`;
    }

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
});

