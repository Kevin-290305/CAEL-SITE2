// =============================================
// Flip Cards — comportamento adaptativo
// Desktop (com mouse): vira ao passar o mouse (hover)
// Mobile / Touch: vira ao tocar/clicar (toggle)
// =============================================
const flipCards = document.querySelectorAll('.flip-card');

// Detecta se o dispositivo é touch (sem hover real)
const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;

flipCards.forEach(card => {
    if (!isTouchDevice) {
        // Desktop — hover
        card.addEventListener('mouseenter', () => card.classList.add('flipped'));
        card.addEventListener('mouseleave', () => card.classList.remove('flipped'));
    }

    // Click/tap — funciona em todos os dispositivos
    card.addEventListener('click', (e) => {
        // Se clicou no botão CTA, deixa o link navegar normalmente
        if (e.target.closest('.cta-button')) {
            return;
        }
        // Vira/desvira o card
        card.classList.toggle('flipped');
    });
});

// Fechar outros cards quando um é virado no mobile (deixa só 1 virado por vez)
if (isTouchDevice) {
    flipCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.cta-button')) return;
            flipCards.forEach(c => {
                if (c !== card) c.classList.remove('flipped');
            });
        });
    });

    // Fecha o card ao clicar fora dele
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.flip-card')) {
            flipCards.forEach(c => c.classList.remove('flipped'));
        }
    });
}

console.log('CAEL Website carregado. Touch device:', isTouchDevice, '| Cards:', flipCards.length);
