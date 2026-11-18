// Крок 7: Ручний рендер через DOM API (практикум 7) закоментовано,
// оскільки відображення списку карток перенесено на компонент WeatherCard у Vue 3.
// const forecastData = [
//     {day: 'Пн', tempC: 20, description: 'ясно', icon: 'sun.svg'},
//     {day: 'Вт', tempC: 18, description: 'хмарно', icon: 'cloud.svg'},
//     {day: 'Ср', tempC: 16, description: 'дощ', icon: 'rain.svg'},
//     {day: 'Чт', tempC: 17, description: 'хмарно', icon: 'cloud.svg'},
//     {day: 'Пт', tempC: -2, description: 'мороз', icon: 'cloud.svg'},
//     {day: 'Сб', tempC: 30, description: 'сонячно', icon: 'sun.svg'},
//     {day: 'Нд', tempC: -5, description: 'сніг', icon: 'snow.svg'}
// ];
//
// const listContainer = document.querySelector('#forecast-cards');
// const avgTempElement = document.querySelector('#avg-temp');
//
// function renderForecast(forecastArray) {
//     const oldCards = listContainer.querySelectorAll('.card');
//     for (const oldCard of oldCards) {
//         oldCard.remove();
//     }
//
//     let sumTemp = 0;
//
//     for (const item of forecastArray) {
//         const card = document.createElement('article');
//         const title = document.createElement('h3');
//         const details = document.createElement('p');
//
//         const img = document.createElement('img');
//         img.setAttribute('src', `assets/img/${item.icon}`);
//         img.setAttribute('alt', `Іконка: ${item.description}`);
//
//         img.style.width = '64px';
//         img.style.display = 'block';
//         img.style.margin = '10px auto 0';
//
//         card.classList.add('card');
//         title.textContent = item.day;
//
//         // --- ПОВЕРТАЄМО КОЛЬОРИ ---
//         // 1. Створюємо окремий елемент span для температури
//         const tempSpan = document.createElement('span');
//         const sign = item.tempC > 0 ? '+' : '';
//         tempSpan.textContent = `${sign}${item.tempC}°C`;
//         tempSpan.style.fontWeight = 'bold'; // Жирний шрифт
//         tempSpan.style.fontSize = '32px'; // Розмір шрифту
//
//         tempSpan.style.display = 'block'; // Переносить опис на наступний рядок
//
//         // 2. Додаємо кольори, які ти підбирала у звіті (Крок 7)
//         if (item.tempC >= 25) {
//             tempSpan.style.color = '#B91C1C'; // Спекотна погода (червоний)
//         } else if (item.tempC >= 18) {
//             tempSpan.style.color = '#A16207'; // Тепла погода (золотисто-жовтий)
//         } else {
//             tempSpan.style.color = '#0369A1'; // Прохолодна/морозна погода (синій)
//         }
//
//         // 3. Збираємо параграф до купи: спан з температурою + пробіл + опис (без коми)
//         details.append(tempSpan, ` ${item.description}`);
//         // --------------------------
//
//         if (item.tempC < 0) {
//             card.classList.add('cold');
//         }
//
//         card.append(title, details, img);
//         listContainer.append(card);
//
//         sumTemp += item.tempC;
//     }
//
//     const avgTemp = Math.round(sumTemp / forecastArray.length);
//     avgTempElement.textContent = `Середня температура за тиждень: ${avgTemp}°C`;
// }

// renderForecast(forecastData);

// Крок 1: Обрано фреймворк Vue 3, оскільки він підключається через CDN
// одним тегом <script> без потреби у Babel та збірці проєкту.

const WeatherCard = {
    props: ['day', 'tempC', 'description', 'icon'],
    data() {
        return {
            showFahrenheit: false
        };
    },
    computed: {
        // Похідне значення: температура у Фаренгейтах
        tempF() {
            return Math.round(this.tempC * 9 / 5 + 32);
        },
        // Похідне значення: клас кольору температури зі style.css
        tempColorClass() {
            if (this.tempC >= 25) return 'temp-hot';
            if (this.tempC >= 18) return 'temp-warm';
            return 'temp-cold';
        }
    },
    methods: {
        toggleFahrenheit() {
            this.showFahrenheit = !this.showFahrenheit;
        }
    },
    template: `
        <article :class="['card', { cold: tempC < 0 }]" @click="toggleFahrenheit" style="cursor: pointer;" title="Натисніть, щоб показати/сховати °F">
            <h3>{{ day }}</h3>
            <p>
                <span :class="['temp', tempColorClass]">
                    {{ tempC > 0 ? '+' + tempC : tempC }}°C
                    <span v-if="showFahrenheit"> ({{ tempF }}°F)</span>
                </span>
                {{ description }}
            </p>
            <img :src="'assets/img/' + icon" :alt="'Іконка: ' + description">
        </article>
    `
};

const vueApp = Vue.createApp({
    components: {
        WeatherCard
    },
    data() {
        return {
            forecastData: [
                { id: 1, day: 'Пн', tempC: 20, description: 'ясно', icon: 'sun.svg' },
                { id: 2, day: 'Вт', tempC: 18, description: 'хмарно', icon: 'cloud.svg' },
                { id: 3, day: 'Ср', tempC: 16, description: 'дощ', icon: 'rain.svg' },
                { id: 4, day: 'Чт', tempC: 17, description: 'хмарно', icon: 'cloud.svg' },
                { id: 5, day: 'Пт', tempC: -2, description: 'мороз', icon: 'cloud.svg' },
                { id: 6, day: 'Сб', tempC: 30, description: 'сонячно', icon: 'sun.svg' },
                { id: 7, day: 'Нд', tempC: -5, description: 'сніг', icon: 'snow.svg' }
            ]
        };
    },
    computed: {
        avgTemp() {
            if (this.forecastData.length === 0) return 0;
            const sum = this.forecastData.reduce((acc, item) => acc + item.tempC, 0);
            return Math.round(sum / this.forecastData.length);
        }
    }
}).mount('#forecast');

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

    vueApp.forecastData.push({ id: Date.now(), ...newForecast });
    weatherForm.reset();
});

// 4. Друга подія варіанта 1: клік по кнопці «Найтепліший день»
warmestBtn.addEventListener('click', () => {
    if (vueApp.forecastData.length === 0) return;

    // Знаходимо об'єкт із максимальною температурою
    let warmest = vueApp.forecastData[0];
    for (const item of vueApp.forecastData) {
        if (item.tempC > warmest.tempC) {
            warmest = item;
        }
    }

    // Виводимо результат у окремий елемент
    warmestResult.textContent = `Найтепліший день: ${warmest.day} (${warmest.tempC}°C, ${warmest.description})`;
});

// 1. Знаходимо необхідні елементи на сторінці
const loadApiBtn = document.querySelector('#load-api-btn');
const loadingStatus = document.querySelector('#loading-status');
const errorStatus = document.querySelector('#error-status');

// 2. URL для Варіанта 1 (Київ, поточна температура, код погоди та час)[cite: 21]
const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=50.45&longitude=30.52&current=temperature_2m,weather_code&timezone=auto';

// 3. Об'єкт-словник для перетворення числового коду погоди у текст[cite: 21]
const weatherCodesMap = {
    0: 'ясно',
    1: 'ясно',
    2: 'хмарно',
    3: 'хмарно',
    45: 'туман',
    48: 'туман',
    51: 'дощ',
    61: 'дощ',
    71: 'сніг',
    95: 'гроза'
};

// 4. Головна асинхронна функція для отримання даних[cite: 20]
async function loadData() {
    // Показуємо стан завантаження, ховаємо попередні помилки, блокуємо кнопку[cite: 20]
    loadingStatus.style.display = 'block';
    errorStatus.style.display = 'none';
    loadApiBtn.disabled = true;

    try {
        // Виконуємо запит на сервер і чекаємо на відповідь[cite: 20]
        const response = await fetch(API_URL);

        // Перевіряємо HTTP-статус (якщо 404 або 500 - кидаємо помилку)[cite: 20]
        if (!response.ok) {
            throw new Error(`Помилка сервера: ${response.status}`);
        }

        // Розбираємо JSON-відповідь[cite: 20]
        const data = await response.json();
        console.log('Дані з API:', data); // виводимо в консоль для перевірки[cite: 20]

        // Витягуємо температуру, код погоди та час[cite: 21]
        const currentTemp = data.current.temperature_2m;
        const code = data.current.weather_code;
        const timeString = data.current.time;

        // Форматуємо час, щоб залишити тільки години та хвилини (наприклад, 23:00)
        const dateObj = new Date(timeString);
        const formattedTime = dateObj.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });

        // Отримуємо текстовий опис погоди зі словника (або 'хмарно' за замовчуванням)[cite: 21]
        const desc = weatherCodesMap[code] || 'хмарно';

        // Автоматично підбираємо відповідну іконку
        let autoIcon = 'cloud.svg';
        if (desc === 'ясно') autoIcon = 'sun.svg';
        else if (desc === 'дощ' || desc === 'гроза') autoIcon = 'rain.svg';
        else if (desc === 'сніг') autoIcon = 'snow.svg';

        // Формуємо масив з одним об'єктом для рендеру
        const apiForecast = [{
            day: `Зараз (${formattedTime})`,
            tempC: Math.round(currentTemp),
            description: desc,
            icon: autoIcon
        }];

        vueApp.forecastData = [{ id: Date.now(), ...apiForecast[0] }];

    } catch (error) {
        // Перехоплюємо помилки мережі (офлайн) або наші власні помилки статусу[cite: 20]
        console.error('Сталася помилка:', error);

        // Виводимо конкретне повідомлення згідно з Варіантом 1[cite: 21]
        errorStatus.textContent = 'Не вдалося отримати прогноз погоди';
        errorStatus.style.display = 'block';
    } finally {
        // Вимикаємо стан завантаження і розблоковуємо кнопку незалежно від результату[cite: 20]
        loadingStatus.style.display = 'none';
        loadApiBtn.disabled = false;
    }
}

// 5. Прив'язуємо клік по кнопці до запуску функції[cite: 20]
loadApiBtn.addEventListener('click', loadData);