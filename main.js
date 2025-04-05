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
    let imagesLoaded = 0;
    
    // Función mejorada para precargar imágenes correctamente
    function preloadImages(callback) {
        const totalImages = vehicleImages.length;
        
        vehicleImages.forEach(src => {
            const img = new Image();
            img.onload = function() {
                imagesLoaded++;
                if (imagesLoaded === totalImages && callback) {
                    callback(); // Todas las imágenes han sido precargadas
                }
            };
            img.onerror = function() {
                imagesLoaded++;
                console.error('Error cargando imagen:', src);
                if (imagesLoaded === totalImages && callback) {
                    callback(); // Continuar incluso si hay errores
                }
            };
            img.src = src;
        });
    }
    
    // Configurar transición inicial
    if (heroImage) {
        heroImage.style.transition = 'opacity 0.5s ease-in-out';
        heroImage.style.opacity = '0'; // Comenzar invisible
        
        // Establecer la primera imagen y mostrarla solo cuando esté cargada
        const firstImage = new Image();
        firstImage.onload = function() {
            heroImage.src = firstImage.src;
            heroImage.style.opacity = '1';
        };
        firstImage.src = vehicleImages[0];
    }
    
    // Función mejorada para realizar la transición entre imágenes de manera confiable
    function transitionToNextImage() {
        if (isAnimating || !heroImage) return;
        isAnimating = true;
        
        // Fase 1: Fade out completo
        heroImage.style.opacity = '0';
        
        // Esperar a que termine el fade out
        setTimeout(() => {
            // Actualizar al siguiente índice
            currentIndex = (currentIndex + 1) % vehicleImages.length;
            
            // Crear una nueva imagen para asegurar un manejo correcto de eventos
            const nextImage = new Image();
            
            // Configurar el evento onload para hacer la transición solo cuando la imagen esté lista
            nextImage.onload = function() {
                // Cambiar la fuente de la imagen mientras está invisible
                heroImage.src = nextImage.src;
                
                // Fase 2: Fade in de la nueva imagen
                setTimeout(() => {
                    heroImage.style.opacity = '1';
                    
                    // Permitir la siguiente animación cuando termine el fade in
                    setTimeout(() => {
                        isAnimating = false;
                    }, 500);
                }, 50); // Reducimos este tiempo para una transición más fluida
            };
            
            // Iniciar la carga de la imagen
            nextImage.src = vehicleImages[currentIndex];
            
            // Si la imagen ya está en caché, el evento onload podría no dispararse
            if (nextImage.complete) {
                nextImage.onload();
            }
        }, 500);
    }
    
    // Iniciar el ciclo solo después de que las imágenes estén precargadas
    preloadImages(() => {
        setTimeout(() => {
            // Cambiar la imagen cada 3 segundos
            setInterval(transitionToNextImage, 3000);
        }, 1000);
    });
    
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