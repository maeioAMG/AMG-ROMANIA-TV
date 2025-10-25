window.onload = function() {
    // 1. SELECTORII ESENȚIALI
    const livePlayer = document.getElementById('live-player');
    const canaleContainer = document.getElementById('canale-container');
    let activeChannelButton = null; // Urmărește butonul activ

    // LISTA COMPLETĂ ȘI ACTUALIZATĂ A CANALELOR
    const tvChannels = [
        { "nume": "Digi 24", "link": "https://www.digi24.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Digi24_logo_2022.svg", "categorie": "Știri" },
        { "nume": "Antena 1", "link": "https://www.antena1.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Antena_1_logo_2022.svg", "categorie": "General" },
        { "nume": "PRO TV", "link": "https://www.protv.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Pro_TV_logo_2022.svg", "categorie": "General" },
        { "nume": "Kanal D", "link": "https://kanald.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Kanal_D_Romania_logo_2022.svg", "categorie": "General" },
        { "nume": "Kanal D2", "link": "https://kanald2.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Kanal_D_Romania_logo_2022.svg", "categorie": "General" },
        { "nume": "TVR 1", "link": "https://www.tvr.ro/live.html", "sigla": "https://upload.wikimedia.org/wikipedia/commons/3/3b/TVR_1_logo_2022.svg", "categorie": "Știri" },
        { "nume": "TVR 2", "link": "https://www.tvr.ro/live.html", "sigla": "https://upload.wikimedia.org/wikipedia/commons/3/3b/TVR_1_logo_2022.svg", "categorie": "Cultură" },
        { "nume": "TVR Info", "link": "https://www.tvr.ro/live.html", "sigla": "https://upload.wikimedia.org/wikipedia/commons/3/3b/TVR_1_logo_2022.svg", "categorie": "Știri" },
        { "nume": "TVR Moldova", "link": "https://www.tvrmoldova.md/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/3/3b/TVR_1_logo_2022.svg", "categorie": "Moldova" },
        { "nume": "Realitatea Plus", "link": "https://www.realitatea.net/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Realitatea_Plus_logo.svg", "categorie": "Știri" },
        { "nume": "Antena 3 CNN", "link": "https://www.antena3.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Antena_1_logo_2022.svg", "categorie": "Știri" },
        { "nume": "România TV", "link": "https://www.romaniatv.net/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Romania_TV_logo.svg", "categorie": "Știri" },
        { "nume": "B1 TV", "link": "https://www.b1tv.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/4/4e/B1_TV_logo.svg", "categorie": "Știri" },
        { "nume": "Prima TV", "link": "https://www.primatv.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Prima_TV_logo.svg", "categorie": "General" },
        { "nume": "Prima Comedy", "link": "https://www.primatv.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Prima_TV_logo.svg", "categorie": "Comedie" },
        { "nume": "Prima News", "link": "https://www.primatv.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Prima_TV_logo.svg", "categorie": "Știri" },
        { "nume": "Național TV", "link": "https://www.nationaltv.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/2/2a/National_TV_logo.svg", "categorie": "General" },
        { "nume": "Național 24 Plus", "link": "https://www.national24plus.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/2/2a/National_TV_logo.svg", "categorie": "General" },
        { "nume": "Digi Sport 1", "link": "https://www.digisport.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Digi24_logo_2022.svg", "categorie": "Sport" },
        { "nume": "Digi Sport 2", "link": "https://www.digisport.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Digi24_logo_2022.svg", "categorie": "Sport" },
        { "nume": "Digi Sport 3", "link": "https://www.digisport.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Digi24_logo_2022.svg", "categorie": "Sport" },
        { "nume": "Digi Sport 4", "link": "https://www.digisport.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Digi24_logo_2022.svg", "categorie": "Sport" },
        { "nume": "Eurosport 1", "link": "https://www.eurosport.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Eurosport_1_logo.svg", "categorie": "Sport" },
        { "nume": "Eurosport 2", "link": "https://www.eurosport.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Eurosport_1_logo.svg", "categorie": "Sport" },
        { "nume": "Film Now", "link": "https://www.filmnow.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Pro_TV_logo_2022.svg", "categorie": "Filme" },
        { "nume": "Cartoon Network", "link": "https://www.cartoonnetwork.ro", "sigla": "https://upload.wikimedia.org/wikipedia/commons/5/5f/Cartoon_Network_2010_logo.svg", "categorie": "Desene" },
        { "nume": "Disney Channel", "link": "https://www.disneychannel.disney.ro", "sigla": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney_Channel_logo.svg", "categorie": "Desene" },
        { "nume": "Nickelodeon", "link": "https://www.nickelodeon.ro", "sigla": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Nickelodeon_2023_logo.svg", "categorie": "Desene" },
        { "nume": "Minimax", "link": "https://www.minimax.ro", "sigla": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Minimax_logo.svg", "categorie": "Desene" },
        { "nume": "Etno TV", "link": "https://www.etnotv.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Etno_TV_logo_2022.svg", "categorie": "Muzică" },
        { "nume": "Favorit TV", "link": "https://www.favorittv.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Favorit_TV_logo_2022.svg", "categorie": "Muzică" },
        { "nume": "Taraf TV", "link": "https://www.taraftv.ro/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Taraf_TV_logo.svg", "categorie": "Muzică" },
        { "nume": "Trinitas TV", "link": "https://www.trinitas.tv/live", "sigla": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Trinitas_TV_logo.svg", "categorie": "Religie" } 
    ];

    
    // 2. FUNCȚIA CARE ÎNCARCĂ CANALUL ÎN PLAYER (IFRAME)
    function loadChannel(channelName, channelUrl, buttonElement) {
        
        // 2.1. Actualizează Playerul cu IFRAME
        if (livePlayer) {
            livePlayer.innerHTML = `
                <div class="player-content-wrapper" style="width: 100%; height: 100%;">
                    <iframe id="stream-iframe" src="${channelUrl}" 
                            style="border:none; width:100%; height:100%;" 
                            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" 
                            allowfullscreen="true">
                    </iframe>
                    
                    <div style="position: absolute; top: 10px; left: 10px; color: white; background: rgba(0,0,0,0.7); padding: 5px 10px; border-radius: 3px; font-size: 0.8em; z-index: 5;">
                        VIZIONARE: ${channelName.toUpperCase()}
                    </div>
                </div>
            `;
        }
        

        // 2.2. Marchează butonul nou ca fiind activ (adăugăm clasa CSS 'active' în style.css)
        if (activeChannelButton) {
            activeChannelButton.classList.remove('active'); // Demarchează butonul vechi
        }
        if (buttonElement) {
            buttonElement.classList.add('active'); // Marchează butonul nou
            activeChannelButton = buttonElement;
        }
    }


    // 3. GENERAREA GRILEI DE CANALE
    function displayChannels(channels) {
        if (!canaleContainer) return;

        canaleContainer.innerHTML = '';
        
        channels.forEach(channel => {
            const button = document.createElement('button'); // Modificat din 'a' în 'button'
            button.className = 'canal'; // Folosim clasa CSS '.canal'
            
            // Atribuim funcția la click pentru a încărca stream-ul în Player
            button.onclick = (e) => {
                e.preventDefault(); // Oprește orice comportament implicit
                loadChannel(channel.nume, channel.link, button);
            };
            
            // Structura HTML pentru noul design
            button.innerHTML = `<img src="${channel.sigla}" alt="${channel.nume} Logo"><span>${channel.nume}</span>`;
            
            canaleContainer.appendChild(button);
        });

        // 4. ÎNCARCĂ CANALUL IMPLICIT LA PORNIRE
        const firstButton = canaleContainer.querySelector('.canal');
        if(firstButton && tvChannels.length > 0) {
            // Încărcăm primul canal (Digi 24)
            loadChannel(tvChannels[0].nume, tvChannels[0].link, firstButton);
        }
    }


    // Pornirea aplicației: Afișează toate canalele și încarcă primul canal
    displayChannels(tvChannels);
};
