/* global data */
/* exported data */
var $inputURL = document.querySelector('#photoURL');
var $placeholder = document.querySelector('.placeholder');
var $formPage = document.querySelector('#form-page');
var $entriesPage = document.querySelector('#entries-page');
var $journalForm = document.querySelector('form');
var $entryList = document.querySelector('.entry-list');
var $entriesButton = document.querySelector('.entries-link');
var $newEntryButton = document.querySelector('.new-entry');
var $viewList = document.querySelectorAll('.view');
var $parentElement = document.querySelector('ul');
var $heading = document.querySelector('#new-title');
var $noEntry = document.querySelector('.no-entries');

$inputURL.addEventListener('input', photoInput);
$journalForm.addEventListener('submit', submitButton);
window.addEventListener('DOMContentLoaded', appendEntry);
window.addEventListener('DOMContentLoaded', viewSwap(data.view));

// sets placeholder as image if no image is found
function photoInput(event) {
  if ($inputURL.value !== '') {
    $placeholder.src = event.target.value;
  } else {
    $placeholder.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}

// submit button if new or edit
function submitButton(event) {
  event.preventDefault();
  if (data.editing === null) {
    var formTitle = document.querySelector('#title').value;
    var formPhotoURL = document.querySelector('#photoURL').value;
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
  } else {
    var editEntry = {};
    editEntry[$journalForm.elements.title.name] = $journalForm.elements.title.value;
    editEntry[$journalForm.elements.notes.name] = $journalForm.elements.notes.value;
    editEntry[$journalForm.elements.photoURL.name] = $journalForm.elements.photoURL.value;
    editEntry.entryID = data.editing.entryID;

    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing.entryID === data.entries[i].entryID) {
        data.entries.splice(i, 1, editEntry);
      }
    }

    var $entryContainer = document.querySelector('ul');
    var $entriesList = document.querySelectorAll('li');
    for (var j = 0; j < $entriesList.length; j++) {
      var currentEntryID = $entriesList[j].getAttribute('data-entry-id');
      if (currentEntryID === data.editing.entryID.toString()) {
        $entryContainer.replaceChild(renderEntry(editEntry), $entriesList[j]);
      }
    }
    $placeholder.setAttribute('src', 'images/placeholder-image-square.jpg');
    $journalForm.reset();
    data.editing = null;
    $formPage.className = 'view hidden';
    $entriesPage.className = 'view';
    noEntries();
    viewSwap('entries');
  }
}

// making the dom tree for the entries
function renderEntry(entry) {
  var $li = document.createElement('li');
  var $row = document.createElement('div');
  var $img = document.createElement('img');
  var $columnHalf = document.createElement('div');
  var $titlecontainer = document.createElement('div');
  var $title = document.createElement('h1');
  var $pencil = document.createElement('i');
  var $notes = document.createElement('p');

  $li.setAttribute('data-entry-id', entry.entryID);
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

// adding the entry to the entry list
function appendEntry(entry) {
  for (var i = 0; i < data.entries.length; i++) {
    $entryList.append(renderEntry(data.entries[i]));
  }
}

// changing the view of the page
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

// entries button
$entriesButton.addEventListener('click', entriesButton);
function entriesButton(event) {
  viewSwap('entries');
  data.view = 'entries';
  noEntries();
}

// new entry button
$newEntryButton.addEventListener('click', newEntryButton);
function newEntryButton(event) {
  viewSwap('entry-form');
  data.view = 'entry-form';
}

// clickable pencil icon for editing and populating fields
$parentElement.addEventListener('click', editView);
function editView({ target }) {
  if (event.target.tagName === 'I') {
    viewSwap('entry-form');
  } else {
    return;
  }
  var $editIcon = target.closest('li');
  var currentEditID = $editIcon.getAttribute('data-entry-id');
  data.editing = currentEditID;
  for (var i = 0; i < data.entries.length; i++) {
    if (currentEditID === data.entries[i].entryID.toString()) {
      data.editing = data.entries[i];
      break;
    }
  }
  $heading.textContent = 'Edit Entry';
  prepopulateData();
}

// prepopulate data
function prepopulateData(dataForm) {
  $journalForm.elements.title.value = data.editing.title;
  $journalForm.elements.notes.value = data.editing.notes;
  $placeholder.setAttribute('src', data.editing.photoURL);
  $journalForm.elements.photoURL.value = data.editing.photoURL;
}

function noEntries(event) {
  if (data.nextEntryId !== 1) {
    $noEntry.className = 'no-entries align-center hidden';
  } else {
    $noEntry.className = 'no-entries align-center';
  }
}
