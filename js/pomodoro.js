function pomodoroTimer() {
    // DISPLAY ELEMENTS
    const pomoMinutes = document.getElementById("pomodoro-minutes");
    const pomoSeconds = document.getElementById("pomodoro-seconds");

    // BUTTONS
    const startBtn = document.getElementById("start-pomodoro-btn");
    const pauseBtn = document.getElementById("pause-pomodoro-btn");
    const resetBtn = document.getElementById("reset-pomodoro-btn");


    let timeLeft = 25 * 60;
    let isRunning = false;
    let intervalId = null;


    let mode = "trabajo";
    let pomodoroCount = 0;
    const modeDisplay = document.getElementById("pomodoro-mode");
    const countDisplay = document.getElementById("pomodoro-count");

    // PRODUCCION
    const WORK_DURATION = 25 * 60;
    const SHORT_BREAK = 5 * 60;
    const LONG_BREAK = 15 * 60;

    // TESTING
    // const WORK_DURATION = 5;
    // const SHORT_BREAK = 3;
    // const LONG_BREAK = 7;

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        pomoMinutes.textContent = minutes.toString().padStart(2, '0');
        pomoSeconds.textContent = seconds.toString().padStart(2, '0');
    }

    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        intervalId = setInterval(() => {
            timeLeft--;
            updateDisplay();

            if (timeLeft <= 0) {
                clearInterval(intervalId);
                isRunning = false;

                if (mode === "trabajo") {
                    pomodoroCount++;
                    countDisplay.textContent = pomodoroCount;

                    if (pomodoroCount % 4 === 0) {
                        mode = "Descanso largo";
                        timeLeft = LONG_BREAK;
                    } else {
                        mode = "Descanso corto";
                        timeLeft = SHORT_BREAK;
                    }
                } else {
                    mode = "trabajo";
                    timeLeft = WORK_DURATION;
                }

                let modeText;
                if (mode === "trabajo") {
                    modeText = "Trabajo";
                } else if (mode === "Descanso corto") {
                    modeText = "Descanso corto";
                } else {
                    modeText = "Descanso largo";
                }
                modeDisplay.textContent = modeText;

                updateDisplay();
                showToast(`¡Tiempo terminado! Siguiente: ${modeDisplay.textContent}`, "success");
            }
        }, 1000);
    }

    function pauseTimer() {
        if (!isRunning) return;
        clearInterval(intervalId);
        isRunning = false;
    }

    function resetTimer() {
        clearInterval(intervalId);
        isRunning = false;
        timeLeft = 25 * 60;
        updateDisplay();
    }

    startBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resetBtn.addEventListener("click", resetTimer);

}