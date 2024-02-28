/// здесь появилась кнопка добавить продукт, появилась возможность удалить отзыв, все взаимодействует с LocalStorage.

class ReviewApp {
    constructor(currentUser) {
        this.currentUser = currentUser;
        this.productSelect = document.getElementById('product-select');
        this.reviewForm = document.getElementById('review-form');
        this.newProductInput = document.getElementById('new-product-input');

        // загружает из localStorage или создает пустой массив
        this.initialData = JSON.parse(localStorage.getItem('products')) || [];

        this.checkReviewLength = this.checkReviewLength.bind(this);
        this.renderReviews = this.renderReviews.bind(this);
        this.updateProductSelect = this.updateProductSelect.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleDeleteReview = this.handleDeleteReview.bind(this);
        this.handleAddProduct = this.handleAddProduct.bind(this);

        this.init();
    }

    checkReviewLength(reviewText) {
        const minLength = 50;
        const maxLength = 500;

        if (reviewText.length < minLength || reviewText.length > maxLength) {
            throw new Error('Длина отзыва должна быть от 50 до 500 символов.');
        }
    }

    createElement(tag, className, textContent) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);
        if (textContent) element.textContent = textContent;
        return element;
    }

    renderReviews(reviews, productName) {
        const productReviewsDiv = this.createElement('div', 'product-reviews');
        productReviewsDiv.setAttribute('data-product', productName);
        productReviewsDiv.innerHTML = `<h2>${productName}</h2>`;
        reviews.forEach(review => {
            const reviewElement = this.createElement('div', 'review', review.text);
            if (review.user === this.currentUser) {
                const deleteButton = this.createElement('button', null, 'Удалить');
                deleteButton.addEventListener('click', () => this.handleDeleteReview(productName, review.id));
                reviewElement.appendChild(deleteButton);
            }
            productReviewsDiv.appendChild(reviewElement);
        });
        document.body.appendChild(productReviewsDiv);
    }

    updateProductSelect() {
        this.initialData.forEach(product => {
            const option = this.createElement('option', null, product.product);
            this.productSelect.appendChild(option);
        });
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const selectedProduct = this.productSelect.value;
        const reviewText = document.getElementById('review-input').value;

        try {
            this.checkReviewLength(reviewText);

            let product = this.initialData.find(item => item.product === selectedProduct);
            if (!product) {
                throw new Error('Выбранный продукт не найден.');
            }

            product.reviews.push({ id: Date.now().toString(), text: reviewText, user: this.currentUser });
            this.saveDataToLocalStorage();
            this.renderReviews(product.reviews, selectedProduct);

            document.getElementById('review-input').value = '';
        } catch (error) {
            alert(error.message);
            console.error("Ошибка:", error.message);
        }
    }

    // handleDeleteReview(productName, reviewId) {
    //     let product = this.initialData.find(item => item.product === productName);
    //     if (!product) return;

    //     product.reviews = product.reviews.filter(review => review.id !== reviewId);
    //     this.saveDataToLocalStorage();
    //     this.updateProductReviews(product);
    // }
    handleDeleteReview(productName, reviewId) {
        let productIndex = this.initialData.findIndex(item => item.product === productName);
        if (productIndex === -1) return;
    
        let product = this.initialData[productIndex];
        product.reviews = product.reviews.filter(review => review.id !== reviewId);
        this.saveDataToLocalStorage();
        this.updateProductReviews(product);
    
        // Проверяем, если отзывов больше нет, удаляем продукт
        if (product.reviews.length === 0) {
            this.initialData.splice(productIndex, 1);
            this.saveDataToLocalStorage();
            this.updateProductSelect();
        }
    }

    handleAddProduct() {
        const newProduct = this.newProductInput.value.trim();
        if (!newProduct) return;

        if (this.initialData.some(item => item.product === newProduct)) {
            alert('Продукт с таким именем уже существует.');
            return;
        }

        this.initialData.push({ product: newProduct, reviews: [] });
        this.saveDataToLocalStorage();
        this.updateProductSelect();
        this.newProductInput.value = '';
    }

    updateProductReviews(product) {
        const productReviewsContainer = document.querySelector(`[data-product="${product.product}"]`);
        productReviewsContainer.innerHTML = '';
        this.renderReviews(product.reviews, product.product);
    }

    saveDataToLocalStorage() {
        localStorage.setItem('products', JSON.stringify(this.initialData));
    }

    init() {
        this.updateProductSelect();
        this.initialData.forEach(product => {
            this.renderReviews(product.reviews, product.product);
        });

        this.reviewForm.addEventListener('submit', this.handleFormSubmit);
        document.getElementById('add-product-button').addEventListener('click', this.handleAddProduct);
    }
}

const currentUser = "user";
new ReviewApp(currentUser);
