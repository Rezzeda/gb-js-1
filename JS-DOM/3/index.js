// Цель: Разработать веб-приложение, которое будет отображать новое случайное изображение из коллекции Unsplash, 
//давая пользователю возможность узнать больше о фотографе и сделать "лайк" изображению.

// Регистрация на Unsplash:

// • Перейдите на веб-сайт Unsplash (https://unsplash.com/).
// • Зарегистрируйтесь или войдите в свой аккаунт. (если у вас не было регистрации до этого, новый аккаунт создавать не нужно).

// Создание приложения:

// • Перейдите на страницу разработчика Unsplash (https://unsplash.com/developers).
// • Нажмите "New Application".
// • Заполните необходимую информацию о приложении (можете использовать http://localhost для тестирования).
// • Получите свой API-ключ после создания приложения.

// Разработка веб-приложения:

// • Создайте HTML-страницу с элементами: изображение, имя фотографа, кнопка "лайк" и счетчик лайков.
// • Используя JavaScript и ваш API-ключ, получите случайное изображение из Unsplash каждый раз, когда пользователь загружает страницу. 
//   Обратите внимание, что должно подгружаться всегда случайное изображение, для этого есть отдельная ручка (эндпоинт) у API.
// • Отобразите информацию о фотографе под изображением.
// • Реализуйте функционал "лайка". Каждый раз, когда пользователь нажимает кнопку "лайк", счетчик должен увеличиваться на единицу. 
//   Одну фотографию пользователь может лайкнуть только один раз. Также должна быть возможность снять лайк, если ему разонравилась картинка.
// • Добавьте функцию сохранения количества лайков в локальное хранилище, чтобы при новой загрузке страницы счетчик не сбрасывался, 
//   если будет показана та же самая картинка.
// • Реализуйте возможность просмотра предыдущих фото с сохранением их в истории просмотров в localstorage.
// • Реализовать все с помощью async/await, без цепочек then.

const accessKey = ""; // Вставьте ТОКЕН!!!

// Переменные
const templateCard = document.querySelector('#card-template').content.querySelector('.card');
const listGalleryCards = document.querySelector('.gallery__cards');
const localStorageKey = 'galleryData';
let galleryData = JSON.parse(localStorage.getItem(localStorageKey)) || { viewedPhotos: [] };

// Создание fetch-запроса на получение рандомного фото
const fetchPhotos = async () => {
    const response = await fetch(`https://api.unsplash.com//photos/random?client_id=${accessKey}`);
        if (!response.ok) {
            throw new Error("Ошибка при загрузке данных");
        }
    const data = await response.json();
    return data;
};

// Функция загружается при старте страницы, она асинхронная, т.к. ждёт выполнения fatchPHotos
async function run() {
    try {
        // Сохраняем в переменную массив объектов и fetch запроса для дальнейшей работы
        const data = await fetchPhotos(); //
        addToViewedPhotos(data);
        //добавляем фотографии из localStorage
        galleryData.viewedPhotos.map (function (photo ) {
        renderCardFromLS(photo)})
    } catch (error) {
        console.log(error);
    }
}

run();

// Добавление фотографии в историю просмотров
function addToViewedPhotos(data) {
    // Проверяем, есть ли уже такая фотография в истории просмотров
    if (!galleryData.viewedPhotos.find(photo => photo.id === data.id)) {
        // Добавляем фотографию в начало истории просмотров
        galleryData.viewedPhotos.unshift({
            id: data.id,
            user: data.user.name,
            url: data.urls.small,
            alt_description: data.alt_description,
            likes: data.likes,
            liked: false,
        });

        // Ограничиваем историю просмотров 10 элементами
        if (galleryData.viewedPhotos.length > 10) {
            galleryData.viewedPhotos.pop();
        }

        // Обновляем данные в локальном хранилище
        localStorage.setItem(localStorageKey, JSON.stringify(galleryData));
    }
}

function createCardFromLS(dataCard) {
    //клонируем шаблон
    const galleryCard = templateCard.cloneNode(true);
    const cardElementTitle = galleryCard.querySelector('.card__title');
    const cardElementImage = galleryCard.querySelector('.card__image');
    const likesCounter = galleryCard.querySelector('.card__likes');

    // Устанавливаем данные изображения
    cardElementTitle.textContent = dataCard.user; // Устанавливаем имя фотографа
    cardElementImage.src = dataCard.url; // Устанавливаем ссылку на изображение
    cardElementImage.alt = dataCard.alt_description; // Устанавливаем атрибут alt для изображения
    likesCounter.textContent = dataCard.likes

    // Устанавливаем идентификатор карточки в атрибут data-id
    galleryCard.dataset.id = dataCard.id;

    return galleryCard;
}

function renderCardFromLS(data) {
    const galleryCard = createCardFromLS(data);
    const likeButton = galleryCard.querySelector('.card__btn'); // Находим кнопку лайка в карточке

    // Если лайк установлен, добавляем класс активного состояния кнопке лайка
    if (data.liked) {
        likeButton.classList.add('card__btn_like-active');
    }
    listGalleryCards.appendChild(galleryCard);
}

// Обработчик события для кнопки лайка
listGalleryCards.addEventListener('click', async (event) => {
    const likeButton = event.target.closest('.card__btn'); // Находим ближайшую кнопку лайка
    if (!likeButton) return; // Если клик был не по кнопке лайка, выходим

    const card = likeButton.closest('.card'); // Находим карточку, к которой относится кнопка лайка
    const cardId = card.dataset.id; // Получаем id карточки
    const liked = likeButton.classList.contains('card__btn_like-active'); // Проверяем, поставлен ли лайк

    // Обновляем данные о лайках в объекте galleryData
    galleryData.viewedPhotos.forEach(photo => {
        if (photo.id === cardId) {
            if (liked) {
                // Удаление лайка
                photo.likes--;
            } else {
                // Постановка лайка
                photo.likes++;
            }
            photo.liked = !liked; // Обновляем статус лайка
        }
    });

    // Обновляем кнопку лайка
    likeButton.classList.toggle('card__btn_like-active');

    // Находим счетчик лайков и обновляем его значение
    const likesCounter = card.querySelector('.card__likes');
    likesCounter.textContent = galleryData.viewedPhotos.find(photo => photo.id === cardId).likes;

    // Сохраняем обновленные данные в локальное хранилище
    localStorage.setItem(localStorageKey, JSON.stringify(galleryData));
});

