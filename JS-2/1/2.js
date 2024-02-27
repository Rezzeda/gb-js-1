"use strict";
// Вы управляете рестораном, в котором работают разные повара, 
//специализирующиеся на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.

// Необходимо создать систему управления этими заказами, которая позволит:

// Отслеживать, какой повар готовит какое блюдо.
// Записывать, какие блюда заказал каждый клиент.

// Используйте коллекции Map для хранения блюд и их поваров, а также для хранения заказов каждого клиента. 
//В качестве ключей для клиентов используйте объекты.

// Повара и их специализации:

// Виктор - специализация: Пицца.
// Ольга - специализация: Суши.
// Дмитрий - специализация: Десерты.

// Блюда и их повара:

// Пицца "Маргарита" - повар: Виктор.
// Пицца "Пепперони" - повар: Виктор.
// Суши "Филадельфия" - повар: Ольга.
// Суши "Калифорния" - повар: Ольга.
// Тирамису - повар: Дмитрий.
// Чизкейк - повар: Дмитрий.

// Заказы:

// Клиент Алексей заказал: Пиццу "Пепперони" и Тирамису.
// Клиент Мария заказала: Суши "Калифорния" и Пиццу "Маргарита".
// Клиент Ирина заказала: Чизкейк.


// коллекция для хранения блюд и их поваров
    const dishesAndChefs = new Map([
        ['Пицца "Маргарита"', 'Виктор'],
        ['Пицца "Пепперони"', 'Виктор'],
        ['Суши "Филадельфия"', 'Ольга'],
        ['Суши "Калифорния"', 'Ольга'],
        ['Тирамису', 'Дмитрий'],
        ['Чизкейк', 'Дмитрий']
    ]);
    
    // коллекция для хранения заказов каждого клиента
    const orders = new Map();
    
    // Функция для добавления заказа клиента
    function placeOrder(client, dish) {
        // получаем текущий список заказов клиента или создаем новый, если его нет
        const clientOrder = orders.get(client) || new Set();
        // добавляем блюдо в заказ клиента
        clientOrder.add(dish);
        // обновляем список заказов клиента в Map
        orders.set(client, clientOrder);
    }
    
    // Функция для получения специализации повара по блюду
    function getChefByDish(dish) {
        return dishesAndChefs.get(dish);
    }
    
    // Функция для отображения текущего статуса заказов и какой повар готовит каждое блюдо
    function displayOrders() {
        orders.forEach((order, client) => {
        console.log(`Заказ клиента ${client}:`);
        order.forEach(dish => {
            const chef = getChefByDish(dish);
            console.log(`${dish} (Готовит: ${chef})`);
        });
        console.log('---');
        });
    }
    
    // заказы клиентов
    placeOrder('Алексей', 'Пицца "Пепперони"');
    placeOrder('Алексей', 'Тирамису');
    placeOrder('Мария', 'Суши "Калифорния"');
    placeOrder('Мария', 'Пицца "Маргарита"');
    placeOrder('Ирина', 'Чизкейк');
    
    //статус заказов
    displayOrders();
    