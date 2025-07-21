document.addEventListener('DOMContentLoaded', () => {
    console.log('team.js: DOMContentLoaded triggered');
    fetchTeamData();
});

async function fetchTeamData() {
    try {
        console.log('team.js: Fetching team data from: /api/team');
        const response = await fetch('/api/team');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('team.js: Received team data:', data);

        if (!data || typeof data !== 'object') {
            console.error('team.js: Expected an object, received:', data);
            displayError('Ошибка загрузки данных команды. Пожалуйста, попробуйте позже.');
            return;
        }

        const titleElement = document.querySelector('.team__title');
        const introElement = document.querySelector('.team__intro');
        const descriptionElement = document.querySelector('.team__description');
        const imageElement = document.querySelector('.team__main-image');

        console.log('team.js: DOM elements found:', {
            titleElement: !!titleElement,
            introElement: !!introElement,
            descriptionElement: !!descriptionElement,
            imageElement: !!imageElement
        });

        if (!titleElement || !introElement || !descriptionElement || !imageElement) {
            console.error('team.js: One or more DOM elements not found');
            displayError('Ошибка отображения данных команды. Проверьте структуру страницы.');
            return;
        }

        titleElement.textContent = data.title || 'Master Chef';
        introElement.textContent = data.subtitle || 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.';
        descriptionElement.textContent = data.text || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quidem quis necessitatibus nostrum voluptatem natus pariatur in.';
        if (data.image) {
            imageElement.src = data.image;
            console.log('team.js: Updated image src to:', data.image);
        }

        console.log('team.js: DOM updated successfully');

    } catch (error) {
        console.error('team.js: Ошибка при загрузке данных команды:', error);
        displayError('Ошибка при загрузке данных команды. Пожалуйста, попробуйте позже.');
    }
}

function displayError(message) {
    const messageContainer = document.querySelector('#messageContainer');
    if (messageContainer) {
        console.log('team.js: Displaying error message:', message);
        messageContainer.textContent = message;
        messageContainer.style.color = 'red';
    } else {
        console.error('team.js: Message container not found');
    }
}