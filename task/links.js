// Якорные ссылки для навигации
	document.addEventListener('DOMContentLoaded', function() {
   document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
          
          
          if (window.innerWidth <= 992) {
            document.getElementById('mobileBackdrop').classList.remove('show');
            document.body.classList.remove('mobile-menu-open');
            document.querySelector('.navbar-toggler').click();
          }
        }
      }
    });
  });

  
  document.querySelector('.hero__btn--primary').addEventListener('click', function(e) {
    e.preventDefault();
    const targetElement = document.querySelector('#booking');
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  });

  
  document.querySelector('.hero__btn--secondary').addEventListener('click', function(e) {
    e.preventDefault();
    const targetElement = document.querySelector('#specialties');
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  });

  
  const contactForm = document.querySelector('.contact__form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Здесь можно добавить код для отправки формы
      alert('Your message has been sent!');
      this.reset();
    });
  }
});


window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = '#' + section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentSection) {
      link.classList.add('active');
    }
  });
});