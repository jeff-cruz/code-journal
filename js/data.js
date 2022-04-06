/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntriesJSON = localStorage.getItem('javascript-local-storage');
if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}
window.addEventListener('beforeunload', beforeUnload);

function beforeUnload() {
  var entriesJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', entriesJSON);
  return entriesJSON;
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

var $ul = document.querySelector('.entry-list');
function loopOverListOfEntries(entry) {
  for (var i = 0; i < data.entries.length; i++) {
    $ul.append(renderEntry(data.entries[i]));
  }
}
