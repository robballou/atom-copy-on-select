// module.exports =
//
//   activate: (state) ->
//     atom.workspaceView.on('selection:change', )
//
//   deactivate: ->
//
//   serialize: ->

module.exports = {
  activate: function(state) {
    atom.workspaceView.on('selection:changed', this.selectionChanged);
  },

  deactivate: function() {
    atom.workspaceView.off('selection:changed', this.selectionChanged);
  },

  serialize: function() {

  },

  selectionChanged: function() {
    console.log('selectionChanged');
  }
}
