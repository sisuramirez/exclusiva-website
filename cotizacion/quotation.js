(() => {
  const clearCache = () => {
    const root = document.getElementById('root');
    if (root) {
      root.innerHTML += 'Cache cleared using window.location.href <br>';
    }
    
    if (!window.location.href.includes('nocache')) {
      const baseUrl = window.location.href.split('?')[0];
      window.location.href = `${baseUrl}?nocache=${Date.now()}`;
    }
  };
  
  document.addEventListener("DOMContentLoaded", clearCache);
})();



const contactLink = document.querySelector('.nav__link[href="#"]'); // Selects the "Contact Us" link
let contactCard = null;
const footerWhatsappButton = document.querySelector('.footer__social-link img[alt="WhatsApp"]').parentElement;


function createContactCard(clickEvent) {
  // Prevent the event from propagating
  if (clickEvent) {
    clickEvent.stopPropagation();
  }
  
  // Create card container
  contactCard = document.createElement('div');
  contactCard.className = 'contact-card';
  
  // Create card content
  const cardContent = `
      <div class="contact-card__content">
          <button class="contact-card__close">&times;</button>
          <div class="contact-card__info">
              <div class="contact-card__contact">
                <span class="contact-card__phone">
                  Teléfono: +502 4849-4290
                  <a href="tel:+50248494290" class="phone-link" aria-label="Call +(502)48494290">
                    <img src="./img/phone-icon.png" alt="Call" class="contact-card__phone-icon">
                  </a>
                </span>
                <span class="contact-card__email">Email: cotizaciones@exclusivarentaautos.com</span>
              </div>
              <div class="contact-card__social">
                  <a href="https://www.facebook.com/profile.php?id=100077124247045" class="contact-card__social-link" target="_blank">
                      <img src="./img/social-media-facebook.png" alt="Facebook" class="contact-card__social-icon">
                  </a>
                  <a href="https://www.instagram.com/exclusivarentaautos?igsh=MTN1dWVrOTF1N3A0dQ==" class="contact-card__social-link" target="_blank">
                      <img src="./img/social-media-instagram.png" alt="Instagram" class="contact-card__social-icon">
                  </a>
                  <a href="#" class="contact-card__social-link whatsapp-link">
                      <img src="./img/social-media-whatsapp.png" alt="WhatsApp" class="contact-card__social-icon">
                  </a>
              </div>
          </div>
      </div>
  `;
  
  contactCard.innerHTML = cardContent;
  
  // Add card to the DOM
  document.body.appendChild(contactCard);
  
  // Add event listener to close button
  const closeButton = contactCard.querySelector('.contact-card__close');
  closeButton.addEventListener('click', hideContactCard);
  
  // Add event listener to WhatsApp link
  const whatsappLink = contactCard.querySelector('.whatsapp-link');
  if (whatsappLink) {
    whatsappLink.addEventListener('click', function(event) {
      event.preventDefault();
      const phoneNumber = '+50248494290';
      const message = "Hola, estoy interesado en los servicios de renta de autos. ¿Podrían brindarme más información?";
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    });
  }
  
  // Show the card with animation
  setTimeout(() => {
      contactCard.classList.add('active');
  }, 10);
  
  // Add outside click listener - but with a delay to prevent immediate triggering
  setTimeout(() => {
    document.addEventListener('click', closeCardOutside);
  }, 100);
}

// Hide contact card function
function hideContactCard() {
  if (contactCard) {
      contactCard.classList.remove('active');
      
      // Wait for transition to finish before removing from DOM
      setTimeout(() => {
          if (contactCard && contactCard.parentNode) {
              document.body.removeChild(contactCard);
              contactCard = null;
          }
      }, 300); // Match transition duration
      
      // Remove outside click listener
      document.removeEventListener('click', closeCardOutside);
  }
}

// Close card when clicking outside
function closeCardOutside(event) {
  if (contactCard && 
      !contactCard.contains(event.target) && 
      !event.target.classList.contains('nav__link')) {
      hideContactCard();
  }
}

// Toggle contact card function
function toggleContactCard(event) {
  event.preventDefault();
  event.stopPropagation(); // Stop the event from bubbling up
  
  if (contactCard) {
      hideContactCard();
  } else {
      createContactCard(event);
  }
}

// Add event listener to contact link
document.addEventListener('DOMContentLoaded', function() {
  const contactLinks = document.querySelectorAll('.nav__link');
  contactLinks.forEach(link => {
      if (link.textContent.trim() === 'Contáctanos') {
          link.addEventListener('click', toggleContactCard);
      }
  });
});

// Array of available vehicles
const cars = [
  // MICROBUSES
  {
    id: 1,
    name: "Toyota Hiace",
    category: "Microbuses",
    imageUrl: "./img/hiace.png?v=2",
    price: 80,
    specs: {
      airConditioner: "Sí",
      fuel: "Diésel",
      transmission: "Manual"
    }
  },
  {
    id: 2,
    name: "Nissan Urvan",
    category: "Microbuses",
    imageUrl: "./img/urvan.png?v=2",
    price: 80,
    specs: {
      airConditioner: "Sí",
      fuel: "Diésel",
      transmission: "Manual"
    }
  },
  {
    id: 3,
    name: "Hyundai H1",
    category: "Microbuses",
    imageUrl: "./img/h1.png?v=2",
    price: 70,
    specs: {
      airConditioner: "Sí",
      fuel: "Diésel",
      transmission: "Automático/Manual"
    }
  },
  {
    id: 4,
    name: "Hyundai Staria",
    category: "Microbuses",
    imageUrl: "./img/staria.png?v=2",
    price: 80,
    specs: {
      airConditioner: "Sí",
      fuel: "Diésel",
      transmission: "Automático/Manual"
    }
  },
  
  // SUVs
  {
    id: 5,
    name: "Toyota Fortuner",
    category: "SUVs",
    imageUrl: "./img/fortuner.png?v=2",
    price: 95,
    specs: {
      airConditioner: "Sí",
      fuel: "Diésel",
      transmission: "Automático"
    }
  },
  {
    id: 6,
    name: "Mitsubishi Montero",
    category: "SUVs",
    imageUrl: "./img/montero.png?v=2",
    price: 80,
    specs: {
      airConditioner: "Sí",
      fuel: "Diésel",
      transmission: "Automático"
    }
  },
  {
    id: 7,
    name: "Hyundai Santa Fe",
    category: "SUVs",
    imageUrl: "./img/santafe.png?v=2",
    price: 65,
    specs: {
      airConditioner: "Sí",
      fuel: "Gasolina",
      transmission: "Automático"
    }
  },
  {
    id: 8,
    name: "Mitsubishi Outlander",
    category: "SUVs",
    imageUrl: "./img/outlander.png?v=2",
    price: 65,
    specs: {
      airConditioner: "Sí",
      fuel: "Gasolina",
      transmission: "Automático"
    }
  },
  
  // PICK-UPS
  {
    id: 9,
    name: "Toyota Hilux",
    category: "Pick-ups",
    imageUrl: "./img/hilux.png?v=2",
    price: 75,
    specs: {
      airConditioner: "Sí",
      fuel: "Diésel",
      transmission: "Automático/Manual"
    }
  },
  {
    id: 10,
    name: "Mitsubishi L200",
    category: "Pick-ups",
    imageUrl: "./img/l200.png?v=2",
    price: 75,
    specs: {
      airConditioner: "Sí",
      fuel: "Diésel",
      transmission: "Manual/Automático"
    }
  },
  {
    id: 11,
    name: "Nissan Frontier",
    category: "Pick-ups",
    imageUrl: "./img/frontier.png?v=2",
    price: 75,
    specs: {
      airConditioner: "Sí",
      fuel: "Diésel",
      transmission: "Automático/Manual"
    }
  },
  
  // CROSSOVER
  {
    id: 12,
    name: "Hyundai Creta",
    category: "Crossovers",
    imageUrl: "./img/creta.png?v=2",
    price: 55,
    specs: {
      airConditioner: "Sí",
      fuel: "Gasolina",
      transmission: "Automático"
    }
  },
  {
    id: 13,
    name: "Nissan Kicks",
    category: "Crossovers",
    imageUrl: "./img/kicks.png?v=2",
    price: 45,
    specs: {
      airConditioner: "Sí",
      fuel: "Gasolina",
      transmission: "Automático"
    }
  },
  {
    id: 14,
    name: "Kia Sonet",
    category: "Crossovers",
    imageUrl: "./img/sonet.png?v=2",
    price: 45,
    specs: {
      airConditioner: "Sí",
      fuel: "Gasolina",
      transmission: "Automático"
    }
  },
  {
    id: 15,
    name: "Mitsubishi Xpander",
    category: "Crossovers",
    imageUrl: "./img/xpander-v2.png?v=2",
    price: 55,
    specs: {
      airConditioner: "Sí",
      fuel: "Gasolina",
      transmission: "Automático"
    }
  },
  {
    id: 16,
    name: "Kia Rio",
    category: "Sedanes",
    imageUrl: "./img/rio.png?v=2",
    price: 35,
    specs: {
      airConditioner: "Sí",
      fuel: "Gasolina",
      transmission: "Automático"
    }
  },
  {
    id: 17,
    name: "Hyundai Verna",
    category: "Sedanes",
    imageUrl: "./img/verna.png?v=2",
    price: 35,
    specs: {
      airConditioner: "Sí",
      fuel: "Gasolina",
      transmission: "Automático"
    }
  },
  {
    id: 18,
    name: "Toyota Corolla",
    category: "Sedanes",
    imageUrl: "./img/corolla.png?v=3",
    price: 35,
    specs: {
      airConditioner: "Sí",
      fuel: "Gasolina",
      transmission: "Automático"
    }
  }
  ]

  const extraHourRates = {
    "Microbuses": 20,
    "SUVs": 20,
    "Pick-ups": 20,
    "Crossovers": 20,
    "Sedanes": 10
  };

// --- AÑADIDO: Estructura de datos para los seguros (add-ons)
const insuranceAddOns = [
    { 
        id: 'cdw', 
        name: 'Seguro CDW', 
        dailyCost: 10, // Costo de ejemplo
        mandatory: true, 
        selected: true, 
        description: 'Cobertura Parcial de Colisión' 
    },
    { 
        id: 'tpp', 
        name: 'Protección a Terceros', 
        dailyCost: 10, // Costo de ejemplo
        mandatory: false, 
        selected: false, 
        description: 'Cubre daños a otras propiedades.' 
    },
    { 
        id: 'pai', 
        name: 'Asistencia Personal', 
        dailyCost: 10, // Costo de ejemplo
        mandatory: false, 
        selected: false, 
        description: 'Cubre gastos médicos para ocupantes.' 
    }
];

// Elementos del DOM
const catalogGrid = document.getElementById('catalog-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const quotationSection = document.getElementById('quotation-section');
const backBtn = document.getElementById('back-btn');
const selectedCarInfo = document.getElementById('selected-car-info');
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const startTimeInput = document.getElementById('start-time'); // Referencia al nuevo campo de hora de inicio
const endTimeInput = document.getElementById('end-time');     // Referencia al nuevo campo de hora de entrega
const calculateBtn = document.getElementById('calculate-btn');
const quotationResult = document.getElementById('quotation-result');
const hamburgerBtn = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const whatsappNumber = "50248494290"; // Correct number without the + sign

// Variables globales
let selectedCar = null;
// --- AÑADIDO: Se inicializa la variable de detalles de cotización para que esté lista.
let currentQuoteDetails = {};


function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
  }).format(amount);
}
// Function to create a car card
function createCarCard(car) {
  const carCard = document.createElement('div');
  carCard.className = 'car-card';
  carCard.dataset.category = car.category;
  
  carCard.innerHTML = `
      <img src="${car.imageUrl}" alt="${car.name}" class="car-card__image">
      <div class="car-card__content">
          <div class="car-card__header">
              <h3 class="car-card__title">${car.name}</h3>
              <span class="car-card__category">${car.category}</span>
          </div>
          <div class="car-card__specs">
              <div class="car-card__spec">
                  <span class="car-card__spec-icon">❄️</span>
                  <span class="car-card__spec-text">Aire acondicionado: ${car.specs.airConditioner}</span>
              </div>
              <div class="car-card__spec">
                  <span class="car-card__spec-icon">⛽</span>
                  <span class="car-card__spec-text">Combustible: ${car.specs.fuel}</span>
              </div>
              <div class="car-card__spec">
                  <span class="car-card__spec-icon">🔄</span>
                  <span class="car-card__spec-text">Transmisión: ${car.specs.transmission}</span>
              </div>
          </div>
          <div class="car-card__footer">
              <span class="car-card__price">Precio desde: ${formatCurrency(car.price)}/día</span>
              <button class="car-card__button" data-id="${car.id}">Cotizar este auto</button>
          </div>
      </div>
  `;
  
  return carCard;
}

// Function to display all cars or filter by category
function displayCars(category = 'all') {
  catalogGrid.innerHTML = '';
  
  cars.forEach(car => {
      if (category === 'all' || car.category === category) {
          const carCard = createCarCard(car);
          catalogGrid.appendChild(carCard);
      }
  });
  
  // Agregar event listeners a los botones de cotizar
  document.querySelectorAll('.car-card__button').forEach(button => {
      button.addEventListener('click', () => {
          const carId = parseInt(button.dataset.id);
          selectedCar = cars.find(car => car.id === carId);
          showQuotationSection();
      });
  });
}

function validateDates() {
  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);
  const today = new Date();

  // Ensure today has no hours for exact comparison
  today.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  // Calculate yesterday
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Clear any previous error
  startDateInput.setCustomValidity('');
  endDateInput.setCustomValidity('');

  // Start date validation
  // Allows selecting today or one day before
  if (startDate < yesterday) {
    startDateInput.setCustomValidity('La fecha de inicio no puede ser anterior a hoy');
    startDateInput.reportValidity();
    return false;
  }

  // Calculate minimum return date (2 days after start date)
  const minEndDate = new Date(startDate);
  minEndDate.setDate(minEndDate.getDate() + 2);

  if (endDate < minEndDate) {
    endDateInput.setCustomValidity('La fecha de devolución debe ser al menos 2 días después de la fecha de inicio');
    endDateInput.reportValidity();
    return false;
  }

  return true;
}

function setInitialDateRestrictions() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate yesterday
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Format yesterday for input
  const yesterdayString = yesterday.toISOString().split('T')[0];
  startDateInput.min = yesterdayString;

  // Calculate minimum date for return date (2 days after start date)
  const minEndDate = new Date(today);
  minEndDate.setDate(today.getDate() + 2);
  const minEndDateString = minEndDate.toISOString().split('T')[0];

  endDateInput.min = minEndDateString;
}

const fabWhatsapp = document.getElementById('whatsapp-fab');
      if (fabWhatsapp) {
          fabWhatsapp.addEventListener('click', function(event) {
              event.preventDefault();
              
              const phoneNumber = '50248494290';
              const message = "Hola, estoy interesado en rentar un vehículo y me gustaría más información.";
              
              const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
              
              window.open(whatsappUrl, '_blank');
          });
      }

// Function to show quotation section
function showQuotationSection() {
  document.querySelector('.catalog').style.display = 'none';
  quotationSection.style.display = 'block';
  
  // Display selected car information
  selectedCarInfo.innerHTML = `
      <img src="${selectedCar.imageUrl}" alt="${selectedCar.name}" class="quotation__car-image">
      <div class="quotation__car-details">
          <h3 class="quotation__car-title">${selectedCar.name}</h3>
          <span class="quotation__car-category">${selectedCar.category}</span>
          <div class="quotation__car-specs">
              <div class="quotation__car-spec">
                  <span class="car-card__spec-icon">❄️</span>
                  <span class="quotation__car-spec-text">Aire acondicionado: ${selectedCar.specs.airConditioner}</span>
              </div>
              <div class="quotation__car-spec">
                  <span class="car-card__spec-icon">⛽</span>
                  <span class="quotation__car-spec-text">Combustible: ${selectedCar.specs.fuel}</span>
              </div>
              <div class="quotation__car-spec">
                  <span class="car-card__spec-icon">🔄</span>
                  <span class="quotation__car-spec-text">Transmisión: ${selectedCar.specs.transmission}</span>
              </div>
              <div class="quotation__car-spec">
                  <span class="car-card__spec-icon">💰</span>
                  <span class="quotation__car-spec-text">Precio desde: ${formatCurrency(selectedCar.price)}/dia</span>
              </div>
          </div>
      </div>
  `;
  
  // Clear inputs and quotation result
  startDateInput.value = '';
  endDateInput.value = '';
  if (startTimeInput) startTimeInput.value = '';
  if (endTimeInput) endTimeInput.value = '';
  quotationResult.style.display = 'none';
  
  // Set minimum values for dates
  setInitialDateRestrictions();
}

// Function to return to catalog
function backToCatalog() {
  quotationSection.style.display = 'none';
  document.querySelector('.catalog').style.display = 'block';
  selectedCar = null;
}

// --- MODIFICADO: Esta función ahora guarda los datos clave en `currentQuoteDetails`.
function calculateAndDisplayQuote() {
  // --- 1. OBTENER Y VALIDAR ENTRADAS ---
  const startDateValue = startDateInput.value;
  const endDateValue = endDateInput.value;
  const startTimeValue = startTimeInput.value;
  const endTimeValue = endTimeInput.value;

  if (!startDateValue || !endDateValue || !startTimeValue || !endTimeValue) {
    quotationResult.innerHTML = `<p class="error">Por favor, completa todos los campos de fecha y hora.</p>`;
    quotationResult.style.display = 'block';
    return;
  }

  const startDate = new Date(`${startDateValue}T${startTimeValue}`);
  const endDate = new Date(`${endDateValue}T${endTimeValue}`);

  if (endDate <= startDate) {
    quotationResult.innerHTML = `<p class="error">La fecha y hora de entrega debe ser posterior a la de inicio.</p>`;
    quotationResult.style.display = 'block';
    return;
  }

  // --- NUEVA VALIDACIÓN: FECHA DE INICIO NO ANTERIOR A HOY ---
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Se establece la hora a medianoche para comparar solo la fecha.

  // Se crea una fecha a partir del valor del input para una comparación precisa.
  const selectedDateOnly = new Date(startDateValue + 'T00:00:00');

  if (selectedDateOnly < today) {
    quotationResult.innerHTML = `<p class="error">la fecha de inicio no puede ser anterior a hoy</p>`;
    quotationResult.style.display = 'block';
    return; // Detiene la ejecución de la función si la fecha es inválida.
  }
  // --- FIN DE LA NUEVA VALIDACIÓN ---


  // --- 2. OBTENER VARIABLES DE PRECIO ---
  const dailyPrice = selectedCar.price;
  const extraHourPrice = extraHourRates[selectedCar.category] || 10; // Usa 10 como valor por defecto si la categoría no existe

  // --- 3. REALIZAR EL CÁLCULO MATEMÁTICO ---
  const durationMs = endDate.getTime() - startDate.getTime();
  const durationHours = Math.ceil(durationMs / (1000 * 60 * 60)); // Redondear horas hacia arriba

  const fullDays = Math.floor(durationHours / 24);
  const extraHours = durationHours % 24;

  let finalDays = fullDays;
  let extraHoursCost = extraHours * extraHourPrice;
  let finalTotal = 0;
  let summaryHTML = '';

  // --- 4. APLICAR LA REGLA DE "MEJOR PRECIO" ---
  if (extraHours > 0 && extraHoursCost >= dailyPrice) {
    // Si el costo de horas extra es mayor o igual al de un día, se cobra un día más.
    finalDays += 1;
    finalTotal = finalDays * dailyPrice;
    
    summaryHTML = `
      <h4>Resumen de la Cotización</h4>
      <p>Días de renta: <strong>${finalDays}</strong> (incluyendo horas extra)</p>
      <p>Precio por día: ${formatCurrency(dailyPrice)}</p>
      <hr>
      <p class="quotation__total">Subtotal Estimado: <strong>${formatCurrency(finalTotal)}</strong></p>
    `;
    currentQuoteDetails.rentalDays = finalDays; // Guardar días

  } else {
    // Si no, se cobran los días y las horas extra por separado.
    finalTotal = (fullDays * dailyPrice) + extraHoursCost;
    
    summaryHTML = `
      <h4>Resumen de la Cotización</h4>
      <p>${fullDays} día(s) x ${formatCurrency(dailyPrice)}/día = <strong>${formatCurrency(fullDays * dailyPrice)}</strong></p>
      ${extraHours > 0 ? `<p>${extraHours} hora(s) extra x ${formatCurrency(extraHourPrice)}/hora = <strong>${formatCurrency(extraHoursCost)}</strong></p>` : ''}
      <hr>
      <p class="quotation__total">Subtotal Estimado: <strong>${formatCurrency(finalTotal)}</strong></p>
    `;
    currentQuoteDetails.rentalDays = fullDays > 0 ? fullDays : 1; // Guardar días (mínimo 1)
  }
  
  // --- AÑADIDO: Guardar el total base en el objeto global.
  currentQuoteDetails.baseTotal = finalTotal;

  // --- 5. MOSTRAR EL RESULTADO ---
  summaryHTML += `<button id="proceed-to-form-btn" class="btn">Continuar y Llenar Datos</button>`;
  quotationResult.innerHTML = summaryHTML;
  quotationResult.style.display = 'block';

  // Este listener se mantiene como estaba en el código original.
  document.getElementById('proceed-to-form-btn').addEventListener('click', () => {
   console.log("Botón 'Continuar' presionado. La lógica principal está en el otro listener.");
  });
}


// Function to format date as text in Spanish considering Guatemala timezone
function formatDateAsText(dateString) {
  // Create date in UTC
  const dateUTC = new Date(dateString);
  
  // Adjust to Guatemala timezone (UTC-6)
  // Note: we use a date with hour 0 to avoid day change affecting the result
  const dateString12PM = dateString + 'T12:00:00';
  const dateWithTime = new Date(dateString12PM);
  
  const day = dateWithTime.getDate();
  
  // Array with month names in Spanish
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];
  
  const month = months[dateWithTime.getMonth()];
  const year = dateWithTime.getFullYear();
  
  return `${day} de ${month} de ${year}`;
}


// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Display all cars when page loads
  displayCars();
  
  // Filter cars by category
  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          const filterValue = button.dataset.filter;
          
          // Update active button
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          // Display filtered cars
          displayCars(filterValue);
      });
  });
  
  // Back to catalog button
  backBtn.addEventListener('click', backToCatalog);
  
  // Button to calculate quotation
  calculateBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default submission
    calculateAndDisplayQuote();
  });
  
  // Menu hamburger
  hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      // Animate hamburger lines
      const lines = hamburgerBtn.querySelectorAll('.nav__hamburger-line');
      if (navMenu.classList.contains('active')) {
          lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          lines[1].style.opacity = '0';
          lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
          lines[0].style.transform = 'none';
          lines[1].style.opacity = '1';
          lines[2].style.transform = 'none';
      }
  });
  
  // Event for start date that updates minimum return date
  startDateInput.addEventListener('change', () => {
      if (startDateInput.value) {
          // Set minimum return date
          const minEndDate = new Date(startDateInput.value);
          minEndDate.setDate(minEndDate.getDate() + 2);
          
          // Format minimum date for return date input
          const minEndDateString = minEndDate.toISOString().split('T')[0];
          endDateInput.min = minEndDateString;
          
          // Clear return date value if invalid
          if (new Date(endDateInput.value) < minEndDate) {
              endDateInput.value = '';
          }
      }
  });

  // Set minimum return date restrictions
  setInitialDateRestrictions();
});

if (footerWhatsappButton) {
  footerWhatsappButton.addEventListener('click', function(event) {
      event.preventDefault();
      const phoneNumber = '50248494290';
      const message = "Hola, estoy interesado en los servicios de renta de autos. ¿Podrían brindarme más información?";
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
  });
}


// =========== CÓDIGO DEL FORMULARIO DE CLIENTE (CON LÓGICA DE ADDONS) ===========
document.addEventListener('DOMContentLoaded', () => {

    // --- Selecciona los elementos del DOM ---
    const customerFormSection = document.getElementById('customer-form-section');
    const backToQuoteBtn = document.getElementById('back-to-quote-btn');
    const customerForm = document.getElementById('customer-form');
    const licenseOriginRadios = document.querySelectorAll('input[name="license-origin"]');
    const licenseOriginOtherInput = document.getElementById('license-origin-other');
    const deliveryLocationRadios = document.querySelectorAll('input[name="delivery-location"]');
    const flightDetailsFieldset = document.getElementById('flight-details');
    const countryCodeSelect = document.getElementById('country-code');
    const summaryCarInfo = document.getElementById('summary-car-info');
    const summaryQuoteInfo = document.getElementById('summary-quote-info');
    // --- AÑADIDO: Elementos para los addons.
    const addonsContainer = document.getElementById('addons-container');
    const finalTotalContainer = document.getElementById('final-total-container');

    // --- Datos y funciones para el nuevo formulario ---
    const countryCodes = [
        { name: "Guatemala", code: "+502" }, { name: "USA", code: "+1" },
        { name: "El Salvador", code: "+503" }, { name: "Honduras", code: "+504" },
        { name: "Mexico", code: "+52" }, { name: "Spain", code: "+34" },
    ];

    function populateCountryCodes() {
        if (!countryCodeSelect) return;
        countryCodes.forEach(country => {
            const option = document.createElement('option');
            option.value = country.code;
            option.textContent = `${country.name} (${country.code})`;
            if (country.code === '+502') { option.selected = true; }
            countryCodeSelect.appendChild(option);
        });
    }

    function handleLicenseOriginChange() {
        const otherRadio = document.querySelector('input[name="license-origin"][value="Otros"]');
        licenseOriginOtherInput.style.display = otherRadio.checked ? 'block' : 'none';
        licenseOriginOtherInput.required = otherRadio.checked;
        if (!otherRadio.checked) licenseOriginOtherInput.value = '';
    }

    function handleDeliveryLocationChange() {
        const airportRadio = document.querySelector('input[name="delivery-location"][value="Aeropuerto"]');
        flightDetailsFieldset.style.display = airportRadio.checked ? 'block' : 'none';
        document.getElementById('airline-name').required = airportRadio.checked;
        document.getElementById('flight-number').required = airportRadio.checked;
        if (!airportRadio.checked) {
            document.getElementById('airline-name').value = '';
            document.getElementById('flight-number').value = '';
        }
    }
    
    function handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(customerForm);
        const data = Object.fromEntries(formData.entries());
        // --- AÑADIDO: Captura de seguros seleccionados.
        const selectedAddOns = insuranceAddOns.filter(addon => addon.selected);

        console.log("--- Reserva Finalizada (simulación) ---");
        console.log("Datos del Cliente:", data);
        console.log("Datos del Vehículo:", selectedCar);
        console.log("Detalles de la Cotización:", currentQuoteDetails);
        console.log("Seguros Seleccionados:", selectedAddOns);
        
        alert('¡Gracias por tu reserva! (Esto es una simulación). Revisa la consola del navegador para ver los datos enviados.');
    }

    // --- MODIFICADO: `showCustomerForm` ahora prepara la vista con los addons.
    function showCustomerForm() {
        quotationSection.style.display = 'none';
        customerFormSection.style.display = 'block';

        summaryCarInfo.innerHTML = document.getElementById('selected-car-info').innerHTML;
        
        // Llamadas para renderizar los add-ons y calcular el total inicial
        renderInsuranceAddOns();
        updateQuoteSummaryAndTotal();

        window.scrollTo(0, 0);
    }
    
    // --- AÑADIDO: Nuevas funciones para manejar la lógica de los addons.
    /**
     * Crea los botones para los seguros y los muestra en el DOM.
     */
    function renderInsuranceAddOns() {
        if (!addonsContainer) return;
        addonsContainer.innerHTML = ''; // Limpiar contenedor

        insuranceAddOns.forEach(addon => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'addon-button';
            button.dataset.id = addon.id;

            if (addon.selected) button.classList.add('selected');
            if (addon.mandatory) button.classList.add('mandatory');

            button.innerHTML = `
                <h4>${addon.name}</h4>
                <p>${addon.description}</p>
                <p><strong>${formatCurrency(addon.dailyCost)} / día</strong></p>
                ${addon.mandatory ? '<span class="mandatory-label">(Obligatorio)</span>' : ''}
            `;
            addonsContainer.appendChild(button);
        });
    }

    /**
     * Actualiza el resumen de la cotización y el total final, incluyendo los addons seleccionados.
     */
    function updateQuoteSummaryAndTotal() {
        if (!summaryQuoteInfo || !finalTotalContainer || !currentQuoteDetails.baseTotal) return;
        
        let addonsTotal = 0;
        let addonsHTML = '<hr><h4>Seguros y Extras</h4>';

        insuranceAddOns.forEach(addon => {
            if (addon.selected) {
                const addonCost = addon.dailyCost * currentQuoteDetails.rentalDays;
                addonsTotal += addonCost;
                addonsHTML += `<p>${addon.name}: <strong>${formatCurrency(addonCost)}</strong> (${currentQuoteDetails.rentalDays} día(s) x ${formatCurrency(addon.dailyCost)})</p>`;
            }
        });

        const finalTotal = currentQuoteDetails.baseTotal + addonsTotal;

        // Mostrar resumen de renta + resumen de add-ons
        summaryQuoteInfo.innerHTML = currentQuoteDetails.summaryHTML + addonsHTML;

        // Mostrar el gran total

        finalTotalContainer.innerHTML = `<hr>Total Final Estimado: <strong>${formatCurrency(finalTotal)}</strong>`;
    }

    // --- Asignación de todos los nuevos event listeners ---
    populateCountryCodes();

    if (backToQuoteBtn) {
        backToQuoteBtn.addEventListener('click', () => {
            customerFormSection.style.display = 'none';
            document.getElementById('quotation-section').style.display = 'block';
            window.scrollTo(0, 0);
        });
    }

    if (licenseOriginRadios) {
        licenseOriginRadios.forEach(radio => radio.addEventListener('change', handleLicenseOriginChange));
    }

    if (deliveryLocationRadios) {
        deliveryLocationRadios.forEach(radio => radio.addEventListener('change', handleDeliveryLocationChange));
    }

    if (customerForm) {
        customerForm.addEventListener('submit', handleFormSubmit);
    }
    
    // --- AÑADIDO: Listener para los botones de addons.
    if (addonsContainer) {
        addonsContainer.addEventListener('click', (event) => {
            const button = event.target.closest('.addon-button');
            if (!button) return;

            const addonId = button.dataset.id;
            const addon = insuranceAddOns.find(a => a.id === addonId);

            if (addon && !addon.mandatory) {
                addon.selected = !addon.selected; // Cambiar estado
                button.classList.toggle('selected'); // Cambiar clase visual
                updateQuoteSummaryAndTotal(); // Recalcular todo
            }
        });
    }


    // **IMPORTANTE**: Conexión entre la vista de cotización y el nuevo formulario (estructura original).
    const quotationResultContainer = document.querySelector('#quotation-result');
    if(quotationResultContainer){
        quotationResultContainer.addEventListener('click', function(event){
            if(event.target && event.target.id === 'proceed-to-form-btn'){
                // Guarda el HTML del resumen en la variable global.
                let summaryHtmlContent = '';
                const resultElements = quotationResultContainer.querySelectorAll('h4, p, hr');
                resultElements.forEach(el => {
                    summaryHtmlContent += el.outerHTML;
                });
                
                currentQuoteDetails.summaryHTML = summaryHtmlContent;

                showCustomerForm();
            }
        });
    }
});