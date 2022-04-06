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
  data.entries.unshift(entry);
  $placeholder.setAttribute('src', 'images/placeholder-image-square.jpg');
  $journalForm.reset();
}

var $entriesButton = document.querySelector('.entries-link');
$entriesButton.addEventListener('click', entriesClick);

var $formPage = document.querySelector('.form-page');
var $entriesPage = document.querySelector('.entries-page');
function entriesClick(event) {
  $entriesButton.className = 'entries-link';
  $formPage.className = 'form-page hidden';
  $entriesPage.className = 'entries-page view';
}
