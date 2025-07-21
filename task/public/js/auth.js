document.addEventListener('DOMContentLoaded', () => {
    console.log('auth.js: DOMContentLoaded triggered');

    const authModal = document.querySelector('#authModal');
    const loginForm = document.querySelector('#loginForm');
    const registerForm = document.querySelector('#registerForm');
    const forgotForm = document.querySelector('#forgotForm');
    const codeForm = document.querySelector('#codeForm');
    const newPasswordForm = document.querySelector('#newPasswordForm');
    const authMessage = document.querySelector('#authMessage');
    const closeBtn = document.querySelector('.auth-close');
    const showRegister = document.querySelector('#showRegister');
    const showLogin = document.querySelector('#showLogin');
    const showForgot = document.querySelector('#showForgot');
    const showLoginFromForgot = document.querySelector('#showLoginFromForgot');
    const loginBtn = document.querySelector('#loginBtn');
    const registerBtn = document.querySelector('#registerBtn');
    const sendCodeBtn = document.querySelector('#sendCodeBtn');
    const verifyCodeBtn = document.querySelector('#verifyCodeBtn');
    const savePasswordBtn = document.querySelector('#savePasswordBtn');
    const showAuthModalBtn = document.querySelector('#showAuthModal');
    const logoutBtn = document.querySelector('#logoutBtn');

    let resetEmail = '';

    if (!authModal || !loginForm || !registerForm || !forgotForm || !codeForm || !newPasswordForm || !authMessage) {
        console.error('auth.js: Missing required DOM elements');
        return;
    }

    const user = localStorage.getItem('user');
    if (user && showAuthModalBtn) {
        showAuthModalBtn.textContent = 'Вошли';
        if (logoutBtn) logoutBtn.style.display = 'block';
    } else if (showAuthModalBtn) {
        showAuthModalBtn.textContent = 'Вход/Регистрация';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }

    function showForm(form) {
        [loginForm, registerForm, forgotForm, codeForm, newPasswordForm].forEach(f => {
            f.style.display = 'none';
        });
        form.style.display = 'block';
        authMessage.textContent = '';
        console.log('auth.js: Showing form:', form.id);
    }

    function clearFormInputs(form) {
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => input.value = '');
        console.log('auth.js: Cleared inputs for form:', form.id);
    }

    if (showAuthModalBtn) {
        showAuthModalBtn.addEventListener('click', () => {
            if (localStorage.getItem('user')) {
                console.log('auth.js: User already logged in, ignoring modal');
                return;
            }
            authModal.style.display = 'block';
            showForm(loginForm);
        });
    } else {
        console.warn('auth.js: showAuthModalBtn not found');
    }

    closeBtn.addEventListener('click', () => {
        authModal.style.display = 'none';
        showForm(loginForm);
        [loginForm, registerForm, forgotForm, codeForm, newPasswordForm].forEach(clearFormInputs);
        authMessage.textContent = '';
        resetEmail = '';
        console.log('auth.js: Modal closed');
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('user');
            showAuthModalBtn.textContent = 'Вход/Регистрация';
            logoutBtn.style.display = 'none';
            console.log('auth.js: User logged out');
        });
    } else {
        console.warn('auth.js: logoutBtn not found');
    }

    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        showForm(registerForm);
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        showForm(loginForm);
    });

    showForgot.addEventListener('click', (e) => {
        e.preventDefault();
        showForm(forgotForm);
    });

    showLoginFromForgot.addEventListener('click', (e) => {
        e.preventDefault();
        showForm(loginForm);
    });

    async function performLogin(email, password) {
        console.log('auth.js: Login attempt:', { email });
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const result = await response.json();
            console.log('auth.js: Login response:', result);

            if (response.ok) {
                authMessage.textContent = 'Вход выполнен успешно!';
                authMessage.style.color = 'green';
                clearFormInputs(loginForm);
                authModal.style.display = 'none';
                localStorage.setItem('user', JSON.stringify(result.user));
                if (showAuthModalBtn) showAuthModalBtn.textContent = 'Вошли';
                if (logoutBtn) logoutBtn.style.display = 'block';
                console.log('auth.js: User data stored in localStorage:', result.user);
                return true;
            } else {
                authMessage.textContent = result.error || 'Ошибка входа';
                authMessage.style.color = 'red';
                return false;
            }
        } catch (error) {
            console.error('auth.js: Login error:', error);
            authMessage.textContent = 'Ошибка при входе';
            authMessage.style.color = 'red';
            return false;
        }
    }

    loginBtn.addEventListener('click', async () => {
        const email = document.querySelector('#loginEmail').value.trim();
        const password = document.querySelector('#loginPassword').value.trim();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            authMessage.textContent = 'Пожалуйста, введите корректный email';
            authMessage.style.color = 'red';
            return;
        }
        if (!password) {
            authMessage.textContent = 'Пожалуйста, введите пароль';
            authMessage.style.color = 'red';
            return;
        }

        await performLogin(email, password);
    });

    registerBtn.addEventListener('click', async () => {
        const name = document.querySelector('#regName').value.trim();
        const email = document.querySelector('#regEmail').value.trim();
        const phone = document.querySelector('#regPhone').value.trim();
        const password = document.querySelector('#regPassword').value.trim();
        const confirmPassword = document.querySelector('#regConfirm').value.trim();

        console.log('auth.js: Register attempt:', { name, email, phone });

        if (!name) {
            authMessage.textContent = 'Пожалуйста, введите ваше имя';
            authMessage.style.color = 'red';
            return;
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            authMessage.textContent = 'Пожалуйста, введите корректный email';
            authMessage.style.color = 'red';
            return;
        }
        if (!phone || !/^\+?\d{10,15}$/.test(phone)) {
            authMessage.textContent = 'Пожалуйста, введите корректный номер телефона';
            authMessage.style.color = 'red';
            return;
        }
        if (!password || password.length < 6) {
            authMessage.textContent = 'Пароль должен содержать минимум 6 символов';
            authMessage.style.color = 'red';
            return;
        }
        if (password !== confirmPassword) {
            authMessage.textContent = 'Пароли не совпадают';
            authMessage.style.color = 'red';
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ full_name: name, email, phone, password })
            });
            const result = await response.json();
            console.log('auth.js: Register response:', result);

            if (response.ok) {
                authMessage.textContent = 'Регистрация успешна!';
                authMessage.style.color = 'green';
                clearFormInputs(registerForm);
                const loginSuccess = await performLogin(email, password);
                if (!loginSuccess) {
                    showForm(loginForm);
                }
            } else {
                authMessage.textContent = result.error || 'Ошибка регистрации';
                authMessage.style.color = 'red';
            }
        } catch (error) {
            console.error('auth.js: Register error:', error);
            authMessage.textContent = 'Ошибка при регистрации';
            authMessage.style.color = 'red';
        }
    });

    sendCodeBtn.addEventListener('click', async () => {
        resetEmail = document.querySelector('#forgotEmail').value.trim();
        console.log('auth.js: Password reset request for:', resetEmail);

        if (!resetEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resetEmail)) {
            authMessage.textContent = 'Пожалуйста, введите корректный email';
            authMessage.style.color = 'red';
            return;
        }

        try {
            const response = await fetch('/api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: resetEmail })
            });
            const result = await response.json();
            console.log('auth.js: Password reset response:', result);

            if (response.ok) {
                authMessage.textContent = 'Код сброса отправлен! (Проверьте консоль)';
                authMessage.style.color = 'green';
                console.log('auth.js: Password reset code for', resetEmail, ':', result.code);
                clearFormInputs(forgotForm);
                showForm(codeForm);
            } else {
                authMessage.textContent = result.error || 'Ошибка отправки кода';
                authMessage.style.color = 'red';
            }
        } catch (error) {
            console.error('auth.js: Password reset request error:', error);
            authMessage.textContent = 'Ошибка при запросе сброса пароля';
            authMessage.style.color = 'red';
        }
    });

    verifyCodeBtn.addEventListener('click', async () => {
        const code = document.querySelector('#verifyCode').value.trim();
        console.log('auth.js: Verify code attempt for:', resetEmail, 'Code:', code);

        if (!code || !/^\d{6}$/.test(code)) {
            authMessage.textContent = 'Пожалуйста, введите 6-значный код';
            authMessage.style.color = 'red';
            return;
        }

        try {
            const response = await fetch('/api/verify-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: resetEmail, code })
            });
            const result = await response.json();
            console.log('auth.js: Verify code response:', result);

            if (response.ok) {
                authMessage.textContent = 'Код подтвержден!';
                authMessage.style.color = 'green';
                clearFormInputs(codeForm);
                showForm(newPasswordForm);
            } else {
                authMessage.textContent = result.error || 'Неверный или истекший код';
                authMessage.style.color = 'red';
            }
        } catch (error) {
            console.error('auth.js: Verify code error:', error);
            authMessage.textContent = 'Ошибка при проверке кода';
            authMessage.style.color = 'red';
        }
    });

    savePasswordBtn.addEventListener('click', async () => {
        const password = document.querySelector('#newPassword').value.trim();
        const confirmPassword = document.querySelector('#confirmNewPassword').value.trim();

        console.log('auth.js: Save new password attempt for:', resetEmail);

        if (!password || password.length < 6) {
            authMessage.textContent = 'Новый пароль должен содержать минимум 6 символов';
            authMessage.style.color = 'red';
            return;
        }
        if (password !== confirmPassword) {
            authMessage.textContent = 'Пароли не совпадают';
            authMessage.style.color = 'red';
            return;
        }

        try {
            const response = await fetch('/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: resetEmail, password })
            });
            const result = await response.json();
            console.log('auth.js: Reset password response:', result);

            if (response.ok) {
                authMessage.textContent = 'Пароль успешно сброшен!';
                authMessage.style.color = 'green';
                clearFormInputs(newPasswordForm);
                authModal.style.display = 'none';
                showForm(loginForm);
                resetEmail = '';
                await performLogin(resetEmail, password);
            } else {
                authMessage.textContent = result.error || 'Ошибка сброса пароля';
                authMessage.style.color = 'red';
            }
        } catch (error) {
            console.error('auth.js: Reset password error:', error);
            authMessage.textContent = 'Ошибка при сбросе пароля';
            authMessage.style.color = 'red';
        }
    });
});