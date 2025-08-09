document.addEventListener('DOMContentLoaded', () => {
  const API_URL = '../api/admin/';
  const vehicleGrid = document.getElementById('vehicle-grid');
  const modal = document.getElementById('vehicle-modal');
  const modalTitle = document.getElementById('modal-title');
  const vehicleForm = document.getElementById('vehicle-form');
  const addVehicleBtn = document.getElementById('add-vehicle-btn');
  const closeModalBtn = document.getElementById('modal-close-btn');

  const fetchAndDisplayVehicles = async () => {
      try {
          const response = await fetch(`${API_URL}leer_autos.php?cache_bust=${new Date().getTime()}`);
          if (!response.ok) throw new Error('Error al cargar los vehículos.');
          
          const vehicles = await response.json();
          vehicleGrid.innerHTML = '';

          if (vehicles.length === 0) {
              vehicleGrid.innerHTML = '<p>No hay vehículos registrados.</p>';
              return;
          }

          vehicles.forEach(vehicle => {
              const card = document.createElement('div');
              card.className = 'car-card';
              card.innerHTML = `
                  <div class="car-card__status ${vehicle.activo == 1 ? 'active' : 'inactive'}">
                      ${vehicle.activo == 1 ? 'Activo' : 'Inactivo'}
                  </div>
                  <img src="../${vehicle.url_imagen}" alt="${vehicle.nombre}" class="car-card__image">
                  <div class="car-card__content">
                      <div class="car-card__header">
                          <h3 class="car-card__title">${vehicle.nombre}</h3>
                          <span class="car-card__category">${vehicle.categoria}</span>
                      </div>
                      <div class="car-card__price-info">
                          <span class="car-card__price">Desde $${parseFloat(vehicle.precio_mes).toFixed(2)}/día (Plan Mensual)</span>
                          <div class="car-card__actions">
                              <button class="car-card-button edit-btn" data-id="${vehicle.id}">Editar</button>
                              <button class="car-card-button delete-btn" data-id="${vehicle.id}">Eliminar</button>
                          </div>
                      </div>
                  </div>
              `;
              vehicleGrid.appendChild(card);
          });
      } catch (error) {
          vehicleGrid.innerHTML = `<p>Error: ${error.message}</p>`;
      }
  };

  const openModalForEdit = async (id) => {
      try {
          const response = await fetch(`${API_URL}leer_autos.php`);
          const vehicles = await response.json();
          const vehicle = vehicles.find(v => v.id == id);

          if (vehicle) {
              vehicleForm.reset();
              document.getElementById('vehicle-id').value = vehicle.id;
              document.getElementById('nombre').value = vehicle.nombre;
              document.getElementById('categoria').value = vehicle.categoria;
              document.querySelector('[name="precio_1_2_dias"]').value = vehicle.precio_1_2_dias;
              document.querySelector('[name="precio_3_6_dias"]').value = vehicle.precio_3_6_dias;
              document.querySelector('[name="precio_semana"]').value = vehicle.precio_semana;
              document.querySelector('[name="precio_15_dias"]').value = vehicle.precio_15_dias;
              document.querySelector('[name="precio_mes"]').value = vehicle.precio_mes;
              document.getElementById('url_imagen_actual').value = vehicle.url_imagen;
              document.getElementById('espec_ac').value = vehicle.espec_ac;
              document.getElementById('espec_combustible').value = vehicle.espec_combustible;
              document.getElementById('espec_transmision').value = vehicle.espec_transmision;
              
              modalTitle.textContent = 'Editar Vehículo';
              modal.style.display = 'flex';
          }
      } catch (error) {
          alert('No se pudo cargar la información del vehículo.');
      }
  };
  
  const openModalForCreate = () => {
      vehicleForm.reset();
      document.getElementById('vehicle-id').value = '';
      document.getElementById('url_imagen_actual').value = '';
      modalTitle.textContent = 'Añadir Nuevo Vehículo';
      modal.style.display = 'flex';
  };

  const handleFormSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(vehicleForm);
      const id = formData.get('id');
      const url = id ? `${API_URL}actualizar_auto.php` : `${API_URL}crear_auto.php`;

      try {
          const response = await fetch(url, {
              method: 'POST',
              body: formData,
          });
          const result = await response.json();

          if (result.status === 'success') {
              modal.style.display = 'none';
              fetchAndDisplayVehicles();
          } else {
              alert(`Error: ${result.message}`);
          }
      } catch (error) {
          alert('Ocurrió un error de red.');
      }
  };

  const handleDeleteVehicle = async (id) => {
      if (!confirm('¿Estás seguro de que quieres eliminar este vehículo? Esta acción no se puede deshacer.')) {
          return;
      }

      try {
          const response = await fetch(`${API_URL}eliminar_auto.php`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: id }),
          });
          const result = await response.json();

          if (result.status === 'success') {
              fetchAndDisplayVehicles();
          } else {
              alert(`Error: ${result.message}`);
          }
      } catch (error) {
          alert('Ocurrió un error de red.');
      }
  };

  addVehicleBtn.addEventListener('click', openModalForCreate);
  closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
  vehicleForm.addEventListener('submit', handleFormSubmit);

  vehicleGrid.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('edit-btn')) {
          openModalForEdit(target.dataset.id);
      } else if (target.classList.contains('delete-btn')) {
          handleDeleteVehicle(target.dataset.id);
      }
  });
  
  modal.addEventListener('click', (event) => {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  });

  fetchAndDisplayVehicles();
});