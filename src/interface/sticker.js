import majorLibrary from '../major-library';

class InterfaceSticker {

	constructor(stickerGenerator) {
		this.stickerGenerator = stickerGenerator;

		this.majorDropdown = document.getElementById('config-major');
		this.teamDropdown = document.getElementById('config-team');

		this.addMajorDropdownValues();

		this.majorDropdown.addEventListener('change', this.handleMajorChange.bind(this));
		this.teamDropdown.addEventListener('change', this.handleTeamChange.bind(this));
	}

	addMajorDropdownValues () {
		var self = this;
		Object.keys(majorLibrary.majors).forEach(function (key) {
			var relevantMajorLibrary = majorLibrary.majors[key],
				majorOption = document.createElement('option');
			majorOption.value = key;
			majorOption.text = relevantMajorLibrary.name;
			self.majorDropdown.add(majorOption);
		});
	}

	handleMajorChange () {
		var self = this,
			oldTeamOption = this.teamDropdown.options[this.teamDropdown.selectedIndex].value,
			selectedMajorLibrary = majorLibrary.majors[this.majorDropdown.options[this.majorDropdown.selectedIndex].value];

		// Remove all current teams, length of 1 to keep the label option
		this.teamDropdown.options.length = 1;

		if(this.majorDropdown.selectedIndex == 0) {
			this.stickerGenerator.sticker.major = false;
			return;
		}

		if(!selectedMajorLibrary || selectedMajorLibrary.length == 0) {
			return;
		}

		selectedMajorLibrary.teams.forEach(function (team) {
			var selectedTeamLibrary = majorLibrary.teams[team],
				teamOption = document.createElement('option');

			if(!selectedTeamLibrary) {
				console.error('Missing team definition for "' + team + '"');
				return;
			}

			teamOption.value = team;
			teamOption.text = selectedTeamLibrary.name;
			if(team == selectedMajorLibrary.winner) {
				teamOption.text += " \uD83D\uDC51";
			}
			self.teamDropdown.add(teamOption);
			self.teamDropdown.selectedIndex = 0;
		});

		if(oldTeamOption !== '') {
			Object.keys(this.teamDropdown.options).forEach(function (idx) {
				if(self.teamDropdown.options[idx].value == oldTeamOption) {
					self.teamDropdown.selectedIndex = idx;
				}
			});
		}

		this.handleTeamChange.apply(this);
	}

	handleTeamChange () {
		if(this.teamDropdown.selectedIndex == 0) {
			this.stickerGenerator.sticker.team = false;
		}

		this.stickerGenerator.sticker.major = this.majorDropdown.options[this.majorDropdown.selectedIndex].value;
		this.stickerGenerator.sticker.team = this.teamDropdown.options[this.teamDropdown.selectedIndex].value;
		this.stickerGenerator.sticker.src = this.stickerGenerator.sticker.loadStickerSrc();
		this.stickerGenerator.canvas.loadBase();
	}

}

export default InterfaceSticker