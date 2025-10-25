window.onload = function() {
    const menuToggle = document.getElementById('menu-toggle-btn');
    const mainNav = document.getElementById('main-nav');
    const livePlayer = document.getElementById('live-player');
    const ctaButtons = document.querySelectorAll('button.cta-button, button.main-cta, button.secondary-cta');
    const channelsList = document.getElementById('channels-list');

    // Date simulate pentru Grila TV 
    const tvChannels = [
        { name: "AMG LIVE", id: "amglive", category: "General", image: "AMG%20TV%20ROMANIA%20TV.jpg" },
        { name: "PRO TV (Demo)", id: "protv", category: "Divertisment", image: "AMG%20TV%20ROMANIA%20TV.jpg" },
        { name: "SPORT 1 (Demo)", id: "sport1", category: "Sport", image: "AMG%20TV%20ROMANIA%20TV.jpg" },
        { name: "ȘTIRI (Demo)", id: "stiri", category: "Știri", image: "AMG%20TV%20ROMANIA%20TV.jpg" }
    ];

    // 1. Logica Meniului Hamburger (Mobil) - Nemodificată
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            menuToggle.innerHTML = mainNav.classList.contains('active') ? '&times;' : '&#9776;';
        });
    }

    // 2. Logica Butoanelor CTA (Abonare din Header/Pachete) - Nemodificată
    if (ctaButtons.length > 0) {
        ctaButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault(); 
                
                let pachet = 'premium'; 
                if (button.closest('.package-card.standard') || button.textContent.trim() === 'ALEGE') {
                    pachet = 'standard'; 
                }
                
                window.location.href = `abonamente.html?pachet=${pachet}`; 
            });
        });
    }

    // 3. Logica Grila TV și Player (Demo)
    if (channelsList && livePlayer) {
        
        function loadChannel(channelName, channelId) {
            
            // 1. Inserăm structura HTML a playerului (Simulare + Overlay)
            livePlayer.innerHTML = `
                <div class="player-content-wrapper">
                    <div class="video-stream-area">
                        <div class="demo-display">
                            <h3>VIZIONARE GRATUITĂ: ${channelName.toUpperCase()}</h3>
                            <p>Simulare de Redare Video Securizată</p>
                            <div class="simulated-motion"></div> 
                        </div>
                    </div>
                    
                    <div class="trial-overlay">
                        <p>Vizionează 5 minute gratuit (Trial). Calitatea poate fi limitată.</p>
                        <button class="main-cta trial-cta">DEBLOCARE COMPLETĂ (ABONARE)</button>
                    </div>
                </div>
            `;
            
            // 2. ATENȚIE: Re-atașăm listener-ul la noul buton creat, imediat după ce a fost inserat în DOM
            const trialCtaButton = document.querySelector('.trial-cta');
            if (trialCtaButton) {
                 trialCtaButton.addEventListener('click', function(e) {
                     e.preventDefault(); 
                     // Acest buton trimite întotdeauna la pachetul premium ca stimulent
                     window.location.href = `abonamente.html?pachet=premium`; 
                 });
            }
        }
        
        // Generarea butoanelor pentru canale
        channelsList.innerHTML = ''; 
        tvChannels.forEach(channel => {
            const button = document.createElement('button');
            button.className = 'channel-button';
            button.innerHTML = `<img src="${channel.image}" alt="${channel.name} Logo" style="height: 30px; margin-right: 10px;">${channel.name}`;
            button.onclick = () => loadChannel(channel.name, channel.id);
            channelsList.appendChild(button);
        });
        
        // Încarcă canalul implicit la pornire
        loadChannel(tvChannels[0].name, tvChannels[0].id);
    }
};
