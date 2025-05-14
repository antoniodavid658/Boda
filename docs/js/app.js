//Bloque Contador
function updateCountdown() {
    const weddingDate = new Date("2025-09-10T00:00:00");
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
        document.getElementById("countdown").innerHTML = "<p>¡Ya es el gran día!</p>";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").textContent = days.toString().padStart(2, '0');
    document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();
//Bloque Contador


//Bloque QR
const qrUrl = "https://docs.google.com/forms/d/1DsPrmGRMTvQHrFi8iOFjVJY791PNfFvjWa647sc64jA/viewform";
new QRCode(document.getElementById("qrcode"), {
    text: qrUrl,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
});
//Bloque QR

//Bloque de animaciones
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const animation = el.dataset.animate || 'animate__fadeInUp'; // Valor por defecto
            const delay = el.dataset.delay || 0;

            setTimeout(() => {
                el.classList.remove('opacity-0');
                el.classList.add('animate__animated', animation);
            }, delay);

            observer.unobserve(el); // Solo una vez
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});