"use strict";

/*
Необходимо реализовать четыре функции, каждая функция должна принимать по два
числа и выполнять одну из операций (каждая функция выполняет одну из них):
1. Сложение
2. Разность
3. Умножение
4. Деление
Необходимо сделать так, чтобы функция вернула число, например выражение
console.log(sum(2, 6)); должно вывести число 8 в консоль (sum - функция
сложения в данном примере, ваши названия функций могут отличаться).
Округлять значения, которые возвращают функции не нужно, однако, обратите
внимание на разность, функция должна вычесть из большего числа меньшее, либо
вернуть 0, если числа равны.
Функциям всегда передаются корректные числа, проверки на NaN, Infinity делать
не нужно.
Демонстрировать работы функций не обязательно.
*/

function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    if (a > b) {
        return a - b;
    }
    return b - a;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

const first = Number(prompt('Введите первое число'));
const second = Number(prompt('Введите второе число'));

console.log(add(first, second));
console.log(subtract(first, second));
console.log(multiply(first, second));
console.log(divide(first, second));