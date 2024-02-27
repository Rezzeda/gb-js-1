// то же самое на классах
class ReviewApp {
    constructor(initialData) {
        this.initialData = initialData;
        this.productSelect = document.getElementById('product-select');
        this.reviewForm = document.getElementById('review-form');

        this.checkReviewLength = this.checkReviewLength.bind(this);
        this.renderReviews = this.renderReviews.bind(this);
        this.updateProductSelect = this.updateProductSelect.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.init();
    }

    checkReviewLength(reviewText) {
        const minLength = 50;
        const maxLength = 500;

        if (reviewText.length < minLength || reviewText.length > maxLength) {
            throw new Error('Длина отзыва должна быть от 50 до 500 символов.');
        }
    }

    renderReviews(reviews, productName) {
        const productReviewsDiv = document.createElement('div');
        productReviewsDiv.classList.add('product-reviews');
        productReviewsDiv.setAttribute('data-product', productName);
        productReviewsDiv.innerHTML = `<h2>${productName}</h2>`;
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');
            reviewElement.textContent = review.text;
            productReviewsDiv.appendChild(reviewElement);
        });
        document.body.appendChild(productReviewsDiv);
    }

    updateProductSelect() {
        this.initialData.forEach(product => {
            const option = document.createElement('option');
            option.textContent = product.product;
            this.productSelect.appendChild(option);
        });
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const selectedProduct = this.productSelect.value;
        const reviewText = document.getElementById('review-input').value;

        try {
            this.checkReviewLength(reviewText);

            const productReviewsContainer = document.querySelector(`[data-product="${selectedProduct}"]`);
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');
            reviewElement.textContent = reviewText;
            productReviewsContainer.appendChild(reviewElement);

            document.getElementById('review-input').value = '';
        } catch (error) {
            alert(error.message);
            console.error("Ошибка:", error.message);
        }
    }

    init() {
        this.initialData.forEach(product => {
            this.renderReviews(product.reviews, product.product);
        });

        this.updateProductSelect();
        this.reviewForm.addEventListener('submit', this.handleFormSubmit);
    }
}

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

new ReviewApp(initialData);