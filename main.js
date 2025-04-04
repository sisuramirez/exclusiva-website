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
    let isAnimating = false;
    
    // Precargar imágenes para evitar parpadeos y recargas
    function preloadImages() {
        const preloadedImages = [];
        vehicleImages.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = () => console.log(`Imagen precargada: ${src}`);
            preloadedImages.push(img);
        });
        return preloadedImages;
    }
    
    // Iniciar precarga
    const preloadedImages = preloadImages();
    
    // Asegurarnos que la primera imagen está cargada antes de iniciar
    if (heroImage) {
        heroImage.onload = () => {
            console.log('Imagen inicial cargada');
            heroImage.style.transition = 'opacity 0.5s ease-in-out';
            heroImage.style.opacity = '1';
            
            // Iniciar el ciclo de transición después de que la primera imagen esté cargada
            setTimeout(() => {
                // Cambiar la imagen cada 3 segundos
                setInterval(transitionToNextImage, 3000);
            }, 1000);
        };
        
        // Asegurar que la imagen inicial está establecida correctamente
        if (!heroImage.complete) {
            heroImage.src = vehicleImages[0];
        }
    }
    
    // Función para realizar la transición entre imágenes - con solución para Chrome
    function transitionToNextImage() {
        if (isAnimating || !heroImage) return;
        isAnimating = true;
        
        // Calcular el próximo índice antes de la animación
        const nextIndex = (currentIndex + 1) % vehicleImages.length;
        const nextImage = preloadedImages[nextIndex].src;
        
        // Fase 1: Fade out
        heroImage.style.opacity = '0';
        
        setTimeout(() => {
            // Cambiar la fuente de la imagen mientras está invisible
            // Usar una URL diferente para evitar la recarga de la misma imagen
            heroImage.src = nextImage;
            currentIndex = nextIndex;
            
            // Fase 2: Fade in
            setTimeout(() => {
                heroImage.style.opacity = '1';
                
                // Permitir la siguiente animación cuando termine el fade in
                setTimeout(() => {
                    isAnimating = false;
                }, 500);
            }, 100);
        }, 500);
    }
    
    // Mantener el código del botón WhatsApp separado
    const footerWhatsappButton = document.querySelector('.footer-whatsapp-button');
    
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