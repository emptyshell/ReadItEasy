const { dialog } = require("electron");
const { autoUpdater } = require("electron-updater");

autoUpdater.autoDownload = false;

module.exports = () => {
  autoUpdater.checkForUpdates();

  autoUpdater.on("update-available", () => {
    dialog
      .openMessageBoxDialog({
        type: "info",
        title: "Update available",
        message:
          "A new version of ReadItEasy is avaolable. Do you want to update now?",
        buttons: ["Update", "No"],
      })
      .then((result) => {
        let buttonIndex = result.response;

        if (buttonIndex === 0) {
          autoUpdater.downloadUpdate();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });

  autoUpdater.on("update-downloaded", () => {
    dialog
      .openMessageBoxDialog({
        type: "info",
        title: "Update ready",
        message: "Install and restart now?",
        buttons: ["Yes", "Later"],
      })
      .then((result) => {
        let buttonIndex = result.response;

        if (buttonIndex === 0) {
          autoUpdater.quitAndInstall(false, true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });
};
