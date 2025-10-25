document.addEventListener('DOMContentLoaded', function() {
    // Selectarea elementelor prin ID (pentru unicitate) și Class (pentru grupuri)
    const menuToggle = document.getElementById('menu-toggle-btn');
    const mainNav = document.getElementById('main-nav');
    const ctaButtons = document.querySelectorAll('.cta-button, .main-cta, .secondary-cta');

    // ===================================
    // 1. Logica Meniului Hamburger (Mobil)
    // ===================================
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            // Adaugă/Elimină clasa 'active' pentru a afișa/ascunde meniul mobil (vezi mobile.css)
            mainNav.classList.toggle('active');
            
            // Opțional: Schimbă iconița din Hamburger în X
            menuToggle.innerHTML = mainNav.classList.contains('active') ? '&times;' : '&#9776;';
            
            console.log('Meniul mobil a fost comutat.');
        });
    }

    // ===================================
    // 2. Logica Butoanelor CTA (Abonare)
    // ===================================
    if (ctaButtons.length > 0) {
        ctaButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Previne comportamentul implicit (ex: trimiterea unui formular, dacă butonul e într-un <form>)
                e.preventDefault(); 
                
                // --- ACȚIUNE REALĂ AICI ---
                // Redirecționare către pagina de Abonament (de exemplu: abonamente.html)
                // Înlocuiți linia de mai jos cu calea corectă către pagina de abonament:
                // window.location.href = '/abonamente.html'; 
                
                // Mesaj de test (poate fi văzut în consola browser-ului)
                console.log(`Butonul '${button.textContent}' a fost apăsat. Redirecționare spre plată.`);
                
            });
        });
    }

    // ===================================
    // 3. Simularea Playerului Cloudflare
    // ===================================
    // Această secțiune este un placeholder. Codul real va fi mai complex.
    const livePlayer = document.getElementById('live-player');
    if (livePlayer) {
        // În loc de simulare, aici ar trebui să inițializați playerul Cloudflare Stream
        // Exemplu (de înlocuit cu codul dvs. real):
        // const streamUrl = 'https://customer-ID.cloudflarest.../manifest.m3u8';
        // player.src = streamUrl; 
    }
});
