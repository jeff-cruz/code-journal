/* global data */
/* exported data */
var $inputURL = document.querySelector('#photo-url');
var $placeholder = document.querySelector('.placeholder');
$inputURL.addEventListener('input', photoInput);

function photoInput(event) {
  if ($inputURL.type === 'url') {
    $placeholder.src = event.target.value;
  }
}
