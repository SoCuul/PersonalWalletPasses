<p align="center">
  <img src="https://i.imgur.com/mGdXU0c.png" alt="Personal Wallet Passes"/>
  A simple utility to improve the workflow of creating PKPass files.
</p>

---

# Prerequisites
- [Node.JS](https://nodejs.org/en/download)
- [yarn](https://yarnpkg.com/getting-started/install)

# Functionality
- Generate PKPass Bundles (Apple Wallet Passes) from a JSON template
- Add images with ease from local file paths
- Speeds up your pass-creation workflow by a significant amount

# Installation
```sh
$ git clone https://github.com/socuul/personalwalletpasses.git
$ cd personalwalletpasses
$ yarn install
$ yarn build
$ node . <args>
```

# Setup

Create a folder structure that consists of the following:

```
passdata/
├── passdata.json
├── assets/
│   ├── icon.png
│   ├── logo.png
│   ├── strip.png
│   ├── thumbnail.png
│   └── background.png
└── certs/
    ├── wwdc/
    │   └── AppleWWDRCAG4.pem
    └── signer/
        ├── signerCert.pem
        ├── signerKey.pem
        └── passphrase.txt
```

**Notes:**
- "passdata" refers to a name of your choice, and does not need to remain consistent between the root folder and the json template.
- The `passname.json` file must be tweaked to reflect the file paths of your data, along with which assets to include.
- For the assets folder, `icon.png` is required, but every other image asset is optional.
- You must provide your own certificates (obtained through an [Apple Developer Program subscription](https://developer.apple.com/programs/)).
- If you need help generating the required certificates, feel free to refer to [this guide](https://github.com/alexandercerutti/passkit-generator/wiki/Generating-Certificates) (which I have no involvement with).

## Creating a template
Create the `passdata.json` file from the template below:
```json
{
    "source": "/home/user/passConfigs/testpass",
    "out": "/home/user/passConfigs/testpass/testpaass.pkpass",

    "model": {
    },

    "assets": {
        "icon": true,

        "logo": boolean,
        "strip": boolean,

        "thumbnail": boolean,
        "background": boolean
    }
}
```

Inside the `model` object, insert your pass file information. To learn more about the PassKit/PKPass format, feel free to visit the [official documentation](https://developer.apple.com/library/archive/documentation/UserExperience/Reference/PassKit_Bundle/Chapters/Introduction.html#//apple_ref/doc/uid/TP40012026-CH0-SW1) or the [newer (but more confusing) official documentation](https://developer.apple.com/documentation/passkit/pkpass).

## Generating a bundled pass archive
`node . <template-file-path.json> [true]`

Optionally, you can add `true` as an argument after the template path to open the created pass bundle after the program is finished.

# Support
This program is provided as-is, and support is not guaranteed.