document.addEventListener('DOMContentLoaded', () => {
    fetchAboutContent();

    const updateAboutButton = document.querySelector('#update-about-btn');
    if (updateAboutButton) {
        updateAboutButton.addEventListener('click', updateAboutContent);
    }
});

async function fetchAboutContent() {
    try {
        const response = await fetch('/api/about');
        const data = await response.json();
        
        document.querySelector('.about__title').textContent = data.title;
        document.querySelector('.about__intro').textContent = data.subtitle;
        document.querySelector('.about__description').textContent = data.text;
        document.querySelector('.about__main-image').src = data.image;
    } catch (error) {
        console.error('Error fetching about content:', error);
    }
}

async function updateAboutContent() {
    const title = prompt('Enter new about title:');
    const subtitle = prompt('Enter new about subtitle:');
    const text = prompt('Enter new about description:');
    const image = prompt('Enter new about image URL:');

    try {
        const response = await fetch('/api/about', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, subtitle, text, image })
        });

        if (response.ok) {
            alert('About content updated successfully!');
            fetchAboutContent();
        } else {
            alert('Failed to update about content');
        }
    } catch (error) {
        console.error('Error updating about content:', error);
        alert('Error updating about content');
    }
}