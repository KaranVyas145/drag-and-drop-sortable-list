const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffet",
  "Bernauld Arnault",
  "Carlos Slin Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

// Store the list items
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines">icon</i>
        </div>
        `;

      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
//   console.log("event: ", "dragstart");
dragStartIndex=+this.closest('li').getAttribute('data-index');

}
function dragOver(e) {
    e.preventDefault();
//   console.log("event: ", "dragover");
}

function dragDrop() {
//   console.log("event: ", "drop");
const dragEndIndex= +this.getAttribute('data-index');
swapItems(dragStartIndex,dragEndIndex);
this.classList.remove('over');
}

function swapItems(from,to){
    const itemOne=listItems[from].querySelector('.draggable');
    const itemTwo=listItems[to].querySelector('.draggable');
    listItems[from].appendChild(itemTwo);
    listItems[to].appendChild(itemOne);
}
function dragEnter() {
//   console.log("event: ", "dragenter");
    this.classList.add('over');
}

function dragLeave() {
//   console.log("event: ", "dragleave");
this.classList.remove('over');
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const draggableListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  draggableListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}
