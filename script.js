window.onload = function() {
    const menuToggle = document.getElementById('menu-toggle-btn');
    const mainNav = document.getElementById('main-nav');
    const livePlayer = document.getElementById('live-player');
    const channelsList = document.getElementById('channels-list');
    let activeChannelButton = null; // Variabilă pentru a urmări butonul activ

    // NOTĂ: Am eliminat PLACEHOLDER_LOGO deoarece folosim acum sigle reale din URL-uri.
    
    // LISTA ACTUALIZATĂ A CANALELOR CU DATE REALE
    const tvChannels = [
        // ATENȚIE: Aceste 'link'-uri vor funcționa doar dacă sursa permite încorporarea (iframe).
        // Majoritatea site-urilor TV blochează acest lucru din motive de securitate/drepturi.
        { "nume": "Digi 24", "link": "https://www.digi24.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Digi24_logo_2022.svg", "categorie": "Știri" },
        { "nume": "Antena 1", "link": "https://www.antena1.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Antena_1_logo_2022.svg", "categorie": "General" },
        { "nume": "PRO TV", "link": "https://www.protv.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Pro_TV_logo_2022.svg", "categorie": "General" },
        { "nume": "Kanal D", "link": "https://kanald.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Kanal_D_Romania_logo_2022.svg", "categorie": "General" },
        { "nume": "TVR 1", "link": "https://www.tvr.ro/live.html", "sigla": "https://upload.wikimedia.org/wikipedia/commons/3/3b/TVR_1_logo_2022.svg", "categorie": "Știri" },
        { "nume": "TVR 2", "link": "https://www.tvr.ro/live.html", "sigla": "https://upload.wikimedia.org/wikipedia/commons/3/3b/TVR_1_logo_2022.svg", "categorie": "Cultură" },
        { "nume": "Etno TV", "link": "https://www.etnotv.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Etno_TV_logo_2022.svg", "categorie": "Muzică" },
        { "nume": "Favorit TV", "link": "https://www.favorittv.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Favorit_TV_logo_2022.svg", "categorie": "Muzică" },
        { "nume": "Trinitas TV", "link": "https://www.trinitas.tv/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Trinitas_TV_logo.svg", "categorie": "Religie" },
        { "nume": "Realitatea Plus", "link": "https://www.realitatea.net/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Realitatea_Plus_logo.svg", "categorie": "Știri" },
        { "nume": "Național TV", "link": "https://www.nationaltv.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/2/2a/National_TV_logo.svg", "categorie": "General" },
        { "nume": "Național 24 Plus", "link": "https://www.national24plus.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/2/2a/National_TV_logo.svg", "categorie": "General" },
        { "nume": "B1 TV", "link": "https://www.b1tv.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/4/4e/B1_TV_logo.svg", "categorie": "Știri" },
        { "nume": "România TV", "link": "https://www.romaniatv.net/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Romania_TV_logo.svg", "categorie": "Știri" },
        { "nume": "Prima TV", "link": "https://www.primatv.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Prima_TV_logo.svg", "categorie": "General" },
        { "nume": "Agro TV", "link": "https://www.agrotv.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Agro_TV_logo.svg", "categorie": "Agricultură" },
        { "nume": "Music Channel", "link": "https://www.musicchannel.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Music_Channel_logo.svg", "categorie": "Muzică" },
        { "nume": "Atomic TV", "link": "https://www.atomictv.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Atomic_TV_logo.svg", "categorie": "Muzică" },
        { "nume": "Taraf TV", "link": "https://www.taraftv.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Taraf_TV_logo.svg", "categorie": "Muzică" },
        { "nume": "TVR Moldova", "link": "https://www.tvrmoldova.md/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/3/3b/TVR_1_logo_2022.svg", "categorie": "Moldova" }
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
        
        // 1. Actualizează Playerul cu IFRAME
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
            
            // MODIFICARE: Folosim channel.sigla și channel.nume
            button.innerHTML = `<img src="${channel.sigla}" alt="${channel.nume} Logo"><span>${channel.nume}</span>`;
            
            // MODIFICARE: Atribuie funcția la click (folosim channel.nume și channel.link)
            button.onclick = () => loadChannel(channel.nume, channel.link, button);
            channelsList.appendChild(button);
        });
        
        // Încarcă canalul implicit la pornire și marchează primul buton
        const firstButton = channelsList.querySelector('.channel-button');
        if(firstButton) {
            // MODIFICARE: Transmite numele și link-ul primului canal
            loadChannel(tvChannels[0].nume, tvChannels[0].link, firstButton);
        }
    }
};
