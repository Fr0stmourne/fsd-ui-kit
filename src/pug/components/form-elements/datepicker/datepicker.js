/* eslint-disable */

import 'air-datepicker/dist/js/datepicker';
import 'air-datepicker/dist/css/datepicker.css';

$('#datepicker').datepicker({
  todayHighlight: true,
  clearBtn: true,
  language: 'ru-RU',
});
$('#find-room-datepicker').datepicker({
  todayHighlight: true,
  clearBtn: true,
  language: 'ru-RU',
});
$('#booking-datepicker').datepicker({
  todayHighlight: true,
  clearBtn: true,
  language: 'ru-RU',
});

// $(() => {
//   $('.datepicker').daterangepicker({ linkedCalendars: false });
// });

// var $start = $('#start'),
//     $end = $('#end');

// $start.datepicker({
//     onSelect: function (fd, date) {
//         $end.data('datepicker')
//                 .update('minDate', date);

//         $end.focus();
//     }
// })

// $end.datepicker({
//     onSelect: function (fd, date) {
//         $start.data('datepicker')
//                 .update('maxDate', date)
//     }
// })