$.ajax({
        url: '/api/specialties',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.success && response.data.length > 0) {
                const $carouselInner = $('.carousel-inner');
                $carouselInner.empty();
                response.data.forEach((item, index) => {
                    const isActive = index === 0 ? 'active' : '';
                    $carouselInner.append(`
                        <div class="carousel-item ${isActive}">
                            <div class="specialties__content">
                                <div class="specialties__image-wrapper">
                                    <div class="specialties__image">
                                        <img src="${item.image}" class="specialties__main-image" alt="${item.title}">
                                        <div class="specialties__square"></div>
                                    </div>
                                </div>
                                <div class="specialties__text-wrapper">
                                    <div class="specialties__text">
                                        <h3 class="specialties__title">${item.title}</h3>
                                        <p class="specialties__intro">${item.subtitle}</p>
                                        <p class="specialties__description">${item.text}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
                    $('.carousel-controls').append(`
                        <span class="carousel-dot ${isActive}"></span>
                    `);
                });
                initCarousel(); // Инициализация карусели из вашего исходного scripts.js
            }
        },
        error: function() {
            console.error('Error loading Specialties data');
        }
    });