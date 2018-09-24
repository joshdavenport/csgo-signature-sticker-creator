// css
import './assets/css/main.scss';
// external libs
import $ from 'jquery';
// main classes
import Canvas from './canvas';
import Sticker from './sticker';
import Interface from './interface';
import History from './history';

class StickerGenerator {

	constructor () {
		this.history = new History(this);
		this.sticker = new Sticker(this);
		this.canvas = new Canvas(this);
		this.interface = new Interface(this);
	}

}


$(function () {
	var stickerGenerator = new StickerGenerator();
});

/*
// canvas size


var allInputs = document.querySelectorAll('input[type="text"]');
// Change input value
// If key up or key right >> input value +1
// If key down or key left >> input value -1
for(i = 0; i < allInputs.length; i++) {
  allInputs[i].addEventListener('keydown', function (ev){
    ev = ev || window.event;
    // Check if value is number
      if(!isNaN(this.value)){
      // Read keyCode from event and when it's arrow up or right, value will increment
      if(ev.keyCode == '38' || ev.keyCode == '39'){
        ++this.value;
      }
      // If event keyCode will be from arrow down or left, value will decrement
      else if(ev.keyCode == '40' || ev.keyCode == '37'){
        // Check if value isn't zero. If is value stay same.
        if(this.value !== 0){
          --this.value;
        }
      }
    }
    // If value isn't number
    else {
      return false;
    }
  }, false);
}
*/
