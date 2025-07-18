// Соц. сети
   document.addEventListener('DOMContentLoaded', function() {
   const socialLinks = document.querySelectorAll('.social__link');
  
   socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
           const icon = this.querySelector('i');
      let socialUrl;
      
      switch(icon.classList[1]) {
        case 'fa-facebook-f':
          socialUrl = 'https://facebook.com';
          break;
        case 'fa-twitter':
          socialUrl = 'https://twitter.com';
          break;
        case 'fa-instagram':
          socialUrl = 'https://instagram.com';
          break;
        default:
          socialUrl = 'https://example.com';
      }
      
          window.open(socialUrl, '_blank');
    });
  });
});
