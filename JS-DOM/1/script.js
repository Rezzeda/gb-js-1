// // Начальные данные с расписанием занятий
// // const scheduleData = JSON.stringify([
// // {
// //     "id": 1,
// //     "name": "Йога",
// //     "time": "10:00 - 11:00",
// //     "maxParticipants": 15,
// //     "currentParticipants": 8
// // },
// // {
// //     "id": 2,
// //     "name": "Пилатес",
// //     "time": "11:30 - 12:30",
// //     "maxParticipants": 10,
// //     "currentParticipants": 5
// // },
// // {
// //     "id": 3,
// //     "name": "Кроссфит",
// //     "time": "13:00 - 14:00",
// //     "maxParticipants": 20,
// //     "currentParticipants": 15
// // },
// // {
// //     "id": 4,
// //     "name": "Танцы",
// //     "time": "14:30 - 15:30",
// //     "maxParticipants": 12,
// //     "currentParticipants": 10
// // },
// // {
// //     "id": 5,
// //     "name": "Бокс",
// //     "time": "16:00 - 17:00",
// //     "maxParticipants": 8,
// //     "currentParticipants": 6
// // }
// // ]);
// // console.log(scheduleData);

//имитируем строку с сервера (начальные данные)
const initialSchedule = '[{"id":1,"name":"Йога","time":"10:00 - 11:00","maxParticipants":15,"currentParticipants":8},{"id":2,"name":"Пилатес","time":"11:30 - 12:30","maxParticipants":10,"currentParticipants":5},{"id":3,"name":"Кроссфит","time":"13:00 - 14:00","maxParticipants":20,"currentParticipants":15},{"id":4,"name":"Танцы","time":"14:30 - 15:30","maxParticipants":12,"currentParticipants":10},{"id":5,"name":"Бокс","time":"16:00 - 17:00","maxParticipants":8,"currentParticipants":6}]';

//ключ для хранения данных в localStorage
const lsKey = "lesson";
const userKey = "user";

if (!localStorage.getItem(lsKey)) {
    localStorage.setItem(lsKey, initialSchedule);
}
    
const scheduleTable = document.querySelector(".scheduleBody");
const lessons = JSON.parse(localStorage.getItem(lsKey));

// Проверяем, записан ли пользователь на занятие при загрузке страницы
const userData = JSON.parse(localStorage.getItem(userKey)) || [];
lessons.forEach((item) => {
    // вставляем строку
    const row = scheduleTable.insertRow();
    //вставляем начальные данные. в скобках номер ячейки в ряду
    row.insertCell(0).textContent = item.name;
    row.insertCell(1).textContent = item.time;
    row.insertCell(2).textContent = item.maxParticipants;
    row.insertCell(3).textContent = item.currentParticipants;

    //вставляем данные: действия - записаться или отменить запись
    const actionsCell = row.insertCell(4);

    // кнопка записаться
    const btnSignup = document.createElement("button");
    btnSignup.textContent = "Записаться";

    // Проверяем, записан ли пользователь на это занятие или достигнуто максимальное количество участников
    const isUserSignedUp = userData.includes(item.id);
    btnSignup.disabled = isUserSignedUp || item.currentParticipants >= item.maxParticipants;

    //добавляем кнопку в ячейку
    actionsCell.appendChild(btnSignup);

    //кнопка отмены записи
    const btnCancel = document.createElement("button");
    btnCancel.textContent = "Отменить запись";

    // Проверяем, записан ли пользователь на это занятие для активации/деактивации кнопки отмены записи
    btnCancel.disabled = !isUserSignedUp;

    //добавляем кнопку в ячейку
    actionsCell.appendChild(btnCancel);

    // Обработчики событий для кнопок
    btnSignup.addEventListener("click", () => {
        if (!isUserSignedUp && item.currentParticipants < item.maxParticipants) {
            item.currentParticipants++;
            userData.push(item.id);
            localStorage.setItem(userKey, JSON.stringify(userData));
            localStorage.setItem(lsKey, JSON.stringify(lessons));
            // Обновляем состояние кнопок
            btnSignup.disabled = true;
            btnCancel.disabled = false;
            // Обновляем значение в столбце "Текущее количество"
            row.cells[3].textContent = item.currentParticipants;
        }
    });

    btnCancel.addEventListener("click", () => {
        const index = userData.indexOf(item.id);
        if (index !== -1) {
            userData.splice(index, 1);
            localStorage.setItem(userKey, JSON.stringify(userData));
            // Обновляем состояние кнопок
            btnSignup.disabled = false;
            btnCancel.disabled = true;
            // Обновляем значение в столбце "Текущее количество"
            item.currentParticipants--;
            row.cells[3].textContent = item.currentParticipants;
        }
        if (localStorage.getItem(lsKey)) {
            const lessonsData = JSON.parse(localStorage.getItem(lsKey));
            const lessonIndex = lessonsData.findIndex(lesson => lesson.id === item.id);
            if (lessonIndex !== -1) {
                lessonsData[lessonIndex].currentParticipants--;
                localStorage.setItem(lsKey, JSON.stringify(lessonsData));
            }
        }
    });
});