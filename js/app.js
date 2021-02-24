'use strict';

let maxClicks = 25;
let attempts = 1;

let container = document.getElementById('container');

let leftImg = document.getElementById('left');
let centerImg = document.getElementById('center');
let rightImg = document.getElementById('right');
let list = document.getElementById('list');

function randomIndex(){
  let randomIndex = Math.floor(Math.random() * objectArr.length);
  return randomIndex;
}

let nameArr =[];
let votesArr =[];
let viewsArr =[];
let objectArr = [];
function Product (name, src){
  this.name = name;
  this.src = src;
  this.votes = 0;
  this.views = 0;
  nameArr.push(this.name);
  objectArr.push(this);
}

new Product ('bag','img/bag.jpg');
new Product ('banana','img/banana.jpg');
new Product ('boots','img/boots.jpg');
new Product ('bathroom','img/bathroom.jpg');
new Product ('breakfast','img/breakfast.jpg');
new Product ('bubblegum','img/bubblegum.jpg');
new Product ('chair','img/chair.jpg');
new Product ('dog duck','img/dog-duck.jpg');
new Product ('dragon','img/dragon.jpg');
new Product ('pen','img/pen.jpg');
new Product ('pet-sweep','img/pet-sweep.jpg');
new Product ('scissors','img/scissors.jpg');
new Product ('shark','img/shark.jpg');
new Product ('sweep','img/sweep.png');
new Product ('tauntaun','img/tauntaun.jpg');
new Product ('toy','img/toy.jpg');
new Product ('unicorn','img/unicorn.jpg');
new Product ('usb','img/usb.gif');
new Product ('water-can','img/water-can.jpg');
new Product ('wine-glass','img/wine-glass.jpg');


let leftIndex;
let centerIndex;
let rightIndex;
let imgDiff=[];
function renderImages(){
  leftIndex = randomIndex();
  centerIndex = randomIndex();
  rightIndex = randomIndex();

  while((leftIndex === rightIndex)||(leftIndex===centerIndex)||(centerIndex===rightIndex)||(imgDiff.includes(leftIndex))||(imgDiff.includes(centerIndex))||(imgDiff.includes(rightIndex))){
    leftIndex = randomIndex();
    centerIndex = randomIndex();
    rightIndex = randomIndex();
  }
  leftImg.setAttribute('src', objectArr[leftIndex].src);
  centerImg.setAttribute('src', objectArr[centerIndex].src);
  rightImg.setAttribute('src', objectArr[rightIndex].src);
  objectArr[leftIndex].views++;
  objectArr[centerIndex].views++;
  objectArr[rightIndex].views++;
  imgDiff=[leftIndex,centerIndex,rightIndex];
  console.log(imgDiff);
}


renderImages();

container.addEventListener('click',favoriteProduct);

function favoriteProduct(event){
  event.preventDefault();
  console.log(attempts);
  if(attempts <= maxClicks){
    if(event.target.id === 'left'){
      objectArr[leftIndex].votes++;
      attempts++;
      renderImages();
    }else if(event.target.id === 'center'){
      objectArr[centerIndex].votes++;
      attempts++;
      renderImages();
    }
    else if(event.target.id === 'right'){
      objectArr[rightIndex].votes++;
      attempts++;
      renderImages();
    }
  }
  if(attempts === maxClicks){
    container.removeEventListener('click',favoriteProduct);
    saveVotes();
  }
}
let ulEl;
let li;

function viewResults(){
  if(attempts === maxClicks){
    ulEl = document.createElement('ul');
    list.appendChild(ulEl);
    for(let i = 0 ; i < objectArr.length; i++){
      li = document.createElement('li');
      ulEl.appendChild(li);
      votesArr.push(objectArr[i].votes);
      viewsArr.push(objectArr[i].views);
      li.textContent = `${objectArr[i].name} had ${objectArr[i].votes} votes, and was seen ${objectArr[i].views} times.`;
    }
    attempts=0;
    var mallChart = document.getElementById('mallChart').getContext('2d');
    var chart = new Chart(mallChart, {
      type: 'bar',
      data: {
        labels: nameArr,
        datasets: [{
          label: 'Votes',
          backgroundColor: '#75cfb8',
          data: votesArr,
        },{
          label: 'Views',
          backgroundColor: '#f2c6b4',
          data:viewsArr,
        }]
      },
    }
    );
  }
}

function saveVotes(){
  if (result){
    for(let i = 0 ; i < objectArr.length; i++){
      objectArr[i].votes=parseInt( result[i].votes)+ parseInt( objectArr[i].votes);
      objectArr[i].views=parseInt( result[i].views)+ parseInt( objectArr[i].views);
    }
  }
  let votesNum = JSON.stringify(objectArr);
  localStorage.setItem('votesNum', votesNum);
}
let result;
function getVotes(){
  let gettingVotes = localStorage.getItem('votesNum');
  result = JSON.parse(gettingVotes);
}
getVotes();
