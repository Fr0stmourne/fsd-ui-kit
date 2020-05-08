function formatNumber(num) {
  return String(num)
    .split('')
    .reverse()
    .join('')
    .match(/.{1,3}/g)
    .reverse()
    .map(el =>
      el
        .split('')
        .reverse()
        .join(''),
    )
    .join(' ');
}

function addSlider(options) {
  $(options.inputSelector).slider({
    range: true,
    min: options.min,
    max: options.max,
    values: options.values,
    slide(event, ui) {
      $(options.textSelector).val(`${formatNumber(ui.values[0])}₽ - ${formatNumber(ui.values[1])}₽`);
    },
  });

  $(options.textSelector).val(
    `${formatNumber($(options.inputSelector).slider('values', 0))}₽ - ${formatNumber(
      $(options.inputSelector).slider('values', 1),
    )}₽`,
  );
}

$(() => {
  addSlider({
    inputSelector: '#slider-range',
    min: 0,
    max: 15000,
    values: [5000, 10000],
    textSelector: '#amount',
  });
});