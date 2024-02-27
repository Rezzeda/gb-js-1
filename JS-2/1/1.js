"use strict";
// Задание 1
//Используя Symbol.iterator, создайте объект "Музыкальная коллекция", который можно итерировать. 
//Каждая итерация должна возвращать следующий альбом из коллекции.

//Создайте объект musicCollection, который содержит массив альбомов и имеет свойство-символ Symbol.iterator. 
//Каждый альбом имеет следующую структуру:

// {
// title: "Название альбома",
// artist: "Исполнитель",
// year: "Год выпуска"
// }

//Реализуйте кастомный итератор для объекта musicCollection. Итератор должен перебирать альбомы по порядку.
//Используйте цикл for...of для перебора альбомов в музыкальной коллекции и вывода их на консоль в формате: 
//Название альбома - Исполнитель (Год выпуска)


    // Создаем символьный ключ для итератора
    const collectionIterator = Symbol.iterator;

    const musicCollection = {
    albums: [
        {
        title: "Альбом 1",
        artist: "Исполнитель 1",
        year: "2000"
        },
        {
        title: "Альбом 2",
        artist: "Исполнитель 2",
        year: "2010"
        },
        {
        title: "Альбом 3",
        artist: "Исполнитель 3",
        year: "2020"
        }
    ],

    // реализация итератора
    [collectionIterator]: function() {
        let index = 0;
        // возвращаем объект итератора
        return {
        next: () => {
            return index < this.albums.length ?
            { value: this.albums[index++], done: false } :
            { done: true };
        }
        };
    }
    };

    //цикл for...of для перебора альбомов
    
    for (const album of musicCollection) {
    console.log(`${album.title} - ${album.artist} (${album.year})`);
    }

