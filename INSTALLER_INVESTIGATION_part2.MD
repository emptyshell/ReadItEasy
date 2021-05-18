# Electron installer bundler investigaion

## User Agreement or Terms and Conditions

`license` String - The path to EULA license file. Defaults to `license.txt` or `eula.txt` (or uppercase variants). In addition to `txt`, `rtf` and `html` supported (don't forget to `usetarget=”_blank”` for links).

Multiple license files in different languages are supported — use lang postfix (e.g. `_de`, `_ru`)). For example, create files `license_de.txt` and `license_en.txt` in the build resources. If OS language is german, `license_de.txt` will be displayed. See map of [language code to name](https://github.com/meikidd/iso-639-1/blob/master/src/data.js).

[Click here for more details](https://www.electron.build/configuration/nsis)

### Steps to add Licence Agreement to Installer.

To add Licence Agreement to the installer you can add files to `build` directory with `license.txt` or `eula.txt` names. The default directory `build/licence.txt`.

## Web Installers

Windows `nsis-web` is a installer that uses `electron-updater` to download the latest available version and install it to host.

## Installer/Uninstaller branding/customization

For Windows `nsis` we can provide installer/uninstaller side banner, installer/uninstaller icon and installer header icon.

- `installerIcon` String - The path to installer icon, relative to the build resources or to the project directory. Defaults to `build/installerIcon.ico` or application icon.
- `uninstallerIcon` String - The path to uninstaller icon, relative to the build resources or to the project directory. Defaults to `build/uninstallerIcon.ico` or application icon.
- `installerHeader` = `build/installerHeader.bmp` String - assisted installer only. `MUI_HEADERIMAGE`, relative to the build resources or to the project directory.
- `installerHeaderIcon` String - one-click installer only. The path to header icon (above the progress bar), relative to the build resources or to the project directory. Defaults to `build/installerHeaderIcon.ico` or application icon.
- `installerSidebar` String - assisted installer only. `MUI_WELCOMEFINISHPAGE_BITMAP`, relative to the build resources or to the project directory. Defaults to `build/installerSidebar.bmp` or `${NSISDIR}\\Contrib\\Graphics\\Wizard\\nsis3-metro.bmp`. Image size 164 × 314 pixels.
- `uninstallerSidebar` String - assisted installer only. `MUI_UNWELCOMEFINISHPAGE_BITMAP`, relative to the build resources or to the project directory. Defaults to `installerSidebar` option or `build/uninstallerSidebar.bmp` or `build/installerSidebar.bmp` or `${NSISDIR}\\Contrib\\Graphics\\Wizard\\nsis3-metro.bmp`.

> [Info Source](https://www.electron.build/configuration/nsis)

# TODO

1. Test `pkg` format on macos
2. Test `preinstall` script on mac os
3. Check MacOS branding/customization options for `pkg` format
