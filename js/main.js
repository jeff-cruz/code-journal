/* global data */
/* exported data */
var $inputURL = document.querySelector('#photo-url');
var $placeholder = document.querySelector('.placeholder');
var $formPage = document.querySelector('#form-page');
var $entriesPage = document.querySelector('#entries-page');
var $journalForm = document.querySelector('form');
var $entryList = document.querySelector('.entry-list');
var $entriesButton = document.querySelector('.entries-link');
var $newEntryButton = document.querySelector('.new-entry');
var $viewList = document.querySelectorAll('.view');

$inputURL.addEventListener('input', photoInput);
$journalForm.addEventListener('submit', submitButton);
window.addEventListener('DOMContentLoaded', appendEntry);
window.addEventListener('DOMContentLoaded', viewSwap(data.view));

function photoInput(event) {
  if ($inputURL.value !== '') {
    $placeholder.src = event.target.value;
  } else {
    $placeholder.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}

function submitButton(event) {
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
  $formPage.className = 'view hidden';
  $entriesPage.className = 'view';
  viewSwap('entries');
}

function renderEntry(entry) {
  var $li = document.createElement('li');
  var $row = document.createElement('div');
  var $img = document.createElement('img');
  var $columnHalf = document.createElement('div');
  var $titlecontainer = document.createElement('div');
  var $title = document.createElement('h1');
  var $pencil = document.createElement('i');
  var $notes = document.createElement('p');

  $row.setAttribute('class', 'row');
  $img.setAttribute('class', 'placeholder column-half padding-bottom');
  $img.setAttribute('src', entry.photoURL);
  $columnHalf.setAttribute('class', 'column-half');
  $pencil.setAttribute('class', 'fa-solid fa-pencil fa-2xl');
  $titlecontainer.setAttribute('class', 'row space-between');
  $title.textContent = entry.title;
  $notes.textContent = entry.notes;

  $li.appendChild($row);
  $row.appendChild($img);
  $row.appendChild($columnHalf);
  $columnHalf.appendChild($titlecontainer);
  $titlecontainer.appendChild($title);
  $titlecontainer.appendChild($pencil);
  $row.appendChild($columnHalf);
  $columnHalf.appendChild($notes);

  return $li;
}

function appendEntry(entry) {
  for (var i = 0; i < data.entries.length; i++) {
    $entryList.append(renderEntry(data.entries[i]));
  }
}

function viewSwap(view) {
  data.view = view;
  for (var i = 0; i < $viewList.length; i++) {
    var viewName = $viewList[i].getAttribute('data-view');
    if (viewName === view) {
      $viewList[i].className = 'view';
    } else if (viewName !== view) {
      $viewList[i].className = 'view hidden';
    }
  }
}

$entriesButton.addEventListener('click', entriesButton);
function entriesButton(event) {
  viewSwap('entries');
  data.view = 'entries';
}

$newEntryButton.addEventListener('click', newEntryButton);
function newEntryButton(event) {
  viewSwap('entry-form');
  data.view = 'entry-form';
}
