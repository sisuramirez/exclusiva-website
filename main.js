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
    let nextIndex = 1;
    let isTransitioning = false;
    
    // Precargar todas las imágenes para evitar parpadeos
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
    
    // Crear un segundo elemento de imagen para la transición
    function setupDualImageSystem() {
        // Obtener el contenedor
        const container = document.querySelector('.hero__image-container');
        
        // Verificar si la imagen actual existe
        if (!heroImage) return;
        
        // Estilo del contenedor
        container.style.position = 'relative';
        
        // Configurar imagen actual
        heroImage.style.position = 'absolute';
        heroImage.style.top = '0';
        heroImage.style.left = '0';
        heroImage.style.transition = 'opacity 0.8s ease-in-out';
        heroImage.style.opacity = '1';
        heroImage.style.zIndex = '1';
        
        // Crear la segunda imagen para la transición
        const secondImage = document.createElement('img');
        secondImage.src = vehicleImages[nextIndex];
        secondImage.style.position = 'absolute';
        secondImage.style.top = '0';
        secondImage.style.left = '0';
        secondImage.style.width = '100%';
        secondImage.style.height = '100%';
        secondImage.style.objectFit = 'cover';
        secondImage.style.transition = 'opacity 0.8s ease-in-out';
        secondImage.style.opacity = '0';
        secondImage.style.zIndex = '0';
        
        // Añadir la segunda imagen al contenedor
        container.appendChild(secondImage);
        
        return { mainImage: heroImage, secondImage };
    }
    
    // Precargar imágenes
    const preloadedImages = preloadImages();
    
    // Configurar el sistema de imágenes duales
    const { mainImage, secondImage } = setupDualImageSystem();
    
    // Función para cambiar la imagen con una transición suave
    function changeImage() {
        // Evitar múltiples transiciones a la vez
        if (isTransitioning) return;
        isTransitioning = true;
        
        // Calcular el siguiente índice
        nextIndex = (currentIndex + 1) % vehicleImages.length;
        
        // Preparar la siguiente imagen (en la capa inferior)
        secondImage.src = vehicleImages[nextIndex];
        secondImage.style.zIndex = '0';
        mainImage.style.zIndex = '1';
        
        // Asegurarse de que la siguiente imagen esté cargada
        secondImage.onload = function() {
            // Desvanecer la imagen actual
            mainImage.style.opacity = '0';
            // Mostrar la nueva imagen
            secondImage.style.opacity = '1';
            
            // Después de completar la transición
            setTimeout(() => {
                // Intercambiar roles de las imágenes
                [mainImage.style.zIndex, secondImage.style.zIndex] = 
                [secondImage.style.zIndex, mainImage.style.zIndex];
                
                // Actualizar imagen principal para el próximo ciclo
                mainImage.src = vehicleImages[nextIndex];
                mainImage.style.opacity = '1';
                
                // Ocultar segunda imagen para el próximo ciclo
                secondImage.style.opacity = '0';
                
                // Actualizar índice actual
                currentIndex = nextIndex;
                
                // Permitir la próxima transición
                isTransitioning = false;
            }, 800); // Debe coincidir con la duración de la transición CSS
        };
        
        // Respaldo en caso de que la imagen ya esté en caché
        setTimeout(() => {
            if (isTransitioning) {
                mainImage.style.opacity = '0';
                secondImage.style.opacity = '1';
                
                setTimeout(() => {
                    [mainImage.style.zIndex, secondImage.style.zIndex] = 
                    [secondImage.style.zIndex, mainImage.style.zIndex];
                    
                    mainImage.src = vehicleImages[nextIndex];
                    mainImage.style.opacity = '1';
                    secondImage.style.opacity = '0';
                    
                    currentIndex = nextIndex;
                    isTransitioning = false;
                }, 800);
            }
        }, 100);
    }
    
    // Cambiar la imagen cada 3 segundos
    setInterval(changeImage, 3000);
});

// Código para el botón de WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    const footerWhatsappButton = document.querySelector('.footer-whatsapp-button'); // Ajusta el selector según tu HTML
    
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