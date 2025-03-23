const APP_VERSION = "1.2"; 
const storedVersion = localStorage.getItem('app_version');

if (storedVersion !== APP_VERSION) {
  localStorage.setItem('app_version', APP_VERSION);
  if (!sessionStorage.getItem('reloaded')) {
    sessionStorage.setItem('reloaded', 'true');
    setTimeout(() => window.location.reload(true), 100);
  }
} else {
  const navigationType = performance.getEntriesByType("navigation")[0]?.type;
  if (navigationType === "reload" && !sessionStorage.getItem('hardReload')) {
    sessionStorage.setItem('hardReload', 'true');
    window.location.reload(true);
  } else {
    sessionStorage.removeItem('hardReload');
  }
}


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
    // Array of vehicle images to rotate
    const vehicleImages = [
        './img/transition1-hilux.png',
        './img/transition2-fortuner.png',
        './img/transition4-stavia.png', 
        './img/transition5-kicks.png'
    ];
    
    // Select the hero image
    const heroImage = document.querySelector('.hero__image-container img');
    let currentIndex = 0;
    let isTransitioning = false;
    
    // Preload images to avoid flickering
    const preloadImages = () => {
        vehicleImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    };
    
    // Preload images at startup
    preloadImages();
    
    // Function to change image with a smooth transition
    function changeImage() {
        // Prevent multiple transitions at once
        if (isTransitioning) return;
        isTransitioning = true;
        
        // Apply fade out
        heroImage.style.opacity = 0;
        
        // Change the image after the fade out is complete
        setTimeout(() => {
            // Update index and change the image source
            currentIndex = (currentIndex + 1) % vehicleImages.length;
            heroImage.src = vehicleImages[currentIndex];
            
            // Wait for the new image to load before fading in
            heroImage.onload = function() {
                // Apply fade in
                heroImage.style.opacity = 1;
                
                // Reset transition flag after fade in is complete
                setTimeout(() => {
                    isTransitioning = false;
                }, 500);
            };
            
            // Backup in case the image is already cached and onload doesn't fire
            setTimeout(() => {
                heroImage.style.opacity = 1;
                isTransitioning = false;
            }, 100);
        }, 500); // This time should match your CSS transition duration
    }
    
    // Add transition style to the image
    heroImage.style.transition = 'opacity 0.5s ease-in-out';
    
    // Change the image every 5 seconds
    setInterval(changeImage, 2500);
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