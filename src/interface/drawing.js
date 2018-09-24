class InferfaceDrawing {

	constructor(stickerGenerator) {
		this.stickerGenerator = stickerGenerator;

		this.brushSizeInput = document.getElementById('config-size-text');
		this.brushSizeSlider = document.getElementById('config-size-range');

		document.getElementById('button-clear').addEventListener('click', this.reset.bind(this), false);
		document.getElementById('button-undo').addEventListener('click', this.undo.bind(this), false);
		
		// Declaring more event listeners
		this.brushSizeSlider.addEventListener('change', this.sizeSelectRange.bind(this), false);
		this.brushSizeInput.addEventListener('keyup', this.sizeSelectText.bind(this), false);
		this.brushSizeSlider.value = this.stickerGenerator.canvas.brush.normal.size;
		this.brushSizeInput.value = this.stickerGenerator.canvas.brush.normal.size;
	}	

	undo () {
		this.stickerGenerator.history.undo();
	}

	redo () {
		this.stickerGenerator.history.redo();
	}

	reset () {
		this.stickerGenerator.canvas.reset();
	}

	sizeSelectRange () {
  		this.brushSizeInput.value = this.brushSizeSlider.value;
		this.stickerGenerator.canvas.setBrushSize(this.brushSizeInput.value);
	}

	sizeSelectText () {
	  	this.brushSizeSlider.value = parseInt(this.brushSizeInput.value, 10);
	  	this.stickerGenerator.canvas.setBrushSize(this.brushSizeInput.value);
	}

}

export default InferfaceDrawing