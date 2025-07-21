document.addEventListener('DOMContentLoaded', () => {
    fetchSpecialtiesContent();

    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            setActiveCarouselItem(index);
        });
    });
});

async function fetchSpecialtiesContent() {
    try {
        const response = await fetch('/api/specialties');
        const data = await response.json();
        
        const carouselInner = document.querySelector('.carousel-inner');
        carouselInner.innerHTML = '';

        data.forEach((item, index) => {
            const isActive = index === 0 ? 'active' : '';
            const carouselItem = `
                <div class="carousel-item ${isActive}">
                    <div class="specialties__content">
                        <div class="specialties__image-wrapper">
                            <div class="specialties__image">
                                <img src="${item.image}" alt="${item.title}" class="specialties__main-image">
                                <div class="specialties__square"></div>
                            </div>
                        </div>
                        <div class="specialties__text-wrapper">
                            <div class="specialties__text">
                                <h2 class="specialties__title">${item.title}</h2>
                                <p class="specialties__intro">${item.subtitle}</p>
                                <p class="specialties__description">${item.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            carouselInner.insertAdjacentHTML('beforeend', carouselItem);
        });

        const dotsContainer = document.querySelector('.carousel-controls');
        dotsContainer.innerHTML = '';
        data.forEach((_, index) => {
            const isActive = index === 0 ? 'active' : '';
            const dot = `<div class="carousel-dot ${isActive}" data-index="${index}"></div>`;
            dotsContainer.insertAdjacentHTML('beforeend', dot);
        });

        const newDots = document.querySelectorAll('.carousel-dot');
        newDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                setActiveCarouselItem(index);
            });
        });
    } catch (error) {
        console.error('Error fetching specialties content:', error);
    }
}

function setActiveCarouselItem(index) {
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.carousel-dot');

    items.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    items[index].classList.add('active');
    dots[index].classList.add('active');
}