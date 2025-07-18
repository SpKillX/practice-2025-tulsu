 const categories = ['Soups', 'Pizza', 'Pasta', 'Desserts', 'Wine', 'Beer', 'Drinks'];
    categories.forEach(category => {
        $.ajax({
            url: `/api/menu/${category}`,
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                if (response.success && response.data.length > 0) {
                    const $section = $(`#menu-${category.toLowerCase()}`);
                    $section.find('.menu__grid').empty();
                    response.data.forEach(item => {
                        $section.find('.menu__grid').append(`
                            <div class="menu__item">
                                <h4 class="menu__item-title">
                                    ${item.title}
                                    <span class="menu__item-price">$${item.price}</span>
                                </h4>
                                <p class="menu__item-description">${item.subtitle}</p>
                            </div>
                        `);
                    });
                }
            },
            error: function() {
                console.error(`Error loading ${category} menu data`);
            }
        });
    });
