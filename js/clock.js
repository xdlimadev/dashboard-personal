// ========== RELOJ Y FECHA ==========
function clock() {
    const hour = document.getElementById("hour");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    hour.textContent = h;
    minutes.textContent = m;
    seconds.textContent = s;

}

function dateInfo() {
    const dayname = document.getElementById("day-name");
    const daynum = document.getElementById("day-number");
    const month = document.getElementById("month");
    const year = document.getElementById("year");

    const now = new Date();
    const dayOfWeek = now.getDay();
    const monthIndex = now.getMonth();
    const dayNumber = now.getDate();
    const fullYear = now.getFullYear();

    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    dayname.textContent = days[dayOfWeek];
    daynum.textContent = dayNumber;
    month.textContent = months[monthIndex];
    year.textContent = fullYear;
}