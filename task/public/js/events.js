document.addEventListener('DOMContentLoaded', () => {
    console.log('events.js: DOMContentLoaded triggered');

    function findEventsGrid() {
        const eventsSection = document.querySelector('#events');
        const eventsGrid = document.querySelector('#events__grid');
        if (!eventsSection) {
            console.error('events.js: #events section not found');
            return null;
        }
        if (!eventsGrid) {
            console.error('events.js: #events__grid not found in #events section');
            return null;
        }
        return eventsGrid;
    }

    async function fetchEvents() {
        const eventsGrid = findEventsGrid();
        if (!eventsGrid) {
            console.warn('events.js: Retrying to find #events__grid in 1 second');
            setTimeout(fetchEvents, 1000);
            return;
        }

        try {
            const response = await fetch('/api/events', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const result = await response.json();
            console.log('events.js: Fetch events response:', result);

            if (response.ok && result.events) {
                renderEvents(result.events, eventsGrid);
            } else {
                console.error('events.js: Failed to fetch events:', result.error);
                eventsGrid.innerHTML = '<p class="events__error">Ошибка загрузки мероприятий</p>';
            }
        } catch (error) {
            console.error('events.js: Fetch events error:', error);
            eventsGrid.innerHTML = '<p class="events__error">Ошибка загрузки мероприятий</p>';
        }
    }

    function renderEvents(events, eventsGrid) {
        eventsGrid.innerHTML = '';
        const pairDiv = document.createElement('div');
        pairDiv.className = 'events__pair';

        events.forEach((event, index) => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'events__card';

            const position = index % 2 === 0 ? 'left' : 'right';
            const imageContainer = document.createElement('div');
            imageContainer.className = `events__image-container events__image-container--${position}`;

            const img = document.createElement('img');
            img.src = event.image;
            img.alt = event.title;
            img.className = 'events__image';

            const square = document.createElement('div');
            square.className = `events__square events__square--${position}`;

            const labelBox = document.createElement('div');
            labelBox.className = `events__label-box events__label-box--${position}`;

            const label = document.createElement('p');
            label.className = `events__label events__label--${event.title.toLowerCase().replace(/\s+/g, '-')}`;
            label.textContent = event.title;

            imageContainer.appendChild(img);
            imageContainer.appendChild(square);
            labelBox.appendChild(label);

            if (position === 'left') {
                cardDiv.appendChild(imageContainer);
                cardDiv.appendChild(labelBox);
            } else {
                cardDiv.appendChild(labelBox);
                cardDiv.appendChild(imageContainer);
            }

            pairDiv.appendChild(cardDiv);
        });

        eventsGrid.appendChild(pairDiv);
        console.log('events.js: Rendered', events.length, 'events');
    }

    fetchEvents();
});