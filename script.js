document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle-btn');
    const mainNav = document.getElementById('main-nav');
    const livePlayer = document.getElementById('live-player');

    // 1. Logica Meniului Hamburger
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }

    // 2. Simularea integrării Cloudflare Stream (De Înlocuit)
    // ATENȚIE: Aici va veni codul real de integrare Cloudflare Stream Player.
    // Deocamdată, afișăm un mesaj de simulare.
    if (livePlayer) {
        livePlayer.innerHTML = `
            <div style="padding: 20px; text-align: center;">
                <p style="color: var(--color-secondary);">Integrare Player Video Securizat</p>
                <p>Codul real Cloudflare Stream Player va fi plasat aici, după configurarea CDN-ului.</p>
            </div>
        `;
    }

    // 3. Logica Butoanelor CTA
    const ctaButtons = document.querySelectorAll('.cta-button, .main-cta, .secondary-cta');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // e.preventDefault();
            // Aici se va adăuga logica de redirecționare către pagina de Abonament
            console.log('Redirecționare către pagina de abonament...');
            // window.location.href = '/abonamente.html'; // EXEMPLU
        });
    });
});
