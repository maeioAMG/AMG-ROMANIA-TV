// Încarcă canalele din tv-links.json și le inserează în grilă
fetch('tv-links.json')
  .then(response => response.json())
  .then(canale => {
    const container = document.getElementById('canale-container');

    canale.forEach(canal => {
      const div = document.createElement('div');
      div.className = 'canal';
      div.setAttribute('data-category', canal.categorie.toLowerCase());
      div.setAttribute('data-name', canal.nume.toLowerCase());

      div.innerHTML = `
        <a href="${canal.link}" target="_blank">
          <img src="${canal.sigla}" alt="${canal.nume}">
          <span>${canal.nume}</span>
        </a>
      `;

      container.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Eroare la încărcarea canalelor:', error);
  });
