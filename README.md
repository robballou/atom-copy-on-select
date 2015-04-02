# atom-copy-on-select package

Copies the selection to the clipboard automatically. Currently a very alpha/WIP in progress release. Pull requests and ideas are definitely welcome!

See: https://github.com/robballou/atom-copy-on-select/

## Installation

### Via apm

    apm install atom-copy-on-select


### Via git

    pushd ~/.atom/packages
    git clone git@github.com:robballou/atom-copy-on-select.git
    popd

You likely need to restart atom or reload views.

## Configuration

There are a couple of configuration options currently:

### delay

The package works on a delay (to make sure you're done selecting things) which
is normally 1000ms. This can be changed with:

    "atom-copy-on-select":
      delay: 800

### copyOnMultipleSelections

By default, the package will not copy text if you've made multiple selections.
You can enable this if you want. Only the most recent selection is copied.

    "atom-copy-on-select":
      copyOnMultipleSelections: true
