# Electron installer bundler investigaion

## Bundle using elecron-builder node module

[Electron-builder](https://github.com/electron-userland/electron-builder) is an Node.js module that brings boilerplate functionality.

Install this module using npm as a development dependency:

`npm i -d electron-builder`

This module supports the bundling installers for Linux, macOS and Windows

By adding a `build` block in `package.json`

```json
    "build": {
    "appId": "men.suruceanu.readiteasy",
    "copyright": "Copyright Suruceanu.men",
    "publish": {
      "provider": "github"
    },
    "mac": {
      "category": "public.app-category.productivity",
      "target": "pkg"
    },
    "win": {
      "target": "nsis"
    },
    "linux": {
      "category": "Utility"
    }
  }
```

Here are more porperties that we can add to the example above:

- Windows: https://www.electron.build/configuration/win
- MacOs: https://www.electron.build/configuration/mac
- Linux: https://www.electron.build/configuration/linux

For each platforms we can choose different build formats:

- Windows: `nsis`, `nsis-web` (Web installer), `portable` (portable app without installation), `appx`, `msi`, `squirrel`, `7z`, `zip`, `tar.xz`, `tar.lz`, `tar.gz`, `tar.bz2`, `dir`. [Best fit for our Electron app is `nsis`]
- MacOS: `default`, `dmg`, `mas`, `mas-dev`, `pkg`, `7z`, `zip`, `tar.xz`, `tar.lz`, `tar.gz`, `tar.bz2`, `dir`. Defaults to default (dmg and zip for Squirrel.Mac)
- Linux: `AppImage`, `snap`, `deb`, `rpm`, `freebsd`, `pacman`, `p5p`, `apk`, `7z`, `zip`, `tar.xz`, `tar.lz`, `tar.gz`, `tar.bz2`, `dir`.

### Best format fit for our Electron app

For Windows `nsis` format should fit our requirments. `nsis` format have properties such as running a script that allows to run commands on [different stages of installerusing macro](https://www.electron.build/configuration/nsis).

For MacOs `pkg` format is the best fit beacuse it allows to add package dependencies that should be installed for App. In out case the powershell and openssl. The scripts properties allows to [run preinstall and postinstall `bash` scripts](https://www.electron.build/configuration/pkg).

For Linux we can do formats based on platforms

- `deb` for debian/ubuntu
- `rpm` for Redhat, Fedora, CentOS...
- `pacman` for Arch based systems like Manjaro

All of the formats enumerated above supports property called `depends` that [allow us to specify the packages that are dependencies](https://www.electron.build/configuration/linux) for our app (powershell, openssl).
