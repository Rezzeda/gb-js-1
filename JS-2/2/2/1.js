// Вы разрабатываете систему отзывов для вашего веб-сайта. 
// Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, 
// вы решаете установить некоторые ограничения.

// Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, 
// где будут отображаться отзывы.

// Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. 
// Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.

// При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.

const initialData = [
    {
        product: "Apple iPhone 13",
        reviews: [
            {
                id: "1",
                text: "Отличный телефон! Батарея держится долго.",
            },
            {
                id: "2",
                text: "Камера супер, фото выглядят просто потрясающе.",
            },
        ],
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            {
                id: "3",
                text: "Интересный дизайн, но дорогой.",
            },
        ],
    },
    {
        product: "Sony PlayStation 5",
        reviews: [
            {
                id: "4",
                text: "Люблю играть на PS5, графика на высоте.",
            },
        ],
    },
];

const productSelect = document.getElementById('product-select');

function checkReviewLength(reviewText) {
    const minLength = 50;
    const maxLength = 500;

    if (reviewText.length < minLength || reviewText.length > maxLength) {
        throw new Error('Длина отзыва должна быть от 50 до 500 символов.');
    }
}

// Функция для отображения отзывов по продукту
function renderReviews(reviews, productName) {
    const productReviewsDiv = document.createElement('div');
    productReviewsDiv.classList.add('product-reviews');
    productReviewsDiv.setAttribute('data-product', productName); // Добавляем атрибут для идентификации продукта
    productReviewsDiv.innerHTML = `<h2>${productName}</h2>`;
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review'); // Добавляем класс для стилизации отзыва
        reviewElement.textContent = review.text;
        productReviewsDiv.appendChild(reviewElement);
    });
    document.body.appendChild(productReviewsDiv);
}

// Функция для обновления списка продуктов
function updateProductSelect() {
    initialData.forEach(product => {
        const option = document.createElement('option');
        option.textContent = product.product;
        productSelect.appendChild(option);
    });
}

// Отображение отзывов из начального массива
initialData.forEach(product => {
    renderReviews(product.reviews, product.product);
});

// Обновление списка продуктов
updateProductSelect();

// Отправка отзыва и его отображение на странице
document.getElementById('review-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Находим выбранный продукт и текст отзыва
    const selectedProduct = productSelect.value;
    const reviewText = document.getElementById('review-input').value;

    try {
        checkReviewLength(reviewText);
        // Находим контейнер для выбранного продукта
        const productReviewsContainer = document.querySelector(`[data-product="${selectedProduct}"]`);

        // Создаем новый элемент для отзыва
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.textContent = reviewText;

        // Добавляем отзыв в контейнер
        productReviewsContainer.appendChild(reviewElement);

        // Очищаем поле ввода
        document.getElementById('review-input').value = '';
    } catch (error) {
        alert(error.message);
        console.error("Ошибка:", error.message);
    }
});
