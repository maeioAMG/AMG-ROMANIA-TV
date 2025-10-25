window.onload = function() {
    // 1. SELECTORII ESENȚIALI
    const livePlayer = document.getElementById('live-player');
    const canaleContainer = document.getElementById('canale-container');
    const filterContainer = document.getElementById('filter-container');
    const searchInput = document.getElementById('search-input'); // NOU: Selector Căutare

    let activeChannelButton = null; 
    let activeFilterButton = null; 

    // LISTA DE CANALE CU SIGLELE CORECTATE - ATENȚIE: LINKURILE DE STREAM RĂMÂN PLACEHOLDER
    const tvChannels = [
        { "nume": "Digi 24", "link": "https://LINK_STREAM_DIGI24", "sigla": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Digi24_logo_2022.svg", "categorie": "Știri" },
        { "nume": "Antena 1", "link": "https://LINK_STREAM_ANTENA1", "sigla": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Antena_1_logo_2022.svg", "categorie": "General" },
        { "nume": "PRO TV", "link": "https://LINK_STREAM_PROTV", "sigla": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Pro_TV_logo_2022.svg", "categorie": "General" },
        { "nume": "Kanal D", "link": "https://LINK_STREAM_KANALD", "sigla": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Kanal_D_Romania_logo_2022.svg", "categorie": "General" },
        { "nume": "Kanal D2", "link": "https://LINK_STREAM_KANALD2", "sigla": "https://upload.wikimedia.org/wikipedia/commons/3/31/Kanal_D2_logo_2023.svg", "categorie": "General" }, 
        { "nume": "TVR 1", "link": "https://LINK_STREAM_TVR1", "sigla": "https://upload.wikimedia.org/wikipedia/commons/3/3b/TVR_1_logo_2022.svg", "categorie": "Știri" },
        { "nume": "TVR 2", "link": "https://LINK_STREAM_TVR2", "sigla": "https://upload.wikimedia.org/wikipedia/commons/5/5a/TVR_2_logo_2022.svg", "categorie": "Cultură" }, 
        { "nume": "TVR Info", "link": "https://LINK_STREAM_TVRINFO", "sigla": "https://upload.wikimedia.org/wikipedia/commons/5/50/TVR_Info_logo.svg", "categorie": "Știri" }, 
        { "nume": "TVR Moldova", "link": "https://LINK_STREAM_TVRMOLDOVA", "sigla": "https://upload.wikimedia.org/wikipedia/commons/f/fb/TVR_Moldova_logo_2023.svg", "categorie": "Moldova" }, 
        { "nume": "Realitatea Plus", "link": "https://LINK_STREAM_REALITATEAPLUS", "sigla": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Realitatea_Plus_logo.svg", "categorie": "Știri" },
        { "nume": "Antena 3 CNN", "link": "https://LINK_STREAM_ANTENA3CNN", "sigla": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Antena_3_CNN_logo_2022.svg", "categorie": "Știri" }, 
        { "nume": "România TV", "link": "https://LINK_STREAM_ROMANIATV", "sigla": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Romania_TV_logo.svg", "categorie": "Știri" },
        { "nume": "B1 TV", "link": "https://LINK_STREAM_B1TV", "sigla": "https://upload.wikimedia.org/wikipedia/commons/4/4e/B1_TV_logo.svg", "categorie": "Știri" },
        { "nume": "Prima TV", "link": "https://LINK_STREAM_PRIMATV", "sigla": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Prima_TV_logo.svg", "categorie": "General" },
        { "nume": "Prima Comedy", "link": "https://LINK_STREAM_PRIMACOMEDY", "sigla": "https://upload.wikimedia.org/wikipedia/commons/e/ea/Prima_Comedy_logo.svg", "categorie": "Comedie" }, 
        { "nume": "Prima News", "link": "https://LINK_STREAM_PRIMANEWS", "sigla": "https://upload.wikimedia.org/wikipedia/commons/0/03/Prima_News_logo_2022.svg", "categorie": "Știri" }, 
        { "nume": "Național TV", "link": "https://LINK_STREAM_NATIONALTV", "sigla": "https://upload.wikimedia.org/wikipedia/commons/2/2a/National_TV_logo.svg", "categorie": "General" },
        { "nume": "Național 24 Plus", "link": "https://LINK_STREAM_NATIONAL24PLUS", "sigla": "https://upload.wikimedia.org/wikipedia/commons/9/98/Na%C8%9Bional_24_Plus_logo.svg", "categorie": "General" }, 
        { "nume": "Digi Sport 1", "link": "https://LINK_STREAM_DIGISPORT1", "sigla": "https://upload.wikimedia.org/wikipedia/commons/9/91/Digi_Sport_logo_2019.svg", "categorie": "Sport" }, 
        { "nume": "Digi Sport 2", "link": "https://LINK_STREAM_DIGISPORT2", "sigla": "https://upload.wikimedia.org/wikipedia/commons/9/91/Digi_Sport_logo_2019.svg", "categorie": "Sport" }, 
        { "nume": "Digi Sport 3", "link": "https://LINK_STREAM_DIGISPORT3", "sigla": "https://upload.wikimedia.org/wikipedia/commons/9/91/Digi_Sport_logo_2019.svg", "categorie": "Sport" }, 
        { "nume": "Digi Sport 4", "link": "https://LINK_STREAM_DIGISPORT4", "sigla": "https://upload.wikimedia.org/wikipedia/commons/9/91/Digi_Sport_logo_2019.svg", "categorie": "Sport" }, 
        { "nume": "Eurosport 1", "link": "https://LINK_STREAM_EUROSPORT1", "sigla": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Eurosport_1_logo.svg", "categorie": "Sport" },
        { "nume": "Eurosport 2", "link": "https://LINK_STREAM_EUROSPORT2", "sigla": "https://upload.wikimedia.org/wikipedia/commons/0/07/Eurosport_2_logo.svg", "categorie": "Sport" }, 
        { "nume": "Film Now", "link": "https://LINK_STREAM_FILMNOW", "sigla": "https://upload.wikimedia.pedia.org/wikipedia/commons/7/7f/Film_Now_logo_2022.svg", "categorie": "Filme" }, 
        { "nume": "Cartoon Network", "link": "https://LINK_STREAM_CN", "sigla": "https://upload.wikimedia.org/wikipedia/commons/5/5f/Cartoon_Network_2010_logo.svg", "categorie": "Desene" },
        { "nume": "Disney Channel", "link": "https://LINK_STREAM_DISNEY", "sigla": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney_Channel_logo.svg", "categorie": "Desene" },
        { "nume": "Nickelodeon", "link": "https://LINK_STREAM_NICK", "sigla": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Nickelodeon_2023_logo.svg", "categorie": "Desene" },
        { "nume": "Minimax", "link": "https://LINK_STREAM_MINIMAX", "sigla": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Minimax_logo.svg", "categorie": "Desene" },
        { "nume": "Etno TV", "link": "https://LINK_STREAM_ETNO", "sigla": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Etno_TV_logo_2022.svg", "categorie": "Muzică" },
        { "nume": "Favorit TV", "link": "https://LINK_STREAM_FAVORIT", "sigla": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Favorit_TV_logo_2022.svg", "categorie": "Muzică" },
        { "nume": "Taraf TV", "link": "https://LINK_STREAM_TARAF", "sigla": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Taraf_TV_logo.svg", "categorie": "Muzică" },
        { "nume": "Trinitas TV", "link": "https://LINK_STREAM_TRINITAS", "sigla": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Trinitas_TV_logo.svg", "categorie": "Religie" } 
    ];
    
    // 2. FUNCȚIA CARE ÎNCARCĂ CANALUL ÎN PLAYER (IFRAME REAL)
    function loadChannel(channelName, channelUrl, buttonElement) {
        
        if (livePlayer) {
            // Playerul real cu IFRAME
            if (channelUrl.startsWith("https://LINK_STREAM_")) {
                 // Afișează mesaj de eroare dacă linkul este placeholder
                 livePlayer.innerHTML = `
                    <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #000; color: #f0c040; text-align: center; padding: 20px;">
                        <h2 style="margin-bottom: 15px;">VIZIONARE: ${channelName.toUpperCase()}</h2>
                        <p style="font-size: 1.1em; color: #ccc;">
                            Pentru a funcționa, trebuie să înlocuiți linkul <strong>"${channelUrl}"</strong> cu un link de stream real.
                        </p>
                    </div>
                `;
            } else {
                 // Încarcă Playerul real (iframe)
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
            
            button.innerHTML = `<img src="${channel.sigla}" alt="${channel.nume} Logo"><span>${channel.nume}</span>`;
            
            canaleContainer.appendChild(button);
        });
    }
    
    // 4. LOGICA DE FILTRARE
    function filterChannels(category, buttonElement) {
        let filteredChannels = [];
        
        // Când se filtrează, șterge textul din caseta de căutare
        if (searchInput) {
            searchInput.value = '';
        }

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

    // 6. LOGICA DE CĂUTARE (NOU)
    function handleSearch() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        
        // Filtrează TOATE canalele (ignoră filtrele de categorii)
        const searchedChannels = tvChannels.filter(channel => 
            channel.nume.toLowerCase().includes(searchTerm)
        );

        displayChannels(searchedChannels);
        
        // Dezactivează butonul de filtrare activ când începe căutarea
        if (activeFilterButton) {
            activeFilterButton.classList.remove('active');
            activeFilterButton = null; 
        }

        // Activează primul canal din lista NOUĂ, vizual ȘI în player
        const firstChannelInNewList = canaleContainer.querySelector('.canal');
        if (firstChannelInNewList) {
             firstChannelInNewList.click(); 
        } else {
             livePlayer.innerHTML = `<p style="text-align: center; padding: 50px; color: #fff;">Nu s-au găsit canale care să se potrivească căutării.</p>`;
        }
    }


    // 7. PORNIREA APLICAȚIEI:
    generateFilterButtons(); 

    // Setează filtrul "Toate" ca activ inițial
    const initialFilterButton = filterContainer.querySelector('.filter-btn');
    if (initialFilterButton) {
        initialFilterButton.classList.add('active');
        activeFilterButton = initialFilterButton;
    }
    
    // NOU: Atașează evenimentul de căutare
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Afișează toate canalele la început
    displayChannels(tvChannels);

    // Încarcă primul canal la început
    if (tvChannels.length > 0) {
        const initialChannelButton = canaleContainer.querySelector('.canal');
        if (initialChannelButton) {
            initialChannelButton.click(); 
        }
    }
};
