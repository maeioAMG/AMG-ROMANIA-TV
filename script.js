fetch('tv-links.json')
  .then(response => response.json())
  .then(data => {
    const lista = document.getElementById('lista-canale');
    data.forEach(canal => {
      const item = document.createElement('li');
      item.innerHTML = `<a href="${canal.link}" target="_blank">${canal.nume}</a>`;
      lista.appendChild(item);
    });
  });
