const fs = require("fs");
const itemsContainer = document.getElementById("items");

let readerJs;
fs.readFile(`${__dirname}/readerJs.js`, (err, data) => {
  readerJs = data.toString();
});

exports.storage = JSON.parse(localStorage.getItem("readiteasy-items")) || [];

exports.select = (e) => {
  this.getSelectedItem().node.classList.remove("selected");

  e.currentTarget.classList.add("selected");
};

exports.changeSelection = (direction) => {
  let currentItem = this.getSelectedItem().node;

  if (direction === "ArrowUp" && currentItem.previousElementSibling) {
    currentItem.classList.remove("selected");
    currentItem.previousElementSibling.classList.add("selected");
  } else if (direction === "ArrowDown" && currentItem.nextElementSibling) {
    currentItem.classList.remove("selected");
    currentItem.nextElementSibling.classList.add("selected");
  }
};

window.addEventListener("message", (e) => {
  if (e.data.action === "delete-reader-item") {
    this.delete(e.data.itemIndex);

    e.source.close();
  }
});

exports.delete = (index) => {
  itemsContainer.removeChild(itemsContainer.childNodes[index]);
  this.storage.splice(index, 1);

  this.save();

  if (this.storage.length) {
    let newSelectedItem = index === 0 ? 0 : index - 1;

    document
      .getElementsByClassName("read-item")
      [newSelectedItem].classList.add("selected");
  }
};

exports.getSelectedItem = () => {
  let currentItem = document.getElementsByClassName("read-item selected")[0];
  let itemIndex = 0;
  let child = currentItem;
  while ((child = child.previousElementSibling != null)) itemIndex++;

  return { node: currentItem, index: itemIndex };
};

exports.save = () => {
  localStorage.setItem("readiteasy-items", JSON.stringify(this.storage));
};

exports.open = () => {
  if (!this.storage.length) return;

  let selectedItem = this.getSelectedItem().node;

  let contentUrl = selectedItem.dataset.url;

  let readerWindow = window.open(
    contentUrl,
    "",
    `
    maxWidth=2000,
    maxHeight=2000,
    width=1200,
    height=800
    background-color=#DEDEDE,
    nodeIntegration=0,
    contextIsolation=1
  `
  );

  readerWindow.eval(
    readerJs.replace("{{index}}", this.getSelectedItem().index)
  );
};

exports.addItem = (item, isNew = true) => {
  let itemNode = document.createElement("div");

  itemNode.setAttribute("class", "read-item");

  itemNode.setAttribute("data-url", item.url);

  itemNode.innerHTML = `<img src=${item.screenshot}><h2>${item.title}</h2>`;

  itemsContainer.appendChild(itemNode);

  itemNode.addEventListener("click", this.select);
  itemNode.addEventListener("dblclick", this.open);

  if (document.getElementsByClassName("read-item").length === 1) {
    itemNode.classList.add("selected");
  }

  if (isNew) {
    this.storage.push(item);
    this.save();
  }
};

this.storage.forEach((item) => {
  this.addItem(item, false);
});
