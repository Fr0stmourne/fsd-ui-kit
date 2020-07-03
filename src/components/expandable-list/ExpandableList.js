import { boundMethod } from 'autobind-decorator';

import '../checkbox/checkbox';
import './expandable-list.scss';

export default class ExpandableList {
  constructor(listElement) {
    this.init(listElement);
  }

  findElements() {
    this.$list = this.$container.find('.expandable-options');
    this.$button = this.$container.find('.expandable-button');
    this.$label = this.$container.find('.expandable-label');
  }

  @boundMethod
  handleToggle() {
    this.$button.toggleClass('expandable-list__expand-button_hidden');
    this.$list.slideToggle();
  }

  bindListeners() {
    this.$button.click(this.handleToggle);
    this.$label.click(this.handleToggle);
  }

  init(listElement) {
    this.$container = $(listElement);
    this.findElements();
    this.bindListeners();
  }
}
