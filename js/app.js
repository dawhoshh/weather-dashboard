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


// КОД ДЛЯ 11-Ї ПРАКТИЧНОЇ (localStorage / IndexedDB)
const LS_CITIES_KEY = 'savedCities';
const LS_MIGRATED_KEY = 'citiesMigrated';
const DB_NAME = 'WeatherDB';
const DB_VERSION = 1;
const STORE_NAME = 'cities';

const cityForm = document.querySelector('#city-form');
const savedCitiesList = document.querySelector('#saved-cities-list');
const dbErrorEl = document.querySelector('#db-error');

// --- Крок 2: Робота з localStorage (із захистом try/catch) ---
function saveToLocalStorage(items) {
    localStorage.setItem(LS_CITIES_KEY, JSON.stringify(items));
}

function loadFromLocalStorage() {
    try {
        const raw = localStorage.getItem(LS_CITIES_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (error) {
        console.error('Пошкоджені дані в localStorage:', error);
        return [];
    }
}

// --- Крок 5–6: Відкриття IndexedDB та створення сховища "cities" ---
function openDB() {
    return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
            reject(new Error('IndexedDB не підтримується вашим браузером'));
            return;
        }
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// --- Крок 7: CRUD-функції для IndexedDB ---
// Додавання або оновлення міста (put)
async function saveCity(city) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).put(city);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

// Отримання всіх збережених міст (getAll)
async function getAllCities() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const request = tx.objectStore(STORE_NAME).getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Видалення міста за id (delete)
async function deleteCity(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

// --- Крок 8: Одноразова міграція з localStorage в IndexedDB ---
async function migrateFromLocalStorage() {
    if (localStorage.getItem(LS_MIGRATED_KEY) === 'true') {
        return;
    }

    const existingInDB = await getAllCities();
    let lsCities = loadFromLocalStorage();

    // Якщо localStorage порожній на першому запуску — додаємо Київ для демонстрації
    if (lsCities.length === 0 && existingInDB.length === 0) {
        lsCities = [{
            id: 1,
            name: 'Київ',
            lat: 50.45,
            lon: 30.52,
            temperature: null,
            weatherCode: null,
            time: null
        }];
        saveToLocalStorage(lsCities);
    }

    if (existingInDB.length === 0 && lsCities.length > 0) {
        for (const city of lsCities) {
            await saveCity(city);
        }
        localStorage.setItem(LS_MIGRATED_KEY, 'true');
        console.log('Міграцію з localStorage в IndexedDB виконано успішно.');
    }
}

// --- Отримання свіжого прогнозу для конкретного міста через Open-Meteo ---
async function fetchCityWeather(city) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weather_code&timezone=auto`;
    try {
        const response = await fetch(url);
        if (!response.ok) return city;
        const data = await response.json();

        const updatedCity = {
            ...city,
            temperature: Math.round(data.current.temperature_2m),
            weatherCode: data.current.weather_code,
            time: data.current.time
        };
        await saveCity(updatedCity);
        return updatedCity;
    } catch (error) {
        console.warn(`Не вдалося оновити погоду для ${city.name}:`, error);
        return city;
    }
}

// --- Крок 9: Рендер списку збережених міст із IndexedDB ---
async function renderSavedCities() {
    const cities = await getAllCities();
    savedCitiesList.innerHTML = '';

    if (cities.length === 0) {
        savedCitiesList.innerHTML = '<p>Список збережених міст порожній.</p>';
        return;
    }

    for (const city of cities) {
        const card = document.createElement('article');
        card.className = 'card';

        const desc = city.weatherCode !== null ? (weatherCodesMap[city.weatherCode] || 'хмарно') : 'очікування...';
        const tempText = city.temperature !== null
            ? `${city.temperature > 0 ? '+' : ''}${city.temperature}°C`
            : '—';
        const timeText = city.time
            ? new Date(city.time).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })
            : 'немає даних';

        card.innerHTML = `
            <h3>${city.name}</h3>
            <p class="temp temp-cold">${tempText}</p>
            <p>${desc}</p>
            <p style="font-size: 12px; color: #64748b; margin-top: 6px;">Оновлено: ${timeText}</p>
            <button type="button" class="delete-city-btn" style="margin-top: 10px; cursor: pointer;">Видалити</button>
        `;

        card.querySelector('.delete-city-btn').addEventListener('click', async () => {
            await deleteCity(city.id);
            const remaining = await getAllCities();
            saveToLocalStorage(remaining); // синхронізуємо з localStorage
            await renderSavedCities();
        });

        savedCitiesList.append(card);
    }
}

// --- Крок 3 і 9: Додавання нового міста з перевіркою через Geocoding API ---
cityForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const inputName = document.querySelector('#city-name').value.trim();
    dbErrorEl.style.display = 'none';

    try {
        // 1. Шукаємо реальне місто через Open-Meteo Geocoding API
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(inputName)}&count=1&language=uk&format=json`;
        const geoResponse = await fetch(geoUrl);
        if (!geoResponse.ok) {
            throw new Error('Помилка сервісу пошуку міст');
        }
        const geoData = await geoResponse.json();

        // Якщо місто не існує — зупиняємо додавання
        if (!geoData.results || geoData.results.length === 0) {
            dbErrorEl.textContent = `Місто «${inputName}» не знайдено. Перевірте правильність назви.`;
            dbErrorEl.style.display = 'block';
            return;
        }

        const found = geoData.results[0];

        // 2. Перевіряємо, чи це місто вже є в IndexedDB
        const existingCities = await getAllCities();
        const isDuplicate = existingCities.some(
            (c) => c.name.toLowerCase() === found.name.toLowerCase()
        );
        if (isDuplicate) {
            dbErrorEl.textContent = `Місто «${found.name}» уже є у списку збережених.`;
            dbErrorEl.style.display = 'block';
            return;
        }

        // 3. Зберігаємо реальне місто з точними координатами
        const newCity = {
            id: Date.now(),
            name: found.name,
            lat: found.latitude,
            lon: found.longitude,
            temperature: null,
            weatherCode: null,
            time: null
        };

        await saveCity(newCity);
        const allCities = await getAllCities();
        saveToLocalStorage(allCities);
        await renderSavedCities();

        // Одразу підтягуємо свіжу погоду для доданого міста
        await fetchCityWeather(newCity);
        await renderSavedCities();
        cityForm.reset();
    } catch (error) {
        console.error('Помилка збереження міста:', error);
        dbErrorEl.textContent = 'Не вдалося перевірити або зберегти місто (перевірте інтернет-з’єднання).';
        dbErrorEl.style.display = 'block';
    }
});

// --- Ініціалізація при завантаженні сторінки (Кроки 8, 9, 11) ---
async function initSavedCities() {
    try {
        await migrateFromLocalStorage();
        // 1. Одразу показуємо збережені міста з IndexedDB
        await renderSavedCities();

        // 2. У фоні підтягуємо свіжий fetch для кожного міста і перемальовуємо
        const cities = await getAllCities();
        for (const city of cities) {
            await fetchCityWeather(city);
        }
        await renderSavedCities();
    } catch (error) {
        console.error('Помилка відкриття IndexedDB:', error);
        dbErrorEl.textContent = 'Локальна база даних IndexedDB недоступна (можливо, увімкнено приватний режим).';
        dbErrorEl.style.display = 'block';
    }
}

initSavedCities();