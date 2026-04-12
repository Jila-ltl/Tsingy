class LoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.posteSelect = document.getElementById('poste');
        this.passwordInput = document.getElementById('password');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.submitButton = this.form.querySelector('.login-btn');
        this.successMessage = document.getElementById('successMessage');

        this.init();
    }

    init() {
        this.bindEvents();
        this.setupPasswordToggle();
        this.setupRippleEffects();
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        this.posteSelect.addEventListener('change', () => this.validatePoste());
        this.passwordInput.addEventListener('blur', () => this.validatePassword());

        this.passwordInput.addEventListener('input', () => this.clearError('password'));
    }

    setupRippleEffects() {
        this.submitButton.addEventListener('click', (e) => {
            const rippleContainer = this.submitButton.querySelector('.btn-ripple');
            this.createRipple(e, rippleContainer);
        });
    }

    createRipple(event, container) {
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const ripple = document.createElement('div');
        ripple.className = 'ripple';

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        container.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    validatePoste() {
        const poste = this.posteSelect.value;

        if (!poste) {
            this.showError('poste', 'Veuillez choisir un poste');
            return false;
        }

        this.clearError('poste');
        return true;
    }

    validatePassword() {
        const password = this.passwordInput.value;

        if (!password) {
            this.showError('password', 'Mot de passe requis');
            return false;
        }

        if (password.length < 4) {
            this.showError('password', 'Mot de passe trop court');
            return false;
        }

        this.clearError('password');
        return true;
    }

    showError(field, message) {
        const input = document.getElementById(field);
        const formGroup = input.closest('.form-group');
        const errorElement = document.getElementById(field + 'Error');

        if (!errorElement) return;

        formGroup.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    clearError(field) {
        const input = document.getElementById(field);
        const formGroup = input.closest('.form-group');
        const errorElement = document.getElementById(field + 'Error');

        if (!errorElement) return;

        formGroup.classList.remove('error');
        errorElement.classList.remove('show');

        setTimeout(() => {
            errorElement.textContent = '';
        }, 200);
    }

    async handleSubmit(e) {
        e.preventDefault();

        const isPosteValid = this.validatePoste();
        const isPasswordValid = this.validatePassword();

        if (!isPosteValid || !isPasswordValid) {
            this.submitButton.style.animation = 'materialPulse 0.3s ease';
            setTimeout(() => {
                this.submitButton.style.animation = '';
            }, 300);
            return;
        }

        this.setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            this.showSuccess();

        } catch (error) {
            this.showError('password', 'Connexion échouée');
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(loading) {
        this.submitButton.classList.toggle('loading', loading);
        this.submitButton.disabled = loading;
    }

    showSuccess() {
        this.form.style.display = 'none';
        document.querySelector('.signup-link').style.display = 'none';

        this.successMessage.classList.add('show');

        setTimeout(() => {
            console.log('Redirection vers dashboard...');
            // window.location.href = "dashboard.html";
        }, 2000);
    }
}

// Animations Material
if (!document.querySelector('#material-keyframes')) {
    const style = document.createElement('style');
    style.id = 'material-keyframes';

    style.textContent = `
        @keyframes materialPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
    `;

    document.head.appendChild(style);
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    new LoginForm();
});