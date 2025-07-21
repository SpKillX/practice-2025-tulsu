document.addEventListener('DOMContentLoaded', () => {
    console.log('contact.js: DOMContentLoaded triggered');
    const contactForm = document.querySelector('.contact__form');
    const messageContainer = document.querySelector('#contactMessageContainer');

    if (!contactForm) {
        console.error('contact.js: Contact form not found');
        if (messageContainer) {
            messageContainer.textContent = 'Форма контактов не найдена. Проверьте страницу.';
            messageContainer.style.color = 'red';
        }
        return;
    }

    if (!messageContainer) {
        console.error('contact.js: Message container not found');
        return;
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('contact.js: Form submitted');
        messageContainer.textContent = '';

        const nameInput = contactForm.querySelector('#name');
        const emailInput = contactForm.querySelector('#email');
        const phoneInput = contactForm.querySelector('#phone');
        const messageInput = contactForm.querySelector('#message');

        if (!nameInput || !emailInput || !phoneInput || !messageInput) {
            console.error('contact.js: One or more form inputs not found');
            messageContainer.textContent = 'Ошибка формы. Проверьте элементы формы.';
            messageContainer.style.color = 'red';
            return;
        }

        const data = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            message: messageInput.value.trim()
        };

        console.log('contact.js: Input values:', data);

        if (data.name.length === 0) {
            messageContainer.textContent = 'Имя обязательно для заполнения';
            messageContainer.style.color = 'red';
            return;
        }
        if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            messageContainer.textContent = 'Требуется действительный email';
            messageContainer.style.color = 'red';
            return;
        }
        if (!data.phone || !/^\+?\d{10,15}$/.test(data.phone)) {
            messageContainer.textContent = 'Требуется действительный номер телефона';
            messageContainer.style.color = 'red';
            return;
        }
        if (data.message.length === 0) {
            messageContainer.textContent = 'Сообщение обязательно для заполнения';
            messageContainer.style.color = 'red';
            return;
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                messageContainer.textContent = 'Сообщение успешно отправлено!';
                messageContainer.style.color = 'green';
                contactForm.reset();
            } else {
                messageContainer.textContent = result.error || 'Не удалось отправить сообщение';
                messageContainer.style.color = 'red';
            }
        } catch (error) {
            console.error('contact.js: Ошибка при отправке сообщения:', error);
            messageContainer.textContent = 'Ошибка при отправке сообщения';
            messageContainer.style.color = 'red';
        }
    });
});