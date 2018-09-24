import InterfaceSticker from './interface/sticker';
import InterfaceDrawing from './interface/drawing';
import InterfaceSave from './interface/save';
import InterfaceBackground from './interface/background';

class Interface {	

	constructor (stickerGenerator) {
		this.stickerGenerator = stickerGenerator;
		
		this.interfaceSticker = new InterfaceSticker(stickerGenerator);
		this.interfaceDrawing = new InterfaceDrawing(stickerGenerator);
		this.interfaceSave = new InterfaceSave(stickerGenerator);
		this.interfaceBackground = new InterfaceBackground(stickerGenerator);
	}

}

export default Interface