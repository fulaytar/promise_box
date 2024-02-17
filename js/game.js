/**
 * Напиши програмне забезпечення для ігрового автомата.
 * Для вирішення завдання використай готову розмітку HTML та базову стилізацію.
 *
 * Після натиснення на кнопку "Start game"
 * в кожному віконці по черзі має з'являтись
 * смайлик з затримкою в 1 секунду ('🤑' або '👿')
 *
 * Під час обробки кожного віконця створи масив з Promis-ами
 * в якому кожен з них буде відповідати за своє віконце,
 * після чого оброби даний масив за допомогою методу Promise.allSettled
 *
 * Після того як всі віконця були заповнені потрібно
 * щоб скріпт автоматично визначав чи гравець переміг, чи ні.
 * Якщо в кожному віконці однаковий смайлик це означає що користувач переміг
 *
 * В поле result виводить повідомлення про статус гри ('Winner' або 'Loser')
 *
 * Після повторного натискання на кнопку "Start game"
 * поле має очищатись, а гра починатись з початку.
 */

/*

1. Вішаємо обробник подій по кліку на кнопку старт
1.1. створюємо масив всіх квадратиків ([...container.children])
1.2. викликаємо метод map для перебору масиву квадратиків з ціллю перетворити його на масив з промісами
1.2.1. створюємо проміс у якому рандомно задаємо смайлик

1.3. викликаємо статичний метод Promise.allSettled, чекаємо виконання всіх промісів і оброблюємо результат в методі then
1.3.1. перебираємо масив промісів та з затримкою в 1 секунду задаємо текстКонтент кожному квадратику у відповідності до смайлику
1.3.2. перевіряємо переможця: якщо кожен проміс з масиву має один й тей сами стан - то ми перемогли (якщо всі fullfilled або якщо всі rejected) і відповідно показуємо текст на екрані через текстКонент 
*/

const startBtn = document.querySelector(".start-btn");
const container = document.querySelector(".container");
const result = document.querySelector(".result");


function handlerDelay() {
    // Встановлюємо кнопку неактивною
    startBtn.disabled = true;

    // Чекаємо 3 секунди, потім робимо кнопку активною знову
    setTimeout(function() {
        startBtn.disabled = false;
    }, 3000);
}

// Додаємо обробник події на клік
startBtn.addEventListener('click', handlerDelay);


startBtn.addEventListener('click', handlerStart)

function handlerStart() {
    result.textContent = "";
const promises = [...container.children].map(item => {
    return new Promise((res, rej) =>(Math.random()>0.5?res("🤑"):rej("👿")))
})
    
    Promise.allSettled(promises).then((items) => {
        const isWinner = items.every(({ status }) => status === "fulfilled") || items.every(({ status }) => status === "rejected");

        items.forEach((item, i) => {
            container.children[i].textContent = ""; //очищення смайлів 
            setTimeout(() => {
                container.children[i].textContent = item.value || item.reason;

                //перевірка , що це останній смайлик
                if (i === items.length - 1) {
                    result.textContent = isWinner ? "Winner" : "Loser";
                }
            },1000+(1000*i))
        })
    })
}
