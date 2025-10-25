fetch('tv-links.json')
  .then(response => response.json())
  .then(canale => {
    const container = document.getElementById('canale-container');

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Caută canal...';
    searchInput.style = 'margin: 20px auto; padding: 10px; width: 80%; max-width: 400px; display: block;';
    document.getElementById('canale').prepend(searchInput);

    const categorii = ["Toate", ...new Set(canale.map(c => c.categorie))];
    const filterBar = document.createElement('div');
    filterBar.style = 'margin: 10px; display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;';

    categorii.forEach(cat => {
      const btn = document.createElement('button');
      btn.textContent = cat;
      btn.className = 'filter-btn';
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.canal').forEach(canal => {
          const c = canal.getAttribute('data-category');
          canal.style.display = (cat === "Toate" || c === cat.toLowerCase()) ? 'block' : 'none';
        });
      });
      filterBar.appendChild(btn);
    });

    document.getElementById('canale').prepend(filterBar);

    const fragment = document.createDocumentFragment();
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
      fragment.appendChild(div);
    });
    container.appendChild(fragment);

    let searchTimeout;
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        const term = searchInput.value.toLowerCase();
        document.querySelectorAll('.canal').forEach(canal => {
          const name = canal.getAttribute('data-name');
          canal.style.display = name.includes(term) ? 'block' : 'none';
        });
      },
