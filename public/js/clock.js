/* =====================================================
   DIGITAL CLOCK
===================================================== */
document.addEventListener("DOMContentLoaded", () => {

    /* --------------------------------------------------
       ELEMENTOS DO DOM
    --------------------------------------------------- */
    const clockElement = document.getElementById("MyClockDisplay");
    if (!clockElement) return;

    /* --------------------------------------------------
       ATUALIZAR RELÓGIO
    --------------------------------------------------- */
    function updateClock() {
        const now = new Date();

        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");

        clockElement.textContent = `${hours}:${minutes}`;
    }

    /* --------------------------------------------------
       INICIAR RELÓGIO
    --------------------------------------------------- */
    updateClock();
    setInterval(updateClock, 1000);
});
