class History {

	constructor (stickerGenerator) {
		this.stickerGenerator = stickerGenerator;

		this.actions = {
			undo: 'undo',
			redo: 'redo'
		};

		this.lastAction = false;

	    this.undoStack = {
			line: [],
			shadow: [],
			glow: []
	    };

	    this.redoStack = {
			line: [],
			shadow: [],
			glow: []
	    };
	}

	
    saveState (keep_redo, redoData, redoList) {
    	var self = this;
      	keep_redo = keep_redo || false;
      	if(!keep_redo) {
        	// this.redo_list = [];
        	_.each(this.redoStack, function (redoArray) {
        		redoArray = [];
        	});
      	}
      	if(redoList) {
      		redoList.push(redoData);
      	} else {
	      	_.each(this.stickerGenerator.canvas.context, function (context, contextName) {
	      		if(self.shouldUseContext(contextName)) {
	      			self.undoStack[contextName].push(self.stickerGenerator.canvas.element[contextName].toDataURL());
	      		}
	      	});
	    }
    }

    undo () {
    	var self = this;
    	_.each(this.stickerGenerator.canvas.context, function (context, contextName) {

      		if(self.shouldUseContext(contextName)) {
      			console.log(contextName, self.shouldUseContext(contextName));
      			var undoStack = self.undoStack[contextName],
      				lastUndoState = undoStack[undoStack.length];
  				console.log(lastUndoState);
  				if(self.lastAction !== self.actions.undo) {
  					undoStack.pop();
  				}
      			self.saveState(true, lastUndoState, self.redoStack[contextName]);
      			self.restoreState(context, self.undoStack[contextName], self.redoStack[contextName]);
				self.saveState();
      		}
      	});
      	this.lastAction = this.actions.undo;
    }

    redo () {
    	/*
		 * TODO: Get redo working. Should be s1mple
		 */
      	this.restoreState(this.redo_list, this.undo_list);
    }

    shouldUseContext (contextName) {
    	return contextName !== 'base' && contextName !== 'blur' && contextName !== 'composite';
    }

    restoreState (context, pop, push) {
      	if(pop.length) {
        	var restore_state = pop.pop(),
        		img = $('<img src=' + restore_state + '>');
        	img.on('load', function () {
          		context.clearRect(0, 0, this.width, this.height);
          		context.drawImage(img.get(0), 0, 0, this.width, this.height, 0, 0, this.width, this.height);  
    		});
      	} else {
      		context.clearRect(0, 0, this.width, this.height);
      	}
    }

}

export default History;