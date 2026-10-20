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