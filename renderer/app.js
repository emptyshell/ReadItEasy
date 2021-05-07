const { ipcRenderer, shell } = require("electron");
const items = require("./items");

let showModal = document.getElementById("show-modal");
let closeModal = document.getElementById("close-modal");
let modal = document.getElementById("modal");
let url = document.getElementById("url");
let addItem = document.getElementById("add-item");
let search = document.getElementById("search");

ipcRenderer.on("menu-show-modal", () => {
  showModal.click();
});

ipcRenderer.on("menu-open-item", () => {
  items.open();
});

ipcRenderer.on("menu-search-items", () => {
  search.focus();
});

ipcRenderer.on("menu-delete-item", () => {
  items.delete(items.getSelectedItem().index);
});

ipcRenderer.on("menu-open-in-browser-item", () => {
  if (!items.storage.length) return;
  shell.openExternal(items.storage[items.getSelectedItem().index].url);
});

search.addEventListener("keyup", (e) => {
  Array.from(document.getElementsByClassName("read-item")).forEach((item) => {
    let hasMatch = item.innerHTML.toLocaleLowerCase().includes(search.value);
    item.style.display = hasMatch ? "flex" : "none";
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    items.changeSelection(e.key);
  }
});

const toggleModalButtons = () => {
  if (addItem.disabled === true) {
    addItem.disabled = false;
    addItem.style.opacity = 1;
    addItem.innerText = "Add Item";
    closeModal.style.display = "inline";
  } else {
    addItem.disabled = true;
    addItem.style.opacity = 0.5;
    addItem.innerText = "Adding...";
    closeModal.style.display = "none";
  }
};

showModal.addEventListener("click", (e) => {
  modal.style.display = "flex";
  url.focus();
});

closeModal.addEventListener("click", (e) => {
  modal.style.display = "none";
  url.value = "";
});

addItem.addEventListener("click", (e) => {
  if (url.value) {
    ipcRenderer.send("new-item", url.value);
    toggleModalButtons();
  }
});

url.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addItem.click();
  }
});

ipcRenderer.on("new-item-success", (e, newItemSuccess) => {
  console.log(newItemSuccess);
  items.addItem(newItemSuccess);
  toggleModalButtons();

  url.value = "";
  modal.style.display = "none";
});
