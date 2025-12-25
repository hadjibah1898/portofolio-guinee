// Global variables
let slideIndex = [];
let wordIndex = 0, charIndex = 0;
const words = ["Développeur Full-Stack MERN", "Créateur d’applications Web", "Passionné de technologie"];

// --- Function declarations ---

function type() {
  const typingText = document.querySelector('.typing');
  if (!typingText) return;
  if (charIndex < words[wordIndex].length) {
    typingText.textContent += words[wordIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
    const typingText = document.querySelector('.typing');
    if (!typingText) return;
    if (charIndex > 0) {
        typingText.textContent = words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 300);
    }
}

function showNotification(message, isError = false) {
    const notification = document.getElementById('notification');
    if (!notification) return;
    notification.textContent = message;
    notification.classList.add('show');
    if (isError) {
        notification.classList.add('error');
    }

    setTimeout(() => {
        notification.classList.remove('show');
        if (isError) {
            notification.classList.remove('error');
        }
    }, 3000);
}

function showSlides(n, no) {
  let i;
  let slideshows = document.getElementsByClassName("slideshow-container");
  if (!slideshows || slideshows.length <= no) return;
  let slides = slideshows[no].getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex[no] = 1}
  if (n < 1) {slideIndex[no] = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  if (slides.length > 0 && slides[slideIndex[no]-1]) {
      slides[slideIndex[no]-1].style.display = "block";
  }
}

function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}
// Expose plusSlides to the global scope for onclick attributes
window.plusSlides = plusSlides;


// --- Main execution after DOM is loaded ---

document.addEventListener("DOMContentLoaded", function() {

    // Animation d'apparition (Fade + Zoom)
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Effet d'écriture
    type();

    // Menu hamburger
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');

    if (hamburger && navMenu) {
        function closeMenu() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });
    }

    // Formulaire
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // IDs from EmailJS
            const serviceID = 'service_swco486';
            const templateID = 'template_u6bkyie';
            const publicKey = '7VlYLJiSoP_C19nrg';
            emailjs.sendForm(serviceID, templateID, this, publicKey)
                .then(() => {
                    showNotification('Message envoyé avec succès !');
                    contactForm.reset();
                }, (err) => {
                    showNotification('Une erreur s\'est produite. Veuillez réessayer.', true);
                    console.error('ERREUR...', err);
                });
        });
    }

    // Slideshow initialization
    let slideshows = document.getElementsByClassName("slideshow-container");
    for (let i = 0; i < slideshows.length; i++) {
      slideIndex.push(1);
      showSlides(1, i);
    }
});