const btn = document.querySelector('.j-btn-test');
const btn1 = document.querySelector('.j-btn-test1');
const chn = document.querySelector('.btn_icon');

 
var num = 1;
btn.addEventListener('click', () => {  
  if (num == 1){
      num = 2;
      chn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-5.904-2.803a.5.5 0 1 1 .707.707L6.707 10h2.768a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.525a.5.5 0 0 1 1 0v2.768l4.096-4.096z"/>
  </svg>`  
      btn.classList.toggle('btn--magic');  
    }else{
      num = 1;
      chn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-5.904-2.854a.5.5 0 1 1 .707.708L6.707 9.95h2.768a.5.5 0 1 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.475a.5.5 0 1 1 1 0v2.768l4.096-4.097z"/>
  </svg>`
  btn.classList.toggle('btn--magic');
    }
});

btn1.addEventListener('click', () => {
  const w = window.screen.width;
  const h = window.screen.height;
  alert("Ширина: "+w+" Высота: "+h);
});


var geo;

const status = document.querySelector('#status');
const mapLink = document.querySelector('#map-link');
const btn2 = document.querySelector('.j-btn-test2');

// Функция, выводящая текст об ошибке
const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
  geo = `Широта: ${latitude} °, Долгота: ${longitude} °`
  mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  mapLink.textContent = 'Ссылка на карту';
}

btn2.addEventListener('click', () => {
  mapLink.href = '';
  mapLink.textContent = '';
  
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});







const wsUri = "wss://echo.websocket.org/";

const output = document.getElementById("output");
const btnOpen = document.querySelector('.j-btn-open');
const btnClose = document.querySelector('.j-btn-close');
const btnSend = document.querySelector('.j-btn-send');
const btnSendGeo = document.querySelector('.j-btn-geo');

let websocket;

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
}

btnOpen.addEventListener('click', () => {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) {
    writeToScreen("CONNECTED");
  };
  websocket.onclose = function(evt) {
    writeToScreen("DISCONNECTED");
  };
  websocket.onmessage = function(evt) {
    writeToScreen(
      '<span style="color: blue;">RESPONSE: ' + evt.data+'</span>'
    );
  };
  websocket.onerror = function(evt) {
    writeToScreen(
      '<span style="color: red;">ERROR:</span> ' + evt.data
    );
  };
});

btnClose.addEventListener('click', () => {
  websocket.close();
  websocket = null;
});

// geo

btnSend.addEventListener('click', () => {
  const value = document.querySelector('.input').value;
  const message = value;
  writeToScreen("SENT: " + message);
  websocket.send(message);
});

btnSendGeo.addEventListener('click', () => {
  const message = geo;
  writeToScreen("SENT: " + message);
  websocket.send(message);
});