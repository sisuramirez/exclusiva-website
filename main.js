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
  
  
// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const contactLink = document.querySelector('.nav__link[href="#"]'); 
const whatsappButton = document.querySelector('.are-you-ready__button');
const footerWhatsappButton = document.querySelector('.footer__social-link img[alt="WhatsApp"]').parentElement;
let contactCard = null;

// Toggle mobile menu function
function toggleMenu() {
    navMenu.classList.toggle('active');
    
    // Toggle hamburger icon animation
    const hamburgerLines = hamburger.querySelectorAll('.nav__hamburger-line');
    if (navMenu.classList.contains('active')) {
        hamburgerLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        hamburgerLines[1].style.opacity = '0';
        hamburgerLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        hamburgerLines[0].style.transform = 'none';
        hamburgerLines[1].style.opacity = '1';
        hamburgerLines[2].style.transform = 'none';
    }
}

// Create contact card function
function createContactCard() {
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
    const cardWhatsAppLink = contactCard.querySelector('.whatsapp-link');
    if (cardWhatsAppLink) {
        cardWhatsAppLink.addEventListener('click', function(event) {
            event.preventDefault();
            const phoneNumber = '50248494290';
            const message = "Hola, estoy interesado en los servicios de renta de autos. ¿Podrían brindarme más información?";
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }
    
    // Show the card with animation
    setTimeout(() => {
        contactCard.classList.add('active');
    }, 10);
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
    if (contactCard && !contactCard.querySelector('.contact-card__content').contains(event.target) && 
        event.target !== contactLink) {
        hideContactCard();
    }
}

// Toggle contact card function
function toggleContactCard(event) {
    event.preventDefault();
    
    if (contactCard) {
        hideContactCard();
    } else {
        createContactCard();
    }
}

// Event listeners
hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    if (!navMenu.contains(event.target) && 
        !hamburger.contains(event.target) && 
        navMenu.classList.contains('active')) {
        toggleMenu();
    }
});

// Close menu when clicking navigation links
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Add event listener to contact link
const contactLinks = document.querySelectorAll('.nav__link');
contactLinks.forEach(link => {
    if (link.textContent.trim() === 'Contáctanos') {
        link.addEventListener('click', toggleContactCard);
    }
});

if (whatsappButton) {
    whatsappButton.addEventListener('click', function(event) {
        event.preventDefault();
        const phoneNumber = '50248494290';
        const message = "Hola, estoy interesado en los servicios de renta de autos. ¿Podrían brindarme más información?";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Array de imágenes de vehículos para rotar
    const vehicleImages = [
        './img/transition1-hilux.png',
        './img/transition2-fortuner.png',
        './img/transition4-stavia.png', 
        './img/transition5-kicks.png'
    ];
    
    // Seleccionar la imagen principal
    const heroImage = document.querySelector('.hero__image-container img');
    let currentIndex = 0;
    let isTransitioning = false;
    
    // Precargar imágenes para evitar parpadeos
    function preloadImages() {
        vehicleImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    // Precargar imágenes al inicio
    preloadImages();
    
    // Añadir transición CSS a la imagen
    if (heroImage) {
        heroImage.style.transition = 'opacity 0.5s ease-in-out';
    }
    
    // Función para cambiar la imagen con una transición suave
    function changeImage() {
        // Prevenir múltiples transiciones a la vez
        if (isTransitioning || !heroImage) return;
        isTransitioning = true;
        
        // Desvanecer completamente la imagen actual
        heroImage.style.opacity = '0';
        
        // Esperar a que termine el desvanecimiento antes de cambiar la imagen
        setTimeout(() => {
            // Calcular el siguiente índice
            currentIndex = (currentIndex + 1) % vehicleImages.length;
            
            // Preparar la nueva imagen pero mantenerla invisible
            const nextImage = new Image();
            nextImage.src = vehicleImages[currentIndex];
            
            // Cuando la nueva imagen esté lista, actualizar src y hacer aparecer
            nextImage.onload = function() {
                heroImage.src = vehicleImages[currentIndex];
                
                // Pequeña pausa antes de mostrar la nueva imagen
                setTimeout(() => {
                    // Hacer aparecer la nueva imagen
                    heroImage.style.opacity = '1';
                    
                    // Permitir la siguiente transición después de completar
                    setTimeout(() => {
                        isTransitioning = false;
                    }, 500); // Duración de la transición de aparición
                }, 100); // Pausa entre desaparición y aparición
            };
            
            // Respaldo si la imagen ya está en caché y onload no se dispara
            setTimeout(() => {
                if (heroImage.style.opacity === '0') {
                    heroImage.src = vehicleImages[currentIndex];
                    heroImage.style.opacity = '1';
                    
                    setTimeout(() => {
                        isTransitioning = false;
                    }, 500);
                }
            }, 300);
        }, 500); // Duración de la transición de desvanecimiento
    }
    
    // Cambiar la imagen cada 3 segundos
    setInterval(changeImage, 3000);
});

// Mantener el código del botón WhatsApp separado
document.addEventListener('DOMContentLoaded', function() {
    const footerWhatsappButton = document.querySelector('.footer-whatsapp-button'); // Ajusta según tu HTML
    
    if (footerWhatsappButton) {
        footerWhatsappButton.addEventListener('click', function(event) {
            event.preventDefault();
            const phoneNumber = '50248494290';
            const message = "Hola, estoy interesado en los servicios de renta de autos. ¿Podrían brindarme más información?";
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }
});