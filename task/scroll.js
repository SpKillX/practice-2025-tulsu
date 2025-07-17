       window.addEventListener('scroll', function() {
      const header = document.getElementById('main-header');
      const scrollY = window.scrollY;
      
      if (window.innerWidth > 992) {
        header.classList.toggle('header--fixed', scrollY > 50);
      } else {
        header.classList.toggle('header--scrolled', scrollY > 20);
      }
    });
    
      const navbarToggler = document.querySelector('.navbar-toggler');
    const mobileBackdrop = document.getElementById('mobileBackdrop');
    const body = document.body;
    
    navbarToggler.addEventListener('click', function() {
      mobileBackdrop.classList.toggle('show');
      body.classList.toggle('mobile-menu-open');
    });
    
    mobileBackdrop.addEventListener('click', function() {
      this.classList.remove('show');
      body.classList.remove('mobile-menu-open');
      const navbarCollapse = document.querySelector('.navbar-collapse.show');
      if (navbarCollapse) navbarToggler.click();
    });
    
       document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 992) {
          mobileBackdrop.classList.remove('show');
          body.classList.remove('mobile-menu-open');
          document.querySelector('.navbar-toggler').click();
        }
      });
    });
    
      document.querySelector('.hero__scroll-circle').addEventListener('click', function() {
      window.scrollBy({
        top: window.innerHeight - 100,
        behavior: 'smooth'
      });
    });
    
       document.addEventListener('DOMContentLoaded', function() {
      
      const navLinks = document.querySelectorAll('.menu__nav-link');
      const menuSections = document.querySelectorAll('.menu__section');
      

      navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          
                    navLinks.forEach(l => l.classList.remove('menu__nav-link--active'));
          menuSections.forEach(s => s.classList.remove('menu__section--active'));
          
          this.classList.add('menu__nav-link--active');
          
          
          const sectionId = this.getAttribute('data-section');
          document.getElementById(sectionId).classList.add('menu__section--active');
        });
      });
    });