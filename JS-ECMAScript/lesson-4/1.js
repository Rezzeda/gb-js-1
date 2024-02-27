"use strict";

// ""Получение данных о пользователе""

// Реализуйте функцию getUserData, которая принимает идентификатор пользователя (ID) 
//в качестве аргумента и использует fetch для получения данных о пользователе с заданным ID
// с удаленного сервера. Функция должна возвращать промис, который разрешается с данными о пользователе в виде объекта.
// Если пользователь с указанным ID не найден, промис должен быть отклонен с соответствующим сообщением об ошибке.


function getUserData(id) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(response => response.json())
    // .then(response => console.log(response))
    .catch((error) => Promise.reject(`Ошибка: ${error}`))
}
//тест
// getUserData(-1);
getUserData(1);


// ""Отправка данных на сервер""

// Реализуйте функцию saveUserData, которая принимает объект с данными о пользователе в качестве аргумента 
//и использует fetch для отправки этих данных на удаленный сервер для сохранения. 
//Функция должна возвращать промис, который разрешается, если данные успешно отправлены, 
//или отклоняется в случае ошибки.

function saveUserData(userData) {
    return fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to save user data');
        }
    });
}

// Пример использования функции
const user = {
    name: 'John Smith',
    age: 30,
    email: 'john@example.com'
};

saveUserData(user)
    .then(() => {
        console.log('User data saved successfully');
    })
    .catch(error => {
        console.log(error.message);
    });


    // ""Изменение стиля элемента через заданное время""
    // Напишите функцию changeStyleDelayed, которая принимает идентификатор элемента и время задержки (в миллисекундах)
    // в качестве аргументов. Функция должна изменить стиль элемента через указанное время.
    
    // // Пример использования функции
    // changeStyleDelayed('myElement', 2000); // Через 2 секунды изменяет стиль элемента с id 'myElement'"
    
    
    function changeStyleDelayed(elementId, delay) {
        setTimeout(() => {
            const element = document.getElementById(elementId);
            if (element) {
                element.style.color = 'red';
                element.style.fontSize = '40px';
            }
        }, delay);
    }
    
    // Пример использования функции
    changeStyleDelayed('myElement', 2000);
    