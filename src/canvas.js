import $ from 'jquery';
import _ from 'lodash';
import { stackBlurCanvasRGBA } from './helpers';

class Canvas {

	constructor(stickerGenerator) {
		this.stickerGenerator = stickerGenerator;

		var self = this;

		this.width = 280;
		this.height = 280;
		this.x = 0;
		this.y = 0;

		this.active = false;
		this.first = true;

		this.base = {
			color: '#a6a6a6'
		};
		this.brushSize = 2;

		this.reset(true);

		// Blur previw
		var blurFilter = 'blur(' + this.brush.glow.blur + 'px)';
		if('webkitFilter' in this.element.glow.style) {
			this.element.glow.style.webkitFilter = blurFilter;
		} else if('filter' in this.element.glow.style) {
			this.element.glow.style.filter = blurFilter;
		} else {
			this.element.glow.style.display = 'none';
		}

		this.stickerGenerator.sticker.element.onload = function () {
			self.loadBase();
		};
		this.loadBase();

		// // Drawing events
		var self = this;
		this.element.line.addEventListener('mousedown', this.startDrawing.bind(this), false);
		this.element.line.addEventListener('touchstart', this.startDrawing.bind(this), false);
		this.element.line.addEventListener('click', function () { return false; }, false);
		this.element.line.addEventListener('touch', function () { return false; }, false);
		this.element.line.addEventListener('mouseup', this.endDrawing.bind(this), false);
		this.element.line.addEventListener('mouseout', function () {
			if(this.active) {
				this.endDrawing().bind(self);
			}
		}, false);
		this.element.line.addEventListener('touchend', this.endDrawing.bind(this), false);
		window.addEventListener('scroll', _.throttle(this.endDrawing.bind(this), 100), false);
		this.element.line.addEventListener('mousemove', this.draw.bind(this), false);
		this.element.line.addEventListener('touchmove', this.draw.bind(this), false);
	}

	get brush () {
		var self = this;
		return {
			normal: {
				size: self.brushSize
			},
			shadow: {
				get size () {
					// console.log(this);
					return self.brush.normal.size * 1.4  - (0.25 * self.brush.normal.size);
				},
				get addX () {
					return self.brush.normal.size * 1.2 - (0.35 * self.brush.normal.size);
				},
				get addY () {
					return self.brush.normal.size * 1.2 - (0.35 * self.brush.normal.size);
				},
			},
			glow: {
				blur: 6,
				scale: 0.2
			}
		}
	}

	setBrushSize (size) {
		this.brushSize = size;
	}

	// Getter for canvas elements
    get element () {
		return {
			$container: $('#canvas-container'),
			base: document.getElementById('canvas-base'),
			line: document.getElementById('canvas-line'),
			shadow: document.getElementById('canvas-shadow'),
			glow: document.getElementById('canvas-glow'),
			blur: document.getElementById('canvas-blur'),
			composite: document.getElementById('canvas-composite')
		}
    }

    // Getter for canvas contexts
	get context () {
		return {
			base: this.element.base.getContext('2d'),
			line: this.element.line.getContext('2d'),
			shadow: this.element.shadow.getContext('2d'),
			glow: this.element.glow.getContext('2d'),
			blur: this.element.blur.getContext('2d'),
			composite: this.element.composite.getContext('2d')
		}
	}

	startDrawing () {
		this.active = true;
		this.stickerGenerator.history.lastAction = false;
	}

	endDrawing () {
	  	this.first = true;
	  	this.active = false;
	  	// TODO: this triggers if you've drawn or not. Fix!!
	  	this.stickerGenerator.history.saveState();
	}

	draw (ev) {
	  	// Check if mouse is down or not
	  	if(this.active) {
	  		var containerOffset = this.element.$container.offset(),
	  			scrollTop = window.scrollY;
	    	if (this.first) {
	      		// Return mouse X position to var x
	      		this.x = ev.clientX - containerOffset.left;
	      		// Return mouse Y position to var y
	      		this.y = ev.clientY - containerOffset.top + scrollTop;
	      		this.first = false;
	    	} else {
	      		// Calling of brush function
				this.normalBefore();
				this.shadowBefore();
				this.glowBefore();
				this.x = ev.clientX - containerOffset.left;
				this.y = ev.clientY - containerOffset.top + scrollTop;
				// Calling of other brush function
				this.normalAfter();
				this.shadowAfter();
				this.glowAfter();
				// Calling of brush function 
	    	}
	  	}
	}

	reset (initial) {
		console.log(this);
		this.element.line.width = this.element.shadow.width = this.element.glow.width = this.element.blur.width = this.element.composite.width = this.width;
		this.element.line.height = this.element.shadow.height = this.element.glow.height = this.element.composite.height = this.element.blur.height = this.height;
		if(initial === true) {
			this.element.base.width = this.width;
			this.element.base.height = this.height;
		}
	}

	loadBase () {
		this.context.base.clearRect(0, 0, this.width, this.height);
		this.context.base.rect(0, 0, this.width, this.height);
		this.context.base.fillStyle = this.base.color;
		this.context.base.fill();

		if(this.stickerGenerator.sticker.src) {
			var scaleSticker = 1.1420,
				width = this.stickerGenerator.sticker.width * scaleSticker,
				height = this.stickerGenerator.sticker.height * scaleSticker,
				stickerX = (this.width / 2) - (width / 2),
				stickerY = (this.height / 2) - (height / 2);
			this.context.base.drawImage(this.stickerGenerator.sticker.element, stickerX, stickerY, width, height);
			this.sharpenBase(width, height, 0);
		}
	}

	sharpenBase (w, h, mix) {
   
	}

	normalBefore () {
		this.context.line.strokeStyle = '#fff';
		this.context.line.beginPath();
		this.context.line.lineWidth = this.brush.normal.size;
		this.context.line.moveTo(this.x, this.y);
		this.context.line.lineCap = 'round';
	}

	normalAfter () {
		this.context.line.lineTo(this.x, this.y);
		this.context.line.stroke();
	}

	shadowBefore () {
		this.context.shadow.strokeStyle = '#000';
		this.context.shadow.beginPath();
		this.context.shadow.lineWidth = this.brush.shadow.size;
		this.context.shadow.moveTo(this.x + this.brush.shadow.addX, this.y + this.brush.shadow.addY);
		this.context.shadow.lineCap = 'round';
	}

	shadowAfter () {
		this.context.shadow.lineTo(this.x + this.brush.shadow.addX, this.y + this.brush.shadow.addY);
		this.context.shadow.stroke();
	}

	glowBefore () {
		this.context.glow.strokeStyle = 'rgba(255,255,255,0.8)';
		this.context.glow.beginPath();
		this.context.glow.lineWidth = this.brush.normal.size - (this.brush.normal.size * this.brush.glow.scale);
		this.context.glow.moveTo(this.x, this.y);
		this.context.glow.lineCap = 'round';
	}

	glowAfter () {
		this.context.glow.lineTo(this.x, this.y);
		this.context.glow.stroke();
	}

	getComposite () {
		var self = this;
		// Clear composite canavses
		this.context.composite.clearRect(0, 0, this.width, this.height);
		this.context.blur.clearRect(0, 0, this.width, this.height);
		// $('<img src="' + this.element.glow.toDataURL('image/png') + '">').appendTo($('body'));
		this.context.blur.drawImage($('<img src="' + this.element.glow.toDataURL('image/png') + '">').get(0), 0, 0, this.width, this.height);
		// Copy the glow and blur it
		this.context.blur.drawImage($('<img src="' + this.element.glow.toDataURL('image/png') + '">').get(0), 0, 0);
		stackBlurCanvasRGBA(this.context.blur, 0, 0, this.width, this.height, 9);
		// Combine all images into the composite canvas
		[this.element.base.toDataURL('image/png'),
		 this.element.blur.toDataURL('image/png'),
		 this.element.shadow.toDataURL('image/png'),
		 this.element.line.toDataURL('image/png') ].forEach(function (dataUrl) {
			self.context.composite.drawImage($('<img src="' + dataUrl + '">').get(0), 0, 0);
		});
		// Return a data URL for the composotied image
		return this.element.composite.toDataURL('image/png');
	}
}

export default Canvas;