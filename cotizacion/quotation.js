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
    startDateInput.setCustomValidity('The start date cannot be earlier than today');
    startDateInput.reportValidity();
    return false;
  }

  // Calculate minimum return date (2 days after start date)
  const minEndDate = new Date(startDate);
  minEndDate.setDate(minEndDate.getDate() + 7);

  if (endDate < minEndDate) {
    endDateInput.setCustomValidity('The return date must be at least 7 days after the start date');
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
  minEndDate.setDate(today.getDate() + 7);
  const minEndDateString = minEndDate.toISOString().split('T')[0];

  endDateInput.min = minEndDateString;
}

function getDateForWhatsApp(dateInput) {
  return dateInput.value; // Mantains the exact date entered without modifying it
}

// ---------------------------------------------------

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
                  <span class="quotation__car-spec-text">Base price: ${formatCurrency(selectedCar.price)}/day</span>
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
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const month = months[dateWithTime.getMonth()];
  const year = dateWithTime.getFullYear();
  
  return `${day} of ${month} of ${year}`;
}

// Function to send WhatsApp message
function sendToWhatsApp() {
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;
  const startTime = startTimeInput ? startTimeInput.value : '';
  const endTime = endTimeInput ? endTimeInput.value : '';
  
  // Validations
  if (!startDate || !endDate) {
      alert('Please select start and return dates');
      return;
  }
  
  if (startTimeInput && endTimeInput && (!startTime || !endTime)) {
      alert('Please select start and return times');
      return;
  }
  
  // Validate dates before sending
  if (!validateDates()) {
    return;
  }
  
  // Format dates as text in Spanish
  const formattedStartDate = formatDateAsText(startDate);
  const formattedEndDate = formatDateAsText(endDate);
  
  // Create message for WhatsApp with timezone
  const message = `*¡Mucho gusto!*

Me interesa cotizar el siguiente vehículo:
▪️ *Modelo:* ${selectedCar.name}
▪️ *Categoría:* ${selectedCar.category}

*Detalles de la cotización:*
📅 *Fecha de inicio:* ${formattedStartDate}
⏰ *Hora de inicio:* ${startTime} (Guatemala time)
📅 *Fecha de entrega:* ${formattedEndDate}
⏰ *Hora de entrega:* ${endTime} (Guatemala time)`;
  
  // WhatsApp URL with message - use correct number without + sign
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  
  // Open WhatsApp in a new window
  window.open(whatsappUrl, '_blank');
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
  
  // Button to calculate quotation - changed to send to WhatsApp
  calculateBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default submission
    sendToWhatsApp();
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
          minEndDate.setDate(minEndDate.getDate() + 7);
          
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

// Event for WhatsApp button in footer
if (footerWhatsappButton) {
  footerWhatsappButton.addEventListener('click', function(event) {
      event.preventDefault();
      const phoneNumber = '50248494290';
      const message = "Hola, estoy interesado en los servicios de renta de autos. ¿Podrían brindarme más información?";
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
  });
}