"use strict";

/*
Необходимо попросить пользователя ввести три числа.
Необходимо создать функцию, в которую мы должны передать эти три числа.
Функция должна определить максимальное, среди переданных ей значение и 
вывести сообщение: "Максимальное значение среди чисел N1, N2, N3 равно N."

Примечание: Условимся, что пользователь всегда вводит корректные значения, 
три числа. Проверять их не нужно.
*/

const firstNum = Number(prompt('Введите первое число'));
const secondNum = Number(prompt('Введите второе число'));
const thirdNum = Number(prompt('Введите третье число'));

function getMaxFromThreeNumbers(a, b, c) {
    return Math.max(a, b, c);
}

const max = getMaxFromThreeNumbers(firstNum, secondNum, thirdNum);

console.log(`Максимальное значение среди чисел ${firstNum}, ${secondNum}, ${thirdNum} равно ${max}.`);
