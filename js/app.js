// Додали назви файлів іконок у наші дані
const forecastData = [
    { day: 'Пн', tempC: 20, description: 'ясно', icon: 'sun.svg' },
    { day: 'Вт', tempC: 18, description: 'хмарно', icon: 'cloud.svg' },
    { day: 'Ср', tempC: 16, description: 'дощ', icon: 'rain.svg' },
    { day: 'Чт', tempC: 17, description: 'хмарно', icon: 'cloud.svg' },
    { day: 'Пт', tempC: -2, description: 'мороз', icon: 'cloud.svg' },
    { day: 'Сб', tempC: 30, description: 'сонячно', icon: 'sun.svg' },
    { day: 'Нд', tempC: -5, description: 'сніг', icon: 'snow.svg' }
];

const listContainer = document.querySelector('#forecast-cards');
const avgTempElement = document.querySelector('#avg-temp');

function renderForecast(forecastArray) {
    const oldCards = listContainer.querySelectorAll('.card');
    for (const oldCard of oldCards) {
        oldCard.remove();
    }

    let sumTemp = 0;

    for (const item of forecastArray) {
        const card = document.createElement('article');
        const title = document.createElement('h3');
        const details = document.createElement('p');

        const img = document.createElement('img');
        img.setAttribute('src', `assets/img/${item.icon}`);
        img.setAttribute('alt', `Іконка: ${item.description}`);

        img.style.width = '64px';
        img.style.display = 'block';
        img.style.margin = '10px auto 0';

        card.classList.add('card');
        title.textContent = item.day;

        // --- ПОВЕРТАЄМО КОЛЬОРИ ---
        // 1. Створюємо окремий елемент span для температури
        const tempSpan = document.createElement('span');
        const sign = item.tempC > 0 ? '+' : '';
        tempSpan.textContent = `${sign}${item.tempC}°C`;
        tempSpan.style.fontWeight = 'bold'; // Жирний шрифт
        tempSpan.style.fontSize = '32px'; // Розмір шрифту

        tempSpan.style.display = 'block'; // Переносить опис на наступний рядок

        // 2. Додаємо кольори, які ти підбирала у звіті (Крок 7)
        if (item.tempC >= 25) {
            tempSpan.style.color = '#B91C1C'; // Спекотна погода (червоний)
        } else if (item.tempC >= 18) {
            tempSpan.style.color = '#A16207'; // Тепла погода (золотисто-жовтий)
        } else {
            tempSpan.style.color = '#0369A1'; // Прохолодна/морозна погода (синій)
        }

        // 3. Збираємо параграф до купи: спан з температурою + пробіл + опис (без коми)
        details.append(tempSpan, ` ${item.description}`);
        // --------------------------

        if (item.tempC < 0) {
            card.classList.add('cold');
        }

        card.append(title, details, img);
        listContainer.append(card);

        sumTemp += item.tempC;
    }

    const avgTemp = Math.round(sumTemp / forecastArray.length);
    avgTempElement.textContent = `Середня температура за тиждень: ${avgTemp}°C`;
}

renderForecast(forecastData);

// 1. Вибираємо форму та інші елементи
const weatherForm = document.querySelector('#weather-form');
const tempInput = document.querySelector('#temp-input');
const warmestBtn = document.querySelector('#warmest-day-btn');
const warmestResult = document.querySelector('#warmest-day-result');

// 2. Додаткова валідація на подію 'input' (Крок 8)
tempInput.addEventListener('input', () => {
    const tempValue = Number(tempInput.value);
    // Перевіряємо, чи температура в межах від -50 до +50
    if (tempInput.value !== '' && (tempValue < -50 || tempValue > 50)) {
        tempInput.setCustomValidity('Температура поза реалістичним діапазоном (-50...50)');
    } else {
        tempInput.setCustomValidity(''); // Скидаємо помилку, якщо все добре
    }
});


// 3. Обробка надсилання форми (подія 'submit')
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const day = document.querySelector('#day-input').value.trim();
    const tempC = Number(tempInput.value);
    const description = document.querySelector('#desc-input').value.trim();

    // Автоматично підбираємо іконку залежно від введеного опису
    let autoIcon = 'sun.svg'; // за замовчуванням
    const descLower = description.toLowerCase();

    if (descLower === 'ясно' || descLower === 'сонячно') {
        autoIcon = 'sun.svg';
    } else if (descLower === 'хмарно' || descLower === 'мороз') {
        autoIcon = 'cloud.svg';
    } else if (descLower === 'дощ') {
        autoIcon = 'rain.svg';
    } else if (descLower === 'сніг') {
        autoIcon = 'snow.svg';
    }

    const newForecast = {
        day: day,
        tempC: tempC,
        description: description,
        icon: autoIcon // передаємо автоматично підібрану іконку
    };

    forecastData.push(newForecast);
    renderForecast(forecastData);
    weatherForm.reset();
});

// 4. Друга подія варіанта 1: клік по кнопці «Найтепліший день»
warmestBtn.addEventListener('click', () => {
    if (forecastData.length === 0) return;

    // Знаходимо об'єкт із максимальною температурою
    let warmest = forecastData[0];
    for (const item of forecastData) {
        if (item.tempC > warmest.tempC) {
            warmest = item;
        }
    }

    // Виводимо результат у окремий елемент
    warmestResult.textContent = `Найтепліший день: ${warmest.day} (${warmest.tempC}°C, ${warmest.description})`;
});