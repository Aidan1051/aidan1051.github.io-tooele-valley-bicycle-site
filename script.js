document.addEventListener('DOMContentLoaded', () => {
  fetch('https://script.google.com/macros/s/AKfycby_gIlAta-x0F8q6ZJUN9B6qF6m4fOjIAZJ_gHtu-pGbV2-v_DZT63nqMVLTJzfAe04sQ/exec')
    .then(response => response.json())
    .then(data => {
      // Home
      document.getElementById('welcome-text').textContent = data.home.WelcomeText;

      // About
      const aboutDiv = document.getElementById('about-content');
      data.about.forEach(item => {
        const section = document.createElement('div');
        section.innerHTML = `<h3>${item.SectionTitle}</h3><p>${item.Content}</p>`;
        aboutDiv.appendChild(section);
      });

      // Services
      const servicesList = document.getElementById('services-list');
      data.services.forEach(service => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${service.ServiceName}</strong>: ${service.Description} - ${service.Price}`;
        servicesList.appendChild(li);
      });

      // Inventory
      const inventoryBody = document.querySelector('#inventory-table tbody');
      data.inventory.forEach(bike => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${bike.BikeModel}</td>
          <td>${bike.Type}</td>
          <td>${bike.Price}</td>
          <td>${bike.Description}</td>
          <td>${bike.ImageURL ? `<img src="${bike.ImageURL}" alt="${bike.BikeModel}">` : 'No image'}</td>
        `;
        inventoryBody.appendChild(tr);
      });

      // Contact
      const contactP = document.getElementById('contact-info');
      contactP.innerHTML = `
        Address: ${data.contact.Address}<br>
        Phone: ${data.contact.Phone}<br>
        Email: ${data.contact.Email}<br>
        Hours: ${data.contact.Hours}
      `;
    })
    .catch(error => console.error('Error fetching data:', error));

});
