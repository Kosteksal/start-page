const time = document.querySelector('.time');
const minute = document.querySelector('.minute');
const day = document.querySelector('.date');
const daay = document.querySelector('.day');
const bg = document.querySelector('body');
const locat = document.querySelector('.location');
const weatherLink = document.querySelector('.weather');
const autoBG = document.querySelector('.autobg');

const dayArr = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

const bgArr = ['url(img/bg.jpg)', 'url(img/bg1.jpg)', 'url(img/bg2.jpg)', 'url(img/bg3.jpg)', 'url(img/bg4.jpg)', 'url(img/bg5.jpg)', 'url(img/bg6.jpg)'];
const locArr = ['498817', '508743'];
let loc = 0;


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
    fetch(`http://api.openweathermap.org/data/2.5/weather?id=${locArr[loc]}&lang=ru&appid=d80709219b6c9b44b56a4efb56630966`).then(function (resp) {return resp.json() }).then(function (data) {
    document.querySelector('.city').textContent = data.name;
    document.querySelector('.forecast').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
    document.querySelector('.desc').textContent = data.weather[0]['description'];
    document.querySelector('.icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
    document.querySelector('.wind').textContent = `Ветер ${data.wind['speed']} М/С`;
    document.querySelector('.hudm').innerHTML =`Влажность ${data.main.humidity} %`;
    console.log(data);
    })
    .catch(function () {
    });
    
  }
  getData();


const SL = document.querySelector('.SL');
const SR = document.querySelector('.SR');
SL.addEventListener('click', moveL);
SR.addEventListener('click', moveR);

function moveL () {
    if (bgNum == 0) {
        bgNum = bgArr.length -1;
    } else {
        bgNum --;
    };
    bg.style.backgroundImage = bgArr[bgNum];
}

function moveR () {
    if (bgNum == bgArr.length - 1) {
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
    localStorage.setItem('loc', loc);
    localStorage.setItem('slide', autoBG.checked);
  };

  let slideCheck;

  function getLocalStorage() {
    bgNum = localStorage.getItem('bg');
    if (bgNum == null) {bgNum = 0};
    bg.style.backgroundImage = bgArr[bgNum];

    loc = localStorage.getItem('loc');
    if (loc == null) {loc = 0};
    getData();
    weatherLink.href = `https://openweathermap.org/city/${locArr[loc]}`;

    slideCheck = localStorage.getItem('slide');
    console.log(slideCheck);
    
    if (slideCheck == 'true') {
        autoBG.checked = true;
        autoBack();
    }
    
  };


  window.addEventListener('beforeunload', setLocalStorage);

  window.addEventListener('load', getLocalStorage);


  locat.addEventListener('click', locator);

  function locator () {
    if (loc == locArr.length - 1) {
        loc = 0;
    } else {loc ++};
    getData();
    weatherLink.href = `https://openweathermap.org/city/${locArr[loc]}`;
    
  }

  let slideID;

  autoBG.addEventListener('click', autoBack);

  function autoBack () {
      if (autoBG.checked == 0) {
       clearInterval(slideID);
      };

      if (autoBG.checked == 1) {
       slideID = setInterval(slideShow, 6000);
      }

  }

  

  function slideShow () {
      moveR();
  }