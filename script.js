window.onload = function() {
    const menuToggle = document.getElementById('menu-toggle-btn');
    const mainNav = document.getElementById('main-nav');
    const livePlayer = document.getElementById('live-player');
    const channelsList = document.getElementById('channels-list');
    let activeChannelButton = null; // Variabilă pentru a urmări butonul activ

    // Numele de fișier al logo-ului (Asigurați-vă că fișierul amg-logo.jpg există)
    const PLACEHOLDER_LOGO = "amg-logo.jpg";
    
    // ATENȚIE: Adăugăm proprietatea 'url' cu link-uri de test.
    // Înlocuiți aceste URL-uri cu cele reale de la Cloudflare când le aveți!
    const tvChannels = [
        // Am adăugat URL-uri de test care vor afișa un ecran negru sau o eroare (până la înlocuirea lor cu link-uri reale)
        { name: "AMG LIVE", id: "amglive", image: PLACEHOLDER_LOGO, url: "https://simulare-cloudflare-amg.net/embed.html" },
        { name: "PRO TV", id: "protv", image: PLACEHOLDER_LOGO, url: "https://simulare-cloudflare-protv.net/embed.html" },
        { name: "SPORT 1", id: "sport1", image: PLACEHOLDER_LOGO, url: "https://simulare-cloudflare-sport1.net/embed.html" },
        { name: "ȘTIRI", id: "stiri", image: PLACEHOLDER_LOGO, url: "https://simulare-cloudflare-stiri.net/embed.html" },
        { name: "FILM", id: "film", image: PLACEHOLDER_LOGO, url: "https://simulare-cloudflare-film.net/embed.html" },
        { name: "Muzică", id: "muzica", image: PLACEHOLDER_LOGO, url: "https://simulare-cloudflare-muzica.net/embed.html" }
    ];

    // 1. Logica Meniului Hamburger (Mobil) - Nemodificată
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            menuToggle.innerHTML = mainNav.classList.contains('active') ? '&times;' : '&#9776;';
        });
    }

    // Funcția care încarcă canalul în player și marchează butonul activ
    function loadChannel(channelName, channelUrl, buttonElement) {
        
        // 1. Actualizează Playerul cu IFRAME (Elimină textul de simulare)
        livePlayer.innerHTML = `
            <div class="player-content-wrapper" style="width: 100%; height: 100%;">
                <iframe src="${channelUrl}" 
                        style="border:none; width:100%; height:100%;" 
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" 
                        allowfullscreen="true">
                </iframe>
                
                <div style="position: absolute; top: 10px; left: 10px; color: white; background: rgba(0,0,0,0.7); padding: 5px 10px; border-radius: 3px; font-size: 0.8em; z-index: 5;">
                    VIZIONARE: ${channelName.toUpperCase()}
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
            
            // Structura HTML pentru noul design de logo-uri
            button.innerHTML = `<img src="${channel.image}" alt="${channel.name} Logo"><span>${channel.name}</span>`;
            
            // Atribuie funcția la click (transmite numele, URL-ul și elementul buton)
            button.onclick = () => loadChannel(channel.name, channel.url, button);
            channelsList.appendChild(button);
        });
        
        // Încarcă canalul implicit la pornire și marchează primul buton
        const firstButton = channelsList.querySelector('.channel-button');
        if(firstButton) {
            // Asigură-te că transmiți URL-ul primului canal
            loadChannel(tvChannels[0].name, tvChannels[0].url, firstButton);
        }
    }
};
