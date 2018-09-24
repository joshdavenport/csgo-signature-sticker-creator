class InferfaceSave {

	constructor (stickerGenerator) {
		this.stickerGenerator = stickerGenerator;
		document.getElementById('button-download').addEventListener('click', this.download.bind(this), false);
	}

	download (e) {
		e.currentTarget.href = this.stickerGenerator.canvas.getComposite();
	}			

}

export default InferfaceSave