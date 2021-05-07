const { Menu, shell } = require("electron");

module.exports = (appWin) => {
  let template = [
    {
      label: "Items",
      submenu: [
        {
          label: "Add new",
          click: () => {
            appWin.send("menu-show-modal");
          },
          accelerator: "CmdOrCtrl+O",
        },
        {
          label: "Read Item",
          accelerator: "CmdOrCtrl+Enter",
          click: () => {
            appWin.send("menu-open-item");
          },
        },
        {
          label: "Delete Item",
          accelerator: "CmdOrCtrl+Backspace",
          click: () => {
            appWin.send("menu-delete-item");
          },
        },
        {
          label: "Open with Browser",
          accelerator: "CmdOrCtrl+Shift+Enter",
          click: () => {
            appWin.send("menu-open-in-browser-item");
          },
        },
        {
          label: "Search",
          accelerator: "CmdOrCtrl+S",
          click: () => {
            appWin.send("menu-search-items");
          },
        },
      ],
    },
    {
      role: "editMenu",
    },
    {
      role: "windowMenu",
    },
    {
      role: "help",
      submenu: [
        {
          label: "Learn more",
          click: () => {
            shell.openExternal("https://github.com/emptyshell/ReadItEasy.git");
          },
        },
      ],
    },
  ];

  if (process.platform === "darwin") template.unshift({ role: "appMenu" });

  let menu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(menu);
};
