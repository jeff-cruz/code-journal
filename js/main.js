/* global data */
/* exported data */
var $inputURL = document.querySelector('#photo-url');
var $placeholder = document.querySelector('.placeholder');
var $formPage = document.querySelector('.form-page');
var $entriesPage = document.querySelector('.entries-page');
var $journalForm = document.querySelector('form');
$inputURL.addEventListener('input', photoInput);

function photoInput(event) {
  if ($inputURL.value !== '') {
    $placeholder.src = event.target.value;
  } else {
    $placeholder.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}

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
  $entryList.prepend(renderEntry(entry));
  $formPage.className = 'form-page hidden';
  $entriesPage.className = 'entries-page view';
}

function renderEntry(entry) {
  var $li = document.createElement('li');

  var $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  $li.appendChild($row);

  var $img = document.createElement('img');
  $img.setAttribute('class', 'placeholder column-half padding-bottom');
  $img.setAttribute('src', entry.photoURL);
  $row.appendChild($img);

  var $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column-half');
  $row.appendChild($columnHalf);

  var $title = document.createElement('h1');
  $title.textContent = entry.title;
  $columnHalf.appendChild($title);

  var $notes = document.createElement('p');
  $notes.textContent = entry.notes;
  $columnHalf.appendChild($notes);

  return $li;
}

window.addEventListener('DOMContentLoaded', loopOverListOfEntries);

var $entryList = document.querySelector('.entry-list');
function loopOverListOfEntries(entry) {
  for (var i = 0; i < data.entries.length; i++) {
    $entryList.append(renderEntry(data.entries[i]));
  }
}

var $entriesButton = document.querySelector('.entries-link');
$entriesButton.addEventListener('click', entriesClick);

function entriesClick(event) {
  $formPage.className = 'form-page hidden';
  $entriesPage.className = 'entries-page view';
}

var $newEntryButton = document.querySelector('.new-entry');
$newEntryButton.addEventListener('click', newEntryClick);

function newEntryClick(event) {
  $formPage.className = 'form-page view';
  $entriesPage.className = 'entries-page hidden';
}
