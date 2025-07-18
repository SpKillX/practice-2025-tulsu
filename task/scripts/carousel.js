// Карусель (без Slick Carousel, т. к. ломается вёрстка)
    document.addEventListener('DOMContentLoaded', function() {
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentIndex = 0;
    let interval;

    function goToSlide(index) {
        items.forEach(item => {
            item.style.opacity = '0';
            item.style.display = 'none';
        });
        
        items[index].style.display = 'block';
        setTimeout(() => {
            items[index].style.opacity = '1';
        }, 10);
        
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        currentIndex = index;
    }

    function startAutoPlay() {
        interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % items.length;
            goToSlide(nextIndex);
        }, 3000);
    }

    function initCarousel() {
        // Скрываем все слайды кроме первого
        items.forEach((item, index) => {
            item.style.transition = 'opacity 0.5s ease';
            if (index !== 0) {
                item.style.display = 'none';
                item.style.opacity = '0';
            } else {
                item.style.display = 'block';
                item.style.opacity = '1';
            }
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(interval);
                goToSlide(index);
                startAutoPlay();
            });
        });
        
        startAutoPlay();
    }

    initCarousel();
});