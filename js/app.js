function initDashboard() {
    setupCityModal();
    getDataWeather();
    setInterval(getDataWeather, 1800000);
    clock();
    dateInfo();
    setInterval(clock, 1000);
    pomodoroTimer();
    taskManager();
    loadStats();
    loadNotes();
    renderNotes();
    setupNotesModal();
}

setupAuthUI();
setupLogout();
checkSession();