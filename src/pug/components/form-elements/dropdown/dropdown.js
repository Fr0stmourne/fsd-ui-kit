/* eslint-disable */
(function($) {
  $.fn.htmlNumberSpinner = function() {
    /* creating the counter buttons */
    $(this).append(
      "<button class='plus-minus__btn plus-minus__btn--minus'>-</button> <input class='plus-minus__input' type='number'/> <button class='plus-minus__btn plus-minus__btn--plus'>+</button>",
    );

    /* default value and variables and jquery elements */
    const defaultValue = 0;
    let inputValue;
    const numberInput$ = $(this).find('.plus-minus__input');
    const incrementerEl$ = $(this).find('.plus-minus__btn--plus');
    const decrementerEl$ = $(this).find('.plus-minus__btn--minus');

    /* hide the default number input spinner */
    $(this).append(
      '<style>' +
        'input[type=number]::-webkit-inner-spin-button, \n' +
        'input[type=number]::-webkit-outer-spin-button { \n' +
        '    -webkit-appearance: none;\n' +
        '    -moz-appearance: none;\n' +
        '    appearance: none;\n' +
        '    margin: 0; \n' +
        '}</style>',
    );

    /* props - dynamic attributes */
    const minAttributeValue = $(this).attr('min');
    const maxAttributeValue = $(this).attr('max');
    const stepAttributeValue = $(this).attr('step');

    if (minAttributeValue) {
      numberInput$.attr('min', +minAttributeValue);
    }

    if (maxAttributeValue) {
      numberInput$.attr('max', +maxAttributeValue);
    }

    if (stepAttributeValue) {
      numberInput$.attr('step', +stepAttributeValue);
    }

    /* set the default value into the input */
    inputValue = minAttributeValue || defaultValue;
    numberInput$.val(inputValue);

    /* incrementer functionality */
    incrementerEl$.click(function() {
      const parentEl = $(this).parent();
      inputValue = parentEl.find('.plus-minus__input').val();
      if (maxAttributeValue) {
        if (maxAttributeValue == inputValue) {
          return;
        }
      }
      if (stepAttributeValue) {
        inputValue = parentEl.find('.plus-minus__input').val();
        parentEl.find('.plus-minus__input').val(+inputValue + +stepAttributeValue);
        return;
      }
      inputValue = parentEl.find('.plus-minus__input').val();
      parentEl.find('.plus-minus__input').val(++inputValue);
    });

    /* decrementer functionality */
    decrementerEl$.click(function() {
      const parentEl = $(this).parent();
      inputValue = parentEl.find('.plus-minus__input').val();
      if (minAttributeValue) {
        if (minAttributeValue == inputValue) {
          return;
        }
      }
      if (stepAttributeValue) {
        inputValue = parentEl.find('.plus-minus__input').val();
        parentEl.find('.plus-minus__input').val(+inputValue - +stepAttributeValue);
        return;
      }
      inputValue = parentEl.find('.plus-minus__input').val();
      parentEl.find('.plus-minus__input').val(--inputValue);
    });

    numberInput$.change(function() {
      if (!maxAttributeValue || !minAttributeValue) return;
      const currentValue = $(this).val();
      if (+currentValue > +maxAttributeValue) {
        $(this).val(maxAttributeValue);
        return;
      }
      if (+currentValue < +minAttributeValue) {
        $(this).val(minAttributeValue);
      }
    });
  };

  $.fn.getSpinnerValue = function() {
    return $(this)
      .find('.plus-minus__input')
      .val();
  };
})(jQuery);

function addPlusMinus(id) {
  $(id)
    .parent()
    .find(' .plus-minus')
    .htmlNumberSpinner();
}

function getCorrectWordForm(n, textForms) {
  const num = Math.abs(n) % 100;
  const n1 = num % 10;
  if (num > 10 && num < 20) {
    return textForms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return textForms[1];
  }
  if (n1 === 1) {
    return textForms[0];
  }
  return textForms[2];
}

function addDropdown(options) {
  options.ids.forEach(id => {
    const dropdownSelector = `#${id}`;
    const initialText = $(dropdownSelector).text();
    addPlusMinus(dropdownSelector);

    function closeHandler(e) {
      $('.plus-minus__btn').click(e => e.preventDefault());

      $(dropdownSelector)
        .next()
        .slideToggle();
    }

    function resetHandler() {
      $(dropdownSelector)
        .parent()
        .find('.dropdown__item input')
        .each(function() {
          $(this).val(0);
          $(this)
            .parent()
            .find('.plus-minus__btn--minus')
            .click();
        });
    }

    function changeHandler(e) {
      $(e.target)
        .closest('.dropdown')
        .find('.dropdown__reset')
        .removeClass('dropdown__reset--hidden');

      const resultArr = [];
      $(e.target)
        .closest('.dropdown')
        .find('.dropdown__option')
        .filter(function() {
          return $(this).data('forms');
        })
        .each(function() {
          const currentValue = $(this)
            .parent()
            .find('input')
            .val();
          if (+currentValue !== 0) {
            resultArr.push(
              `${currentValue} ${getCorrectWordForm(
                currentValue,
                $(this)
                  .data('forms')
                  .split(' '),
              )}`,
            );
          }
        });

      const resultText = `${resultArr.length ? resultArr.join(', ') : initialText}...`;

      $(dropdownSelector).text(resultText);
    }

    $(dropdownSelector)
      .parent()
      .find('.js-apply')
      .click(closeHandler);
    $(dropdownSelector).click(closeHandler);

    $(dropdownSelector)
      .parent()
      .find('.js-reset')
      .click(resetHandler);

    $(dropdownSelector)
      .parent()
      .find('.dropdown__item input')
      .change(changeHandler);
    $(dropdownSelector)
      .parent()
      .find('.dropdown__item .plus-minus__btn')
      .click(changeHandler);

    $(dropdownSelector).click();
  });
}

$(() => {
  addDropdown({
    ids: [
      'booking-dropdown',
      'guest',
      'guest-1',
      'guest-2',
      'guest-3',
      'room-1',
      'room-2',
      'find-room-dropdown',
      'booking-dropdown',
    ],
  });
});
