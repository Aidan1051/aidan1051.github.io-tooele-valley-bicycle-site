document.addEventListener('DOMContentLoaded', () => {
  fetch('https://script.google.com/macros/s/AKfycby_gIlAta-x0F8q6ZJUN9B6qF6m4fOjIAZJ_gHtu-pGbV2-v_DZT63nqMVLTJzfAe04sQ/exec')
    .then(res => res.json())
    .then(data => {
      // Hero (from HomeHero tab - assuming first row)
      if (data.homeHero) {
        document.querySelector('.hero h1').textContent = data.homeHero.Title || "Tooele Valley's Bike Shop";
        document.getElementById('hero-subtitle').textContent = data.homeHero.Subtitle || "Family-owned • Affordable • Right here in Erda!";
      }

      // Featured cards (from FeaturedSections tab)
      const featured = document.getElementById('featured-cards');
      if (data.featuredSections) {
        data.featuredSections.forEach(item => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `
            ${item.ImageURL ? `<img src="${item.ImageURL}" alt="${item.Title}">` : ''}
            <div class="card-content">
              <h3>${item.Title}</h3>
              <p>${item.Description}</p>
              ${item.ButtonText ? `<a href="${item.ButtonLink}" class="btn primary">${item.ButtonText}</a>` : ''}
            </div>
          `;
          featured.appendChild(card);
        });
      }

      // Add similar rendering for other pages (e.g., services list, bike grids)
    })
    .catch(err => console.error('Error:', err));
});


