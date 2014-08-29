// module.exports =
//
//   activate: (state) ->
//     atom.workspaceView.on('selection:change', )
//
//   deactivate: ->
//
//   serialize: ->

var atomCopyOnSelect = {
  checkSelection: null,

  activate: function(state) {
    atom.workspaceView.on('selection:changed', this.selectionChanged);
  },

  deactivate: function() {
    atom.workspaceView.off('selection:changed', this.selectionChanged);
  },

  selectionChanged: function() {
    // clear the timeout if necessary
    if (atomCopyOnSelect.checkSelection) {
      clearTimeout(atomCopyOnSelect.checkSelection);
      atomCopyOnSelect.checkSelection = null;
    }

    // set the timeout
    atomCopyOnSelect.checkSelection = setTimeout(atomCopyOnSelect.selectionEnded, 1000);
  },

  selectionEnded: function() {
    // clean up the timeout
    clearTimeout(atomCopyOnSelect.checkSelection);
    atomCopyOnSelect.checkSelection = null;

    // check the selection
    var editor = atom.workspace.activePaneItem;
    range = editor.getSelectedBufferRange();
    if (!range.isEmpty()) {
      editor.copySelectedText();
    }
  }
};

module.exports = atomCopyOnSelect;
