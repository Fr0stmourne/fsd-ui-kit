import 'air-datepicker/dist/js/datepicker';
import 'air-datepicker/dist/css/datepicker.css';

import '../../vendors/datepicker/datepicker.scss';
import './date-filter.scss';

export default class DateFilter {
  constructor(dateFilterElement) {
    this.init(dateFilterElement);
  }

  appendButton(el) {
    $(el).append('<span class="datepicker--button datepicker-apply" data-action="today">применить</span>');
  }

  findButtonContainer() {
    this.$buttonContainers = $('.datepicker--buttons');
  }

  addApplyButton() {
    this.$buttonContainers.each((_, buttonContainer) => {
      if (!$(buttonContainer).find('.datepicker-apply').length) {
        this.appendButton(buttonContainer);
      }
    });
  }

  bindApplyListener(datepicker) {
    datepicker.$datepicker.find('.datepicker-apply').click(() => {
      datepicker.hide();
    });
  }

  init(dateFilterElement) {
    this.$container = $(dateFilterElement);

    const now = new Date();
    const weekLater = new Date(new Date().setDate(new Date().getDate() + 7));

    this.$container.datepicker({
      dateFormat: 'dd M',
      clearButton: true,
      navTitles: {
        days: 'MM yyyy',
      },
      minDate: new Date(),
      onShow: datepicker => this.bindApplyListener(datepicker),
    });

    this.$container
      .datepicker()
      .data('datepicker')
      .selectDate([now, weekLater]);

    this.findButtonContainer();
    this.addApplyButton();
  }
}
