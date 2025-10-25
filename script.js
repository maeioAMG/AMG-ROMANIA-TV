window.onload = function() {
    // 1. SELECTORII ESENȚIALI
    const livePlayer = document.getElementById('live-player');
    const canaleContainer = document.getElementById('canale-container');
    const filterContainer = document.getElementById('filter-container');
    let activeChannelButton = null; 
    let activeFilterButton = null; 

    // LISTA DE CANALE (ATENȚIE: Trebuie să înlocuiți 'LINK_STREAM_...' și 'URL_SIGLĂ' cu adrese reale)
    const tvChannels = [
        // EXEMPLU: Înlocuiți LINK_STREAM_DIGI24 cu un link de iframe real!
        { "nume": "Digi 24", "link": "https://LINK_STREAM_DIGI24", "sigla": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Digi24_logo_2022.svg", "categorie": "Știri" },
        { "nume": "Antena 1", "link": "https://LINK_STREAM_ANTENA1", "sigla": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Antena_1_logo_2022.svg", "categorie": "General" },
        { "nume": "PRO TV", "link": "https://LINK_STREAM_PROTV", "sigla": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Pro_TV_logo_2022.svg", "categorie": "General" },
        { "nume": "Kanal D", "link": "https://LINK_STREAM_KANALD", "sigla": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Kanal_D_Romania_logo_2022.svg", "categorie": "General" },
        { "nume": "Kanal D2", "link": "https://LINK_STREAM_KANALD2", "sigla": "https://URL_SIGLĂ_KANALD2", "categorie": "General" }, 
        { "nume": "TVR 1", "link": "https://LINK_STREAM_TVR1", "sigla": "https://upload.wikimedia.org/wikipedia/commons/3/3b/TVR_1_logo_2022.svg", "categorie": "Știri" },
        { "nume": "TVR 2", "link": "https://LINK_STREAM_TVR2", "sigla": "https://URL_SIGLĂ_TVR2", "categorie": "Cultură" }, 
        { "nume": "TVR Info", "link": "https://LINK_STREAM_TVRINFO", "sigla": "https://URL_SIGLĂ_TVRINFO", "categorie": "Știri" }, 
        { "nume": "TVR Moldova", "link": "https://LINK_STREAM_TVRMOLDOVA", "sigla": "https://URL_SIGLĂ_TVRMOLDOVA", "categorie": "Moldova" }, 
        { "nume": "Realitatea Plus", "link": "https://LINK_STREAM_REALITATEAPLUS", "sigla": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Realitatea_Plus_logo.svg", "categorie": "Știri" },
        { "nume": "Antena 3 CNN", "link": "https://LINK_STREAM_ANTENA3CNN", "sigla": "https://URL_SIGLĂ_ANTENA3CNN", "categorie": "Știri" },
        { "nume": "România TV", "link": "https://LINK_STREAM_ROMANIATV", "sigla": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Romania_TV_logo.svg", "categorie": "Știri" },
        { "nume": "B1 TV", "link": "https://LINK_STREAM_B1TV", "sigla": "https://upload.wikimedia.org/wikipedia/commons/4/4e/B1_TV_logo.svg", "categorie": "Știri" },
        { "nume": "Prima TV", "link": "https://LINK_STREAM_PRIMATV", "sigla": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Prima_TV_logo.svg", "categorie": "General" },
        { "nume": "Prima Comedy", "link": "https://LINK_STREAM_PRIMACOMEDY", "sigla": "https://URL_SIGLĂ_PRIMACOMEDY", "categorie": "Comedie" }, 
        { "nume": "Prima News", "link": "https://LINK_STREAM_PRIMANEWS", "sigla": "https://URL_SIGLĂ_PRIMANEWS", "categorie": "Știri" }, 
        { "nume": "Național TV", "link": "https://LINK_STREAM_NATIONALTV", "sigla": "https://upload.wikimedia.org/wikipedia/commons/2/2a/National_TV_logo.svg", "categorie": "General" },
        { "nume": "Național 24 Plus", "link": "https://LINK_STREAM_NATIONAL24PLUS", "sigla": "https://URL_SIGLĂ_NATIONAL24PLUS", "categorie": "General" }, 
        { "nume": "Digi Sport 1", "link": "https://LINK_STREAM_DIGISPORT1", "sigla": "https://URL_SIGLĂ_DIGISPORT1", "categorie": "Sport" }, 
        { "nume": "Digi Sport 2", "link": "https://LINK_STREAM_DIGISPORT2", "sigla": "https://URL_SIGLĂ_DIGISPORT2", "categorie": "Sport" }, 
        { "nume": "Digi Sport 3", "link": "https://LINK_STREAM_DIGISPORT3", "sigla": "https://URL_SIGLĂ_DIGISPORT3", "categorie": "Sport" }, 
        { "nume": "Digi Sport 4", "link": "https://LINK_STREAM_DIGISPORT4", "sigla": "https://URL_SIGLĂ_DIGISPORT4", "categorie": "Sport" }, 
        { "nume": "Eurosport 1", "link": "https://LINK_STREAM_EUROSPORT1", "sigla": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Eurosport_1_logo.svg", "categorie": "Sport" },
        { "nume": "Eurosport 2", "link": "https://LINK_STREAM_EUROSPORT2", "sigla": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Eurosport_1_logo.svg", "categorie": "Sport" },
        { "nume": "Film Now", "link": "https://LINK_STREAM_FILMNOW", "sigla": "https://URL_SIGLĂ_FILMNOW", "categorie": "Filme" }, 
        { "nume": "Cartoon Network", "link": "https://LINK_STREAM_CN", "sigla": "https://upload.wikimedia.org/wikipedia/commons/5/5f/Cartoon_Network_2010_logo.svg", "categorie": "Desene" },
        { "nume": "Disney Channel", "link": "https://LINK_STREAM_DISNEY", "sigla": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney_Channel_logo.svg", "categorie": "Desene" },
        { "nume": "Nickelodeon", "link": "https://LINK_STREAM_NICK", "sigla": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Nickelodeon_2023_logo.svg", "categorie": "Desene" },
        { "nume": "Minimax", "link": "https://LINK_STREAM_MINIMAX", "sigla": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Minimax_logo.svg", "categorie": "Desene" },
        { "nume": "Etno TV", "link": "https://LINK_STREAM_ETNO", "sigla": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Etno_TV_logo_2022.svg", "categorie": "Muzică" },
        { "nume": "Favorit TV", "link": "https://LINK_STREAM_FAVORIT", "sigla": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Favorit_TV_logo_2022.svg", "categorie": "Muzică" },
        { "nume": "Taraf TV", "link": "https://LINK_STREAM_TARAF", "sigla": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Taraf_TV_logo.svg", "categorie": "Muzică" },
        { "nume": "Trinitas TV", "link": "https://LINK_STREAM_TRINITAS", "sigla": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Trinitas_TV_logo.svg", "categorie": "Religie" } 
    ];

    
    // FUNCȚIA CARE ÎNCARCĂ CANALUL ÎN PLAYER (IFRAME REAL)
    function loadChannel(channelName, channelUrl, buttonElement) {
        
        if (livePlayer) {
            // Playerul real cu IFRAME
            livePlayer.innerHTML = `
                <iframe 
                    src="${channelUrl}" 
                    frameborder="0" 
                    allow="autoplay; fullscreen" 
                    allowfullscreen
                    title="${channelName}"
                    style="width: 100%; height: 100%; border-radius: 8px;">
                </iframe>
            `;
        }
        
        // Marchează butonul nou ca fiind activ 
        if (activeChannelButton) {
            activeChannelButton.classList.remove('active'); 
        }
        if (buttonElement) {
            buttonElement.classList.add('active'); 
            activeChannelButton = buttonElement;
        }
    }


    // 3. GENERAREA GRILEI DE CANALE
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
            
            // ATENȚIE: Siglele incorecte vor afișa o pictogramă lipsă
            button.innerHTML = `<img src="${channel.sigla}" alt="${channel.nume} Logo"><span>${channel.nume}</span>`;
            
            canaleContainer.appendChild(button);
        });
    }
    
    // 4. LOGICA DE FILTRARE
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
        
        // Activează primul canal din lista NOUĂ, vizual ȘI în player
        const firstChannelInNewList = canaleContainer.querySelector('.canal');
        if (firstChannelInNewList) {
             firstChannelInNewList.click(); 
        } else {
             livePlayer.innerHTML = `<p style="text-align: center; padding: 50px; color: #fff;">Nu există canale în această categorie.</p>`;
        }
    }

    // 5. GENERAREA BUTOANELOR DE FILTRARE
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
    }


    // 6. PORNIREA APLICAȚIEI:
    generateFilterButtons(); 

    // Inițializează butoanele de filtrare (setând "Toate" ca activ)
    const initialFilterButton = filterContainer.querySelector('.filter-btn');
    if (initialFilterButton) {
        initialFilterButton.classList.add('active');
        activeFilterButton = initialFilterButton;
    }

    // Afișează toate canalele
    displayChannels(tvChannels);

    // Activează primul canal (Digi 24) vizual și în Player
    if (tvChannels.length > 0) {
        const initialChannelButton = canaleContainer.querySelector('.canal');
        if (initialChannelButton) {
            initialChannelButton.click(); 
        }
    }
};
