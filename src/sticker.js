class Sticker {

	constructor (stickerGenerator) {
		this.stickerGenerator = stickerGenerator;
		
		this.width = 192;
		this.height = 192;
		this.src = false;
		this.major = false;
		this.team = false;
	}

	loadStickerSrc () {
		if(this.major && this.team) {
			this.src = 'assets/images/library/' + this.major + '/' + this.team + '.png';
			this.element.src = this.src;
		} else {
			this.src = '';
		}

		return this.src;
	}

	get element () {
		return document.getElementById('sticker-img')
	}

}

export default Sticker;