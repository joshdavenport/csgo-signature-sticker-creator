import $ from 'jquery';

class InterfaceBackground {

	constructor (stickerGenerator) {
		this.stickerGenerator = stickerGenerator;

		this.bgTypeDropdown = document.getElementById('config-bg-type');
		this.bgColorInput = document.getElementById('config-bg-color');

		this.bgTypeDropdown.addEventListener('change', this.handleBgTypeChange.bind(this), false);

		this.bgColorInput.value = this.stickerGenerator.canvas.base.color;
		// $(this.bgColorInput).parent()
		// 	.colorpicker({ format: 'hex' })
		// 	.on('changeColor.colorpicker', this.handleBgColorChange);
	}

	handleBgTypeChange (e) {
		var $bgFormGroups = $('.form-group-bg');
		$bgFormGroups
			.addClass('hidden')
			.filter('.form-group-bg-' + this.bgTypeDropdown.options[this.bgTypeDropdown.selectedIndex].value)
				.removeClass('hidden');

		if(this.bgTypeDropdown.value == 'transparent') {
			this.canvas.Base.color = 'transparent';
		} else {
			// this.interface.Background.bgTypeDropdown.handleBgColorChange({ color: this.interface.Background.bgColorInput.value });
			$(this.bgColorInput).trigger('change');
		}
		this.canvas.loadBase();
	}

	handleBgColorChange (e) {
		this.canvas.Base.color = e.color.toHex();
		this.canvas.loadBase();
	}

}

export default InterfaceBackground