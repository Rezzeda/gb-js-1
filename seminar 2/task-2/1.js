"use strict";

// Задание 2.

// Создайте простое модальное окно, которое появляется при клике 
// на кнопку "Открыть модальное окно" и закрывается при клике на 
// кнопку "Закрыть". Модальное окно должно содержать заголовок 
// "Модальное окно" и кнопку для закрытия. Модальное окно должно 
// плавно появляться и исчезать при открытии и закрытии.


const modalEl = document.querySelector('.modal');
const openBtnEl = document.querySelector('.openbtn');
const closeBtnEl = document.querySelector('.closebtn');


openBtnEl.addEventListener('click', () => modalEl.classList.add('active'));

closeBtnEl.addEventListener('click', () => modalEl.classList.remove('active'));

