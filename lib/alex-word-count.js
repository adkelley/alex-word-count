'use babel';

import AlexWordCountView from './alex-word-count-view';
import { CompositeDisposable } from 'atom';

export default {

  alexWordCountView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.alexWordCountView = new AlexWordCountView(state.alexWordCountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.alexWordCountView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'alex-word-count:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.alexWordCountView.destroy();
  },

  serialize() {
    return {
      alexWordCountViewState: this.alexWordCountView.serialize()
    };
  },

  toggle() {
    console.log('AlexWordCount was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
