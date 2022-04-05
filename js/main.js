/* global data */
/* exported data */
var $inputURL = document.querySelector('#photo-url');
var $placeholder = document.querySelector('.placeholder');
$inputURL.addEventListener('input', photoInput);

function photoInput(event) {
  if ($inputURL.value !== '') {
    $placeholder.src = event.target.value;
  } else {
    $placeholder.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}

var $journalForm = document.querySelector('form');
$journalForm.addEventListener('submit', buttonClick);

function buttonClick(event) {
  event.preventDefault();
  var formTitle = document.querySelector('#title').value;
  var formPhotoURL = document.querySelector('#photo-url').value;
  var formNotes = document.querySelector('#notes').value;
  var entry = {
    title: formTitle,
    photoURL: formPhotoURL,
    notes: formNotes,
    entryID: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.push(entry);
  $placeholder.setAttribute('src', 'images/placeholder-image-square.jpg');
  $journalForm.reset();
}
