document.addEventListener('DOMContentLoaded', () => {
    const clockElement = document.getElementById('MyClockDisplay');

    if (!clockElement) return;

    function updateClock() {
        const now = new Date();

        let hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');

        clockElement.textContent = `${hours}:${minutes}`;
    }

    updateClock();
    setInterval(updateClock, 1000);
});
