function initDashboard() {
  getDataWeather();
  clock();
  dateInfo();
  taskManager();
  loadStats();
  loadNotesFromAPI();
}

setupAuthUI();
setupLogout();
setupCityModal();
setupNotesModal();
setInterval(getDataWeather, 1800000);
setInterval(clock, 1000);
pomodoroTimer();
checkSession();

