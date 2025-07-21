document.addEventListener('DOMContentLoaded', () => {
    console.log('menu.js: DOMContentLoaded triggered');
    fetchMenuItems();

    const navLinks = document.querySelectorAll('.menu__nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-section');
            console.log('menu.js: Clicking category:', category);
            fetchMenuItems(category);
            updateActiveNavLink(link);
        });
    });
});

async function fetchMenuItems(category = null) {
    try {
        const url = category ? `/api/menu?category=${encodeURIComponent(category)}` : '/api/menu';
        console.log('menu.js: Fetching menu from:', url);
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const items = await response.json();
        console.log('menu.js: Received items:', items);

        if (!Array.isArray(items)) {
            console.error('menu.js: Expected an array, received:', items);
            const messageContainer = document.querySelector('#messageContainer');
            if (messageContainer) {
                messageContainer.textContent = 'Ошибка загрузки меню. Пожалуйста, попробуйте позже.';
                messageContainer.style.color = 'red';
            }
            return;
        }

        const sections = document.querySelectorAll('.menu__section');
        sections.forEach(section => {
            section.classList.remove('menu__section--active');
            const grid = section.querySelector('.menu__grid');
            if (grid) grid.innerHTML = '';
        });

        if (!category) {
            const categories = ['soups', 'pizza', 'pasta', 'desserts', 'wine', 'beer', 'drinks'];
            categories.forEach(cat => {
                const section = document.querySelector(`#${cat}`);
                const grid = section.querySelector('.menu__grid');
                const categoryItems = items.filter(item => item.category === cat);
                if (categoryItems.length > 0) {
                    section.classList.add('menu__section--active');
                    categoryItems.forEach(item => {
                        const price = isNaN(parseFloat(item.price)) ? '0.00' : parseFloat(item.price).toFixed(2);
                        console.log('menu.js: Processing item:', { title: item.title, price: item.price, parsedPrice: price });
                        const menuItem = `
                            <div class="menu__item">
                                <h3 class="menu__item-title">
                                    ${item.title}
                                    <span class="menu__item-price">$${price}</span>
                                </h3>
                                <p class="menu__item-description">${item.subtitle || ''}</p>
                            </div>
                        `;
                        grid.insertAdjacentHTML('beforeend', menuItem);
                    });
                }
            });
        } else {
            const section = document.querySelector(`#${category}`);
            const grid = section.querySelector('.menu__grid');
            section.classList.add('menu__section--active');
            items.forEach(item => {
                const price = isNaN(parseFloat(item.price)) ? '0.00' : parseFloat(item.price).toFixed(2);
                console.log('menu.js: Processing item:', { title: item.title, price: item.price, parsedPrice: price });
                const menuItem = `
                    <div class="menu__item">
                        <h3 class="menu__item-title">
                            ${item.title}
                            <span class="menu__item-price">$${price}</span>
                        </h3>
                        <p class="menu__item-description">${item.subtitle || ''}</p>
                    </div>
                `;
                grid.insertAdjacentHTML('beforeend', menuItem);
            });
        }
    } catch (error) {
        console.error('menu.js: Ошибка при загрузке меню:', error);
        const messageContainer = document.querySelector('#messageContainer');
        if (messageContainer) {
            messageContainer.textContent = 'Ошибка загрузки меню. Пожалуйста, попробуйте позже.';
            messageContainer.style.color = 'red';
        }
    }
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.menu__nav-link');
    navLinks.forEach(link => link.classList.remove('menu__nav-link--active'));
    activeLink.classList.add('menu__nav-link--active');
}