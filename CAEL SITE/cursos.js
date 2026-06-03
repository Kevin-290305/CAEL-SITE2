// =============================================
// ANIVERSARIANTES DO MÊS — Carrossel automático
// =============================================
// 👉 Para adicionar/editar aniversariantes, basta editar o array abaixo.
//    photo: pode ser URL de foto (ex: 'https://...jpg') ou null (mostra iniciais).
//    name: nome completo
//    date: data (ex: "15 de Maio")
//    role: papel/turma (opcional - ex: "Aluna - Teatro Adulto")
const aniversariantes = [
    { photo: null, name: 'Marina Silva',    date: '03 de Maio', role: 'Aluna - Teatro Musical' },
    { photo: null, name: 'João Pedro Costa', date: '08 de Maio', role: 'Aluno - TV e Cinema' },
    { photo: null, name: 'Ana Beatriz',     date: '12 de Maio', role: 'Aluna - Circo Aéreo' },
    { photo: null, name: 'Lucas Mendes',    date: '17 de Maio', role: 'Aluno - Dublagem' },
    { photo: null, name: 'Sofia Almeida',   date: '22 de Maio', role: 'Aluna - Teatro Infantil' },
    { photo: null, name: 'Rafael Oliveira', date: '28 de Maio', role: 'Aluno - Dança' },
];

const slidesEl = document.getElementById('bday-slides');
const dotsEl = document.getElementById('bday-dots');
let currentBday = 0;
let bdayTimer = null;

function getInitials(name) {
    return name.split(' ').filter(Boolean).slice(0, 2).map(s => s[0].toUpperCase()).join('');
}

function renderBdays() {
    slidesEl.innerHTML = aniversariantes.map((p, i) => `
        <div class="bday-slide ${i === 0 ? 'active' : ''}" data-index="${i}">
            <div class="bday-photo-wrap">
                ${p.photo
                    ? `<img class="bday-photo" src="${p.photo}" alt="${p.name}">`
                    : `<div class="bday-photo-placeholder">${getInitials(p.name)}</div>`}
                <div class="bday-cake"><i class="fas fa-cake-candles"></i></div>
            </div>
            <h3 class="bday-name">${p.name}</h3>
            <span class="bday-date"><i class="fas fa-calendar-day"></i> ${p.date}</span>
            ${p.role ? `<span class="bday-role">${p.role}</span>` : ''}
        </div>
    `).join('');

    dotsEl.innerHTML = aniversariantes.map((_, i) =>
        `<button class="bday-dot ${i === 0 ? 'active' : ''}" data-index="${i}" data-testid="bday-dot-${i}" aria-label="Ir para slide ${i + 1}"></button>`
    ).join('');

    dotsEl.querySelectorAll('.bday-dot').forEach(dot => {
        dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.index)));
    });
}

function goToSlide(index) {
    const slides = slidesEl.querySelectorAll('.bday-slide');
    const dots = dotsEl.querySelectorAll('.bday-dot');
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentBday = (index + slides.length) % slides.length;
    slides[currentBday].classList.add('active');
    dots[currentBday].classList.add('active');
    restartBdayTimer();
}

function nextBday() { goToSlide(currentBday + 1); }
function prevBday() { goToSlide(currentBday - 1); }

function startBdayTimer() {
    bdayTimer = setInterval(() => {
        const slides = slidesEl.querySelectorAll('.bday-slide');
        const dots = dotsEl.querySelectorAll('.bday-dot');
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        currentBday = (currentBday + 1) % slides.length;
        slides[currentBday].classList.add('active');
        dots[currentBday].classList.add('active');
    }, 3500);
}

function restartBdayTimer() {
    clearInterval(bdayTimer);
    startBdayTimer();
}

if (slidesEl && aniversariantes.length > 0) {
    renderBdays();
    startBdayTimer();
    document.querySelector('.bday-next')?.addEventListener('click', nextBday);
    document.querySelector('.bday-prev')?.addEventListener('click', prevBday);

    // Pausa quando hover
    const carousel = document.querySelector('.birthday-carousel');
    carousel?.addEventListener('mouseenter', () => clearInterval(bdayTimer));
    carousel?.addEventListener('mouseleave', startBdayTimer);
}

// =============================================
// Cursos CAEL - Formulário de contato (envio simulado com mensagem de agradecimento)
const form = document.getElementById('contact-form');
const thanks = document.getElementById('thanks-message');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Validação simples: campos obrigatórios
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        // Coletar dados (para log/debug; em produção, enviar ao backend)
        const data = Object.fromEntries(new FormData(form).entries());
        console.log('CAEL - Inscrição recebida:', data);

        form.style.display = 'none';
        thanks.hidden = false;
        thanks.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

// Scroll suave para os links do menu hero
document.querySelectorAll('.hero-nav a, .footer-links a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

console.log('Cursos CAEL page loaded.');
