{WorkspaceView} = require 'atom'
AtomCopyOnSelect = require '../lib/atom-copy-on-select'

# Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
#
# To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
# or `fdescribe`). Remove the `f` to unfocus the block.

describe "AtomCopyOnSelect", ->
  activationPromise = null

  beforeEach ->
    atom.workspaceView = new WorkspaceView
    activationPromise = atom.packages.activatePackage('atom-copy-on-select')

  describe "when the atom-copy-on-select:toggle event is triggered", ->
    it "attaches and then detaches the view", ->
      expect(atom.workspaceView.find('.atom-copy-on-select')).not.toExist()

      # This is an activation event, triggering it will cause the package to be
      # activated.
      atom.workspaceView.trigger 'atom-copy-on-select:toggle'

      waitsForPromise ->
        activationPromise

      runs ->
        expect(atom.workspaceView.find('.atom-copy-on-select')).toExist()
        atom.workspaceView.trigger 'atom-copy-on-select:toggle'
        expect(atom.workspaceView.find('.atom-copy-on-select')).not.toExist()
