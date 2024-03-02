// Находим нужные элементы
const templateEl = document.querySelector('#image-template').content.querySelector('.img');
const carouselDiv = document.querySelector('.carousel');
const previousButton = document.querySelector('.previous');
const nextButton = document.querySelector('.next');
const loaderDiv = document.getElementById('loader');
const imageCounterEl = document.querySelector('.image-counter');
const indicatorsContainer = document.querySelector('.indicators');


let imagesData = []; // массив для хранения данных об изображениях
let currentIndex = 0; // текущий индекс изображения
let totalImages = 0; // общее количество изображений

// обработчики событий для кнопок "предыдущий" и "следующий"
previousButton.addEventListener('click', showPreviousImage);
nextButton.addEventListener('click', showNextImage);
//добавляем слушатель для переключения с клавиатуры
document.addEventListener('keydown', keyPress);

// получаем данные для всех изображений
async function getAllImages() {
    // пказываем лоадер перед началом загрузки
    loaderDiv.style.display = 'block';
    try {
        for (let i = 0; i < 5; i++) {
            await getImageData();
        }
        renderCard();
        renderIndicators(); // вызов функции для отображения индикаторов
        updateCounter(); // сбновляем счетчик после загрузки изображений
    } catch (error) {
        console.error('Ошибка при загрузке изображений:', error);
    } finally {
        // скрываем лоадер после завершения загрузки
        loaderDiv.style.display = 'none';
    }
}

// Получаем данные для одного изображения
function getImageData() {
    return fetch(`https://dog.ceo/api/breeds/image/random`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            imagesData.push(data.message);
            totalImages++;
        })
        .catch(error => console.error('Ошибка при загрузке изображения собаки:', error));
}

// Функция отображения индикаторов
function renderIndicators() {
    indicatorsContainer.innerHTML = ''; // Очищаем содержимое индикаторов
    for (let i = 0; i < imagesData.length; i++) {
        const indicator = document.createElement('span');
        indicator.classList.add('indicator');
        if (i === currentIndex) {
            indicator.classList.add('active');
        }
        indicator.addEventListener('click', () => {
            currentIndex = i;
            renderCard();
            updateCounter();
            updateIndicators();
        });
        indicatorsContainer.appendChild(indicator);
    }
}

// Обновление индикаторов
function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

//обновление счетчика картинок
function updateCounter() {
    imageCounterEl.textContent = `${currentIndex + 1} / ${totalImages}`;
}

// предыдущая картинка
function showPreviousImage() {
    currentIndex = (currentIndex === 0) ? imagesData.length - 1 : currentIndex - 1;
    renderCard();
    updateCounter();
    updateIndicators(); // обновляем индикаторы при переключении изображений

}

// следующая картинка
function showNextImage() {
    currentIndex = (currentIndex === imagesData.length - 1) ? 0 : currentIndex + 1;
    renderCard();
    updateCounter();
    updateIndicators(); // обновляем индикаторы при переключении изображений
}

// нажатие клавииш переключения
function keyPress(e) {
    if (e.keyCode == '37') {
        showPreviousImage();
    } else if (e.keyCode == '39') {
        showNextImage();
    }
}

// отображаем изображения
function renderCard() {
    carouselDiv.innerHTML = ''; // очищаем содержимое карусели перед добавлением новых изображений
    for (let i = 0; i < 5; i++) {
        const newCard = createCard(imagesData[(currentIndex + i) % imagesData.length]);
        if (i === 0) {
            newCard.classList.add('active');
        }
        carouselDiv.append(newCard);
    }
}

// Создание HTML-элемента для изображения
function createCard(dataCard) {
    //клонируем шаблон
    const galleryImage = templateEl.cloneNode(true);
    galleryImage.src = dataCard;
    return galleryImage;
}

// Первоначальная загрузка данных об изображениях
getAllImages();

