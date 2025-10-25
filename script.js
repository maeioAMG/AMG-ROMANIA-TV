window.onload = function() {
    // 1. SELECTORII ESENȚIALI
    const livePlayer = document.getElementById('live-player');
    const canaleContainer = document.getElementById('canale-container');
    const filterContainer = document.getElementById('filter-container');
    let activeChannelButton = null; 
    let activeFilterButton = null; 

    // LISTA COMPLETĂ ȘI ACTUALIZATĂ A CANALELOR (Lăsată neschimbată)
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

    
    // FUNCȚIA CARE ÎNCARCĂ CANALUL ÎN PLAYER (DEVINE PLACEHOLDER)
    function loadChannel(channelName, channelUrl, buttonElement) {
        
        if (livePlayer) {
            // Playerul este înlocuit cu un mesaj static, arătând că a fost selectat canalul
            livePlayer.innerHTML = `
                <div class="player-content-wrapper" style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #000; color: #f0c040; text-align: center;">
                    <h2 style="margin-bottom: 15px;">VIZIONARE: ${channelName.toUpperCase()}</h2>
                    <p style="font-size: 1.1em; color: #ccc;">
                        Link-ul direct de streaming (iframe) pentru acest canal nu este disponibil public.
                    </p>
                    <p style="font-size: 0.9em; color: #777; margin-top: 10px;">
                        Trebuie să înlocuiți URL-ul <strong>"${channelUrl}"</strong> cu un link de stream real.
                    </p>
                </div>
            `;
        }
        

        // Marchează butonul nou ca fiind activ (adăugăm clasa CSS 'active')
        if (activeChannelButton) {
            activeChannelButton.classList.remove('active'); 
        }
        if (buttonElement) {
            buttonElement.classList.add('active'); 
            activeChannelButton = buttonElement;
        }
    }


    // 3. GENERAREA GRILEI DE CANALE (Neschimbată)
    function displayChannels(channels) {
        if (!canaleContainer) return;

        canaleContainer.innerHTML = ''; 
        
        channels.forEach(channel => {
            const button = document.createElement('button'); 
            button.className = 'canal'; 
            
            button.onclick = (e) => {
                e.preventDefault(); 
                loadChannel(channel.nume, channel.link, button);
            };
            
            button.innerHTML = `<img src="${channel.sigla}" alt="${channel.nume} Logo"><span>${channel.nume}</span>`;
            
            canaleContainer.appendChild(button);
        });
        
        // Asigură că primul canal din lista filtrată/completă este activat vizual
        const firstChannelButton = canaleContainer.querySelector('.canal');
        if (firstChannelButton) {
            if (activeChannelButton) {
                activeChannelButton.classList.remove('active');
            }
            firstChannelButton.classList.add('active');
            activeChannelButton = firstChannelButton;
        }
    }
    
    // 4. LOGICA DE FILTRARE (Păstrată și funcțională)
    function filterChannels(category, buttonElement) {
        let filteredChannels = [];
        
        if (category === 'Toate') {
            filteredChannels = tvChannels;
        } else {
            filteredChannels = tvChannels.filter(channel => channel.categorie === category);
        }
        
        // Marchează butonul de filtrare activ
        if (activeFilterButton) {
            activeFilterButton.classList.remove('active');
        }
        if (buttonElement) {
            buttonElement.classList.add('active');
            activeFilterButton = buttonElement;
        }
        
        displayChannels(filteredChannels);
    }

    // 5. GENERAREA BUTOANELOR DE FILTRARE (Păstrată și funcțională)
    function generateFilterButtons() {
        if (!filterContainer) return;
        
        const categories = ['Toate', ...new Set(tvChannels.map(channel => channel.categorie))];
        
        categories.forEach(category => {
            const button = document.createElement('button');
            button.className = 'filter-btn';
            button.textContent = category;
            
            button.onclick = () => {
                filterChannels(category, button);
            };
            
            filterContainer.appendChild(button);
        });

        const initialFilterButton = filterContainer.querySelector('.filter-btn');
        if (initialFilterButton) {
            initialFilterButton.classList.add('active');
            activeFilterButton = initialFilterButton;
        }
    }


    // 6. PORNIREA APLICAȚIEI:
    generateFilterButtons(); 
    displayChannels(tvChannels);

    // Încarcă canalul implicit (Digi 24) cu mesajul de placeholder
    if (tvChannels.length > 0) {
        const initialButton = canaleContainer.querySelector('.canal');
        loadChannel(tvChannels[0].nume, tvChannels[0].link, initialButton);
    }
};
