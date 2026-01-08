const slides = document.querySelectorAll('.slide');
let current = 0;

function initializeSlides() {
    slides.forEach((slide, index) => {
        slide.style.transform = index === 0 ? 'translateY(0)' : 'translateY(100%)';
        slide.classList.toggle('active', index === 0);
    });
    current = 0;
}

function showNextSlide() {
    if (current >= slides.length - 1) return;
    
    slides[current].style.transform = 'translateY(-100%)';
    slides[current].classList.remove('active');
    
    current++;
    slides[current].style.transform = 'translateY(0)';
    slides[current].classList.add('active');
}

function showPreviousSlide() {
    if (current <= 0) return;
    
    slides[current].style.transform = 'translateY(100%)';
    slides[current].classList.remove('active');
    
    current--;
    slides[current].style.transform = 'translateY(0)';
    slides[current].classList.add('active');
}

// Clic SOLO arriba o abajo = navegación
document.body.addEventListener('click', (e) => {
    // No navegar si se hace click en botones, links o videos
    if (
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.closest('video')
    ) return;
    
    const y = e.clientY;
    const h = window.innerHeight;
    
    const topZone = h * 0.2;      // 20% superior
    const bottomZone = h * 0.8;   // 20% inferior
    
    if (y <= topZone) {
        showPreviousSlide();
    } else if (y >= bottomZone) {
        showNextSlide();
    }
    // 🔕 zona central (60%) no hace nada
});


window.addEventListener('load', initializeSlides);

/* ====== Fondo dinámico Slide 1 sin flashes ====== */
const slide1 = document.getElementById('slide1');
const bgA = document.getElementById('bgA');
const bgB = document.getElementById('bgB');

const fondos = [
    //'assets/img/proyecto_robos/robos1.jpg',
    'assets/img/proyecto_robos/robos2.png',
    //'assets/img/proyecto_robos/robos3.jpg',
    //'assets/img/proyecto_robos/robos4.jpg',
    'assets/img/fondo_secureplay/Fondo-Mapa.jpeg',
    'assets/img/fondo_secureplay/Fondo-Pista.jpeg',
    'assets/img/proyecto_robos/robos5.png',
    'assets/img/fondo_secureplay/Fondo-Mapa2.jpeg',
    'assets/img/fondo_secureplay/Fondo-Pista2.jpeg'
];

// Precarga para evitar “flash”
const preloaded = fondos.map(src => {
    const img = new Image();
    img.src = src;
    return img;
});

let idx = 0;
bgA.style.backgroundImage = `url('${fondos[idx]}')`;
bgB.style.backgroundImage = `url('${fondos[(idx+1)%fondos.length]}')`;

let showingA = true;

setInterval(() => {
    idx = (idx + 1) % fondos.length;
    
    if (showingA) {
        // actualiza B al siguiente y hace fade-in B
        bgB.style.backgroundImage = `url('${fondos[idx]}')`;
        bgB.style.opacity = '1';
        bgA.style.opacity = '0';
    } else {
        // actualiza A al siguiente y hace fade-in A
        bgA.style.backgroundImage = `url('${fondos[idx]}')`;
        bgA.style.opacity = '1';
        bgB.style.opacity = '0';
    }
    showingA = !showingA;
}, 4000); // cambia cada 3.5s

const featuresSwiper = new Swiper('.features-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,
    grabCursor: true,
    pagination: {
        el: '.features-slider .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.features-slider .swiper-button-next',
        prevEl: '.features-slider .swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1100: {
            slidesPerView: 3,
        }
    }
});

const events = document.querySelectorAll('.sp-event');
const contents = document.querySelectorAll('.sp-content');
const fillLine = document.querySelector('.sp-fill-line');

events.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        
        events.forEach(e => e.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        contents[index].classList.add('active');
        
        const progress = (index / (events.length - 1)) * 100;
        fillLine.style.width = progress + '%';
    });
});

