"use strict";

// initialis
var grid = document.querySelector('.grid');
var gridItem = grid.querySelector('.grid__item'); // storage

var storage = {};
var col = 36;

for (var i = 0; i < col; i++) {
  var li = document.createElement('li');
  li.setAttribute('id', i);
  li.innerHTML = "".concat(i + 1);
  gridItem.appendChild(li);
}

gridItem.querySelector('li').classList.add('active');
var item = gridItem.querySelectorAll('li');
var w = gridItem.clientWidth; // number of cells in a row

var cells = parseInt(w / 120); // move

var moveRect = function moveRect(e) {
  var active = gridItem.querySelector('.active');
  var num = parseInt(active.getAttribute('id')) + 1;
  var plus = parseInt(num + cells - 1);
  var minus = parseInt(num - cells - 1);

  switch (e.keyCode) {
    case 37:
      // left
      if (!!active.previousElementSibling) {
        active.classList.remove('active');
        active.previousElementSibling.classList.add('active');
      }

      break;

    case 38:
      // up
      if (!!item[minus]) {
        active.classList.remove('active');
        item[minus].classList.add('active');
      }

      break;

    case 39:
      // right
      if (!!active.nextElementSibling) {
        active.classList.remove('active');
        active.nextElementSibling.classList.add('active');
      }

      break;

    case 40:
      // down
      if (!!item[plus]) {
        active.classList.remove('active');
        item[plus].classList.add('active');
      }

      break;
  }
};

addEventListener("keydown", moveRect); // change text cells

var changeCells = function changeCells(e) {
  var active = gridItem.querySelector('.active');

  if (e.keyCode === 32) {
    var storeLength = Object.keys(storage).length;

    if (storeLength < 2) {
      if (!storage.first) {
        storage.first = {
          id: active.getAttribute('id'),
          text: active.innerHTML
        };
        active.classList.add('buzz');
      } else {
        if (storage.first.id !== active.getAttribute('id')) {
          item[storage.first.id].classList.remove('buzz');
          item[storage.first.id].innerHTML = active.innerHTML;
          item[active.getAttribute('id')].innerHTML = storage.first.text;
          storage = {};
        }
      }
    }
  }
};

addEventListener("keydown", changeCells);