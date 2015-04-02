// module.exports =
//
//   activate: (state) ->
//     atom.workspaceView.on('selection:change', )
//
//   deactivate: ->
//
//   serialize: ->

var $ = require('jquery');

var atomCopyOnSelect = {
  checkSelection: null,
  statusTile: null,

  config: {
    delay: {
      type: 'integer',
      default: 1000,
      minimum: 100
    }
  },

  /**
   * Activate the plugin
   */
  activate: function(state) {
    atom.workspace.observeTextEditors(this.observeTextEditor);
  },

  /**
   * Deactivate the plugin
   */
  deactivate: function() {
    if (this.statusTile) {
      statusTile.destroy();
    }
  },

  /**
   * Add the selection changed event handler.
   */
  observeTextEditor: function(editor) {
    editor.onDidChangeSelectionRange(function() {
      atomCopyOnSelect.selectionChanged();
    });
  },

  /**
   * Monitor a selection change.
   *
   * Sets a timer to check the selection after a set delay.
   */
  selectionChanged: function() {
    // clear the timeout if necessary
    if (atomCopyOnSelect.checkSelection) {
      clearTimeout(atomCopyOnSelect.checkSelection);
      atomCopyOnSelect.checkSelection = null;
    }

    // check that we have a selection
    var editor = atom.workspace.getActiveTextEditor();
    if (editor) {
      selections = editor.getSelectedText();
      if (selections.length) {
        // set the timeout
        var delaySetting = atom.config.get('atom-copy-on-select.delay', 1000);
        atomCopyOnSelect.checkSelection = setTimeout(atomCopyOnSelect.selectionEnded, delaySetting);
      }
    }
  },

  /**
   * Selection activities have ended.
   */
  selectionEnded: function() {
    // clean up the timeout
    clearTimeout(atomCopyOnSelect.checkSelection);
    atomCopyOnSelect.checkSelection = null;

    // check the selection
    var editor = atom.workspace.getActiveTextEditor();
    try {
      range = editor.getSelectedBufferRange();
      if (!range.isEmpty()) {
        editor.copySelectedText();

        // add status message
        var statusBar = document.querySelector('status-bar');
        if (statusBar) {
          var selectionCount = statusBar.querySelector('.selection-count');
          if (selectionCount) {
            this.statusTile = $('<span id="atom-copy-on-select"> Copied</span>');
            $(selectionCount).append(this.statusTile);
            this.statusTile.fadeOut(800, function() {
              if (this.statusTile) {
                atomCopyOnSelect.statusTile.remove();
                atomCopyOnSelect.statusTile = null;
              }
            });
          }
        }
      }
    }
    catch (err) {
      console.log('Could not copy selection', err);
    }
  }
};

module.exports = atomCopyOnSelect;
