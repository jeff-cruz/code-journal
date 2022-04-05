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

// function renderEntry(entry) {
//   var $li = document.createElement('li');

//   var $row = document.createElement('div');
//   $li.appendChild($row);

//   var $img = document.createElement('img');
//   $row.appendChild($img);

//   var $columnHalf = document.createElement('div');
//   $row.appendChild($columnHalf);

//   var $title = document.createElement('h1');
//   $columnHalf.appendChild($title);

//   var $notes = document.createElement('p');
//   $columnHalf.append($notes);

//   $row.setAttribute('class', 'row');
//   $img.setAttribute('class', 'placeholder column-half padding-bottom');
//   $columnHalf.setAttribute('class', 'column-half');
//   $title.textContent = data.entries.title;
//   $notes.textContent = data.entries.notes;

//   var $ul = document.querySelector('ul');
//   for (var i = 0; i < entry.length; i++) {
//     var entryInfo = renderEntry([i]);
//     $ul.appendChild(entryInfo);
//   }
// }
