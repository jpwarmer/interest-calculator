// Handle splash screen
window.addEventListener('load', () => {
    const splashScreen = document.getElementById('splash-screen');
    const container = document.querySelector('.container');
    
    setTimeout(() => {
        splashScreen.style.opacity = '0';
        container.classList.add('visible');
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Register service worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => console.log('ServiceWorker registered'))
            .catch(err => console.log('ServiceWorker registration failed: ', err));
    });
}

// Format number as currency
const formatCurrency = (number) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    }).format(number);
};

// Get all required DOM elements
const basePrice = document.getElementById('basePrice');
const rate1 = document.getElementById('rate1');
const rate3 = document.getElementById('rate3');
const rate6 = document.getElementById('rate6');
const cashDiscount = document.getElementById('cashDiscount');

const price1Element = document.getElementById('price1');
const price3Element = document.getElementById('price3');
const price6Element = document.getElementById('price6');
const cashPriceElement = document.getElementById('cashPrice');

// Load saved rates from localStorage
const loadSavedRates = () => {
    rate1.value = localStorage.getItem('rate1') || 5;
    rate3.value = localStorage.getItem('rate3') || 10;
    rate6.value = localStorage.getItem('rate6') || 20;
    cashDiscount.value = localStorage.getItem('cashDiscount') || 10;
};

// Save rates to localStorage
const saveRates = () => {
    localStorage.setItem('rate1', rate1.value);
    localStorage.setItem('rate3', rate3.value);
    localStorage.setItem('rate6', rate6.value);
    localStorage.setItem('cashDiscount', cashDiscount.value);
};

// Calculate and update all prices
const updatePrices = () => {
    const price = parseFloat(basePrice.value) || 0;
    const rate1Value = parseFloat(rate1.value) || 0;
    const rate3Value = parseFloat(rate3.value) || 0;
    const rate6Value = parseFloat(rate6.value) || 0;
    const cashDiscountValue = parseFloat(cashDiscount.value) || 0;

    // Calculate prices
    const price1Value = price * (1 + rate1Value / 100);
    const price3Value = price * (1 + rate3Value / 100);
    const price6Value = price * (1 + rate6Value / 100);
    const cashPriceValue = price * (1 - cashDiscountValue / 100);

    // Update display
    price1Element.textContent = formatCurrency(price1Value);
    price3Element.textContent = formatCurrency(price3Value);
    price6Element.textContent = formatCurrency(price6Value);
    cashPriceElement.textContent = formatCurrency(cashPriceValue);

    // Save rates when they change
    saveRates();
};

// Add event listeners to all inputs
[basePrice, rate1, rate3, rate6, cashDiscount].forEach(input => {
    input.addEventListener('input', updatePrices);
});

// Load saved rates when the page loads
loadSavedRates();

// Initial calculation
updatePrices(); 