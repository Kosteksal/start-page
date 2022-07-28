const time = document.querySelector('.time');
const minute = document.querySelector('.minute');
const day = document.querySelector('.date');
const daay = document.querySelector('.day');
const bg = document.querySelector('body');

const dayArr = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

const bgArr = ['url(img/bg.jpg)', 'url(img/bg1.jpg)', 'url(img/bg2.jpg)', 'url(img/bg3.jpg)',];



function clock(){
var date = new Date(),
         hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
         minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
         seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
         days = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate(),
         months = (date.getMonth() < 10) ? '0' + date.getMonth() : date.getMonth(),
    time.innerText = `${hours} : ${minutes}`;
    day.innerText = `${days} . ${months} . ${date.getFullYear()}`;
    daay.innerText = dayArr[date.getDay()];

}
setInterval(clock, 1000);

async function getData() {
    fetch('http://api.openweathermap.org/data/2.5/weather?id=498817&lang=ru&appid=d80709219b6c9b44b56a4efb56630966').then(function (resp) {return resp.json() }).then(function (data) {
    //добавляем название города
    document.querySelector('.city').textContent = data.name;
    //data.main.temp содержит значение в Кельвинах, отнимаем от  273, чтобы получить значение в градусах Цельсия
    document.querySelector('.forecast').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
    //Добавляем описание погоды
    document.querySelector('.desc').textContent = data.weather[0]['description'];
    //Добавляем иконку погоды
    document.querySelector('.icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
    document.querySelector('.wind').textContent = `Ветер ${data.wind['speed']} М/С`;
    document.querySelector('.hudm').innerHTML =`Влажность ${data.main.humidity} %`;
    console.log(data);
    })
    .catch(function () {
        //Обрабатываем ошибки
    });
    
  }
  getData();


const SL = document.querySelector('.SL');
const SR = document.querySelector('.SR');
SL.addEventListener('click', moveL);
SR.addEventListener('click', moveR);

function moveL () {
    if (bgNum == 0) {
        bgNum = bgArr.length;
    } else {
        bgNum --;
    };
    bg.style.backgroundImage = bgArr[bgNum];
}

function moveR () {
    if (bgNum == bgArr.length) {
        bgNum = 0;
    } else {
        bgNum ++;
    };
    bg.style.backgroundImage = bgArr[bgNum];
}

let bgNum = 0;

// bg.style.backgroundImage = bgArr[bgNum];
  
function setLocalStorage() {
    localStorage.setItem('bg', bgNum);
  };

  function getLocalStorage() {
    bgNum = localStorage.getItem('bg');
    if (bgNum == null) {bgNum = 0};
    bg.style.backgroundImage = bgArr[bgNum];
  };

  window.addEventListener('beforeunload', setLocalStorage);

  window.addEventListener('load', getLocalStorage);