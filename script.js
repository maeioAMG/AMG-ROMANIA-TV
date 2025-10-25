window.onload = function() {
    const menuToggle = document.getElementById('menu-toggle-btn');
    const mainNav = document.getElementById('main-nav');
    const livePlayer = document.getElementById('live-player');
    const channelsList = document.getElementById('channels-list');
    let activeChannelButton = null; // Variabilă pentru a urmări butonul activ

    // Numele de fișier al logo-ului (Asigurați-vă că fișierul amg-logo.jpg există)
    const PLACEHOLDER_LOGO = "amg-logo.jpg";
    
    const tvChannels = [
        { name: "AMG LIVE", id: "amglive", image: PLACEHOLDER_LOGO },
        { name: "PRO TV", id: "protv", image: PLACEHOLDER_LOGO },
        { name: "SPORT 1", id: "sport1", image: PLACEHOLDER_LOGO },
        { name: "ȘTIRI", id: "stiri", image: PLACEHOLDER_LOGO },
        { name: "FILM", id: "film", image: PLACEHOLDER_LOGO },
        { name: "Muzică", id: "muzica", image: PLACEHOLDER_LOGO }
    ];

    // 1. Logica Meniului Hamburger (Mobil) - Nemodificată
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            menuToggle.innerHTML = mainNav.classList.contains('active') ? '&times;' : '&#9776;';
        });
    }

    // Funcția care încarcă canalul în player și marchează butonul activ
    function loadChannel(channelName, buttonElement) {
        
        // 1. Actualizează Playerul
        livePlayer.innerHTML = `
            <div class="player-content-wrapper" style="width: 100%; height: 100%;">
                <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; background: linear-gradient(135deg, #111 0%, #303030 100%);">
                    <h3 style="color: #00c6ff; margin-bottom: 15px; font-size: 1.5em;">VIZIONARE: ${channelName.toUpperCase()}</h3>
                    <p style="color: #aaa;">[Spațiu pentru Playerul Cloudflare Real]</p>
                    <img src="${PLACEHOLDER_LOGO}" alt="Logo" style="height: 60px; opacity: 0.8; margin-top: 20px;">
                </div>
            </div>
        `;

        // 2. Marchează butonul nou ca fiind activ
        if (activeChannelButton) {
            activeChannelButton.classList.remove('active'); // Demarchează butonul vechi
        }
        if (buttonElement) {
            buttonElement.classList.add('active'); // Marchează butonul nou
            activeChannelButton = buttonElement;
        }
    }
    
    // 3. Logica Grila TV
    if (channelsList && livePlayer) {
        
        // Generarea butoanelor pentru canale
        channelsList.innerHTML = ''; 
        tvChannels.forEach(channel => {
            const button = document.createElement('button');
            button.className = 'channel-button';
            
            // MODIFICARE AICI: Structura HTML pentru noul design de logo-uri
            button.innerHTML = `<img src="${channel.image}" alt="${channel.name} Logo"><span>${channel.name}</span>`;
            
            // Atribuie funcția la click
            button.onclick = () => loadChannel(channel.name, button);
            channelsList.appendChild(button);
        });
        
        // Încarcă canalul implicit la pornire și marchează primul buton
        const firstButton = channelsList.querySelector('.channel-button');
        if(firstButton) {
            loadChannel(tvChannels[0].name, firstButton);
        }
    }
};
