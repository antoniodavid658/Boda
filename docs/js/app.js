//Bloque Contador
function updateCountdown() {
    const weddingDate = new Date("2025-09-20T17:45:00");
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
        document.getElementById("countdown").innerHTML = "<p>¡YA ES EL GRAN DÍA!</p>";
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
function startAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const animation = el.dataset.animate || "animate__fadeInUp";
                    const delay = el.dataset.delay || 0;

                    setTimeout(() => {
                        el.classList.remove("opacity-0");
                        el.classList.add("animate__animated", animation);
                    }, delay);

                    observer.unobserve(el);
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.observe(el);
    });
}

// BLOQUE MÚSICA Y SOBRE
const welcomeScreen = document.getElementById("welcome-screen");
const enterButton = document.getElementById("enter-button");
const audio = document.getElementById("background-music");
const toggleBtn = document.getElementById("toggle-music");
const pauseIcon = document.getElementById("pause-icon");
const playIcon = document.getElementById("play-icon");

enterButton.addEventListener("click", () => {
    const flap = document.querySelector(".flap");
    flap.style.transform = "rotateX(180deg)";

    setTimeout(() => {
        welcomeScreen.classList.add("hidden");
        document.body.classList.remove("overflow-hidden"); // Habilita scroll
        audio.volume = 0.6;

        audio.play().then(() => {
            pauseIcon.classList.remove("hidden");
            playIcon.classList.add("hidden");
        }).catch((e) => {
            console.log("Audio bloqueado:", e);
            // Si el audio no se reproduce, muestra el icono de play
            pauseIcon.classList.add("hidden");
            playIcon.classList.remove("hidden");
        });

        toggleBtn.classList.remove("hidden");

        // Iniciar animaciones una vez abierto el sobre
        startAnimations();
    }, 800);
});

toggleBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        pauseIcon.classList.remove("hidden");
        playIcon.classList.add("hidden");
    } else {
        audio.pause();
        pauseIcon.classList.add("hidden");
        playIcon.classList.remove("hidden");
    }
});

//BLOQUE GALERÍA

const slider = document.querySelector('#slider');
const slides = slider.querySelectorAll('img');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const container = document.getElementById('slider-container');

let currentSlide = 0;
let startX = 0;

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
}

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

// Touch support
container.addEventListener('touchstart', e => startX = e.touches[0].clientX);
container.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
    }
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

document.getElementById("lightbox-close").addEventListener("click", closeLightbox);


let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = slides[currentIndex].src;
    lightbox.classList.remove('hidden');

    // Zoom in effect
    requestAnimationFrame(() => {
        lightboxImg.classList.remove('scale-95', 'opacity-0');
        lightboxImg.classList.add('scale-100', 'opacity-100');
    });
}

function closeLightbox() {
    lightboxImg.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightboxImg.src = '';
        lightboxImg.classList.remove('scale-100', 'opacity-100');
    }, 300);
}

function showPrevImage() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    lightboxImg.src = slides[currentIndex].src;
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % slides.length;
    lightboxImg.src = slides[currentIndex].src;
}

slides.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxImg) {
        closeLightbox();
    }
});

lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrevImage();
});

lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    showNextImage();
});

let lightboxStartX = 0;

lightbox.addEventListener('touchstart', (e) => {
    lightboxStartX = e.touches[0].clientX;
}, { passive: true });

lightbox.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = lightboxStartX - endX;

    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            showNextImage(); // swipe left
        } else {
            showPrevImage(); // swipe right
        }
    }
}, { passive: true });

//Formulario asistencia

const form = document.getElementById("form-confirmacion");
const submittedKey = "confirmacion_boda";
const previousData = JSON.parse(localStorage.getItem(submittedKey));

function showMessage() {
    const container = document.createElement("div");
    container.className = "text-center mt-6";

    const msg = document.createElement("p");
    msg.className = "text-lg font-semibold text-green-700 mb-4";
    msg.innerText = "Ya has confirmado tu asistencia. ¡Gracias!";

    const btn = document.createElement("button");
    btn.innerText = "Editar respuesta";
    btn.className = "bg-[#d4b083] text-white px-4 py-2 rounded hover:bg-[#9e7b56] transition";
    btn.onclick = () => {
        localStorage.removeItem(submittedKey);
        location.reload();
    };

    container.appendChild(msg);
    container.appendChild(btn);
    form.parentNode.insertBefore(container, form);
    form.style.display = "none";
}

// Si ya hay datos guardados, mostrar mensaje
if (previousData) {
    showMessage();
} else {
    // Prefill si no está oculto
    form.nombre.value = previousData?.nombre || "";
    form.asistencia.value = previousData?.asistencia || "";
    form.companion.value = previousData?.companion || "";
    form.alergia.value = previousData?.alergia || "";
    form.traslado.value = previousData?.traslado || "";
}

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
        nombre: formData.get("nombre"),
        asistencia: formData.get("asistencia"),
        companion: formData.get("companion"),
        alergia: formData.get("alergia"),
        traslado: formData.get("traslado")
    };

    try {
        // Guarda en localStorage
        localStorage.setItem(submittedKey, JSON.stringify(data));

        // Envía los datos al Google Apps Script
        const response = await fetch("https://script.google.com/macros/s/AKfycbyqgXJR3Id8i5RdOhwjsBEyErbXXDdH_n14GpZPB1N1AXeuohOr4NLIS_0Dl67EoacstQ/exec", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) throw new Error("Error en la solicitud");

        // Mostrar mensaje si todo salió bien
        showMessage();
    } catch (error) {
        alert("Hubo un error al enviar el formulario. Intenta de nuevo.");
        console.error(error);
    }
});

