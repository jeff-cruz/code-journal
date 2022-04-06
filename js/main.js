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
$entriesButton.addEventListener('click', viewSwap);
$newEntryButton.addEventListener('click', viewSwap);
window.addEventListener('DOMContentLoaded', appendEntry);

// INPUT PHOTO PLACEHOLDER
function photoInput(event) {
  if ($inputURL.value !== '') {
    $placeholder.src = event.target.value;
  } else {
    $placeholder.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}

// SUBMIT ENTRY
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
}

// RENDER DOM TREE FUNCTION
function renderEntry(entry) {
  var $li = document.createElement('li');
  var $row = document.createElement('div');
  var $img = document.createElement('img');
  var $columnHalf = document.createElement('div');
  var $title = document.createElement('h1');
  var $notes = document.createElement('p');

  $row.setAttribute('class', 'row');
  $img.setAttribute('class', 'placeholder column-half padding-bottom');
  $img.setAttribute('src', entry.photoURL);
  $columnHalf.setAttribute('class', 'column-half');
  $title.textContent = entry.title;
  $notes.textContent = entry.notes;

  $li.appendChild($row);
  $row.appendChild($img);
  $row.appendChild($columnHalf);
  $columnHalf.appendChild($title);
  $columnHalf.appendChild($notes);

  return $li;
}

// APPEND DOM TREE TO ENTRY LIST
function appendEntry(entry) {
  for (var i = 0; i < data.entries.length; i++) {
    $entryList.append(renderEntry(data.entries[i]));
  }
}

function viewSwap(event) {
  var anchorView = event.target.getAttribute('data-view');

  if (event.target.matches('a')) {
    for (var i = 0; i < $viewList.length; i++) {
      var currentView = $viewList[i].getAttribute('data-view');
      if (anchorView !== currentView) {
        $viewList[i].className = 'view hidden';
      } else if (anchorView === currentView) {
        $viewList[i].className = 'view';
        data.view = currentView;
      }
    }
  }
}
