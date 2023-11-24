const remainingDiv = document.getElementById('remainingDiv');
const remainingForm = document.getElementById('remainingForm');
const dateInput = document.getElementById('datePicker');
const timeDiv = document.getElementById('timeDiv');
const timeSpans = document.querySelectorAll('.timeSpan');
const resetBtn = document.getElementById('resetBtn');
const completeDiv = document.getElementById('complete');
const completeBtn = document.getElementById('completeBtn');

let chosenDate = '';
let currentDateValue = new Date().getTime();
let currentTimeInterval;
let localStorageTime;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const today = new Date().toISOString().split('T')[0];

dateInput.setAttribute('min', today);



function updateDOM() {
  currentTimeInterval = setInterval(() => {
    const now = new Date().getTime();
    const betweenDate = currentDateValue - now;

    const days = Math.floor(betweenDate / day);
    const hours = Math.floor((betweenDate % day) / hour);
    const minutes = Math.floor((betweenDate % hour) / minute);
    const seconds = Math.floor((betweenDate % minute) / second);

    remainingDiv.hidden = true;

    if(betweenDate < 0)
    {
        timeDiv.hidden = true;
        clearInterval(currentTimeInterval);
        completeDiv.hidden = false;
    }
    else {
        timeDiv.hidden = false;
        
        timeSpans[0].textContent = `${days}`;
        timeSpans[1].textContent = `${hours}`;
        timeSpans[2].textContent = `${minutes}`;
        timeSpans[3].textContent = `${seconds}`;
    };
  }, 1000);
};

function calculateTime(e) {
    e.preventDefault();
    chosenDate = remainingForm.date.value;

    localStorageTime = {
        date: chosenDate,
    };
    localStorage.setItem('time', JSON.stringify(localStorageTime));
    if (chosenDate == '') {
        alert('Please select date!');
  } else {
    currentDateValue = new Date(chosenDate).getTime();
    updateDOM();
  }
};


function reset() {
    timeDiv.hidden = true;
    completeDiv.hidden = true;
    remainingDiv.hidden = false;
    clearInterval(currentTimeInterval);
    localStorage.removeItem('time');
};

function refreshTime() {
    if(localStorage.getItem('time'))
    {
        remainingDiv.hidden = true;
        localStorageTime = JSON.parse(localStorage.getItem('time'));
        chosenDate = localStorageTime.date;
        currentDateValue = new Date(chosenDate).getTime();
        updateDOM();
    }
};

remainingForm.addEventListener('submit', calculateTime);
resetBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

refreshTime();