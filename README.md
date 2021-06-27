# 🦛 Happla
JavaScript library for zooming and panning HTML content. Live demo: https://d2phap.github.io/happla


## 🚀 Getting started
Run the command
```
npm i @d2phap/happla
```

- NPM package: https://www.npmjs.com/package/@d2phap/happla
- Github source: https://github.com/d2phap/happla

## 🏃‍♂️ Usage
Please see [Docs project](https://github.com/d2phap/happla/tree/main/docs) for full example.

### HTML template
```html
<body>
  <div id="board" tabindex="0">
    <div id="wrapper">
      <div id="boardContent">
        <!-- Your content here -->
        <img src="https://imageglass.org/img/iglogo.svg" alt="ImageGlass logo" />
      </div>
    </div>
  </div>
</body>
```

### CSS
```scss
#board { width: 500px; height: 500px; }
#wrapper { width: 100%; height: 100%; }
#boardContent { display: inline-flex; }
#boardContent * {
  -webkit-user-drag: none;
  user-select: none;
}
```

### JavaScript
```ts
// import library
import { Board } from '@d2phap/happla';

// get HTML elements
const elBoard = document.getElementById('board');
const elBoardContent = document.getElementById('boardContent');

// declare the board
const board = new Board(elBoard, elBoardContent, {
  // your configs here
});

// enable functions of the board
board.enable();
```

## 🧱 Config options
```ts
// To be updated
```


## 🏹 Methods
```ts
// To be updated
```


## 💖 Support my open source work
<a href="https://www.patreon.com/d2phap" target="_blank" title="Become a patron">
<img src="https://img.shields.io/badge/Patreon-@d2phap%20-e85b46.svg?maxAge=3600" height="30" alt="Buy me a beer?">
</a>

<a href="https://www.paypal.me/d2phap" target="_blank" title="Buy me a beer?">
<img src="https://img.shields.io/badge/PayPal-Donate%20$10%20-0070ba.svg?maxAge=3600" height="30" alt="Buy me a beer?">
</a>

<a href="https://github.com/sponsors/d2phap" target="_blank" title="Become a sponsor">
<img src="https://img.shields.io/badge/Github-@d2phap-24292e.svg?maxAge=3600" height="30" alt="Become a sponsor">
</a>


### Cryptocurrency donation:

```bash
# Ethereum
0xc19be8972809b6b989f3e4ba16595712ba8e0de4

# Bitcoin
1PcCezBmM3ahTzfBBi5KVWnnd3bCHbas8Z
```

Thanks for your gratitude and finance help!



## ⚖ License
See https://github.com/d2phap/happla/blob/main/LICENSE

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fd2phap%2Fhappla.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fd2phap%2Fhappla?ref=badge_large)


## 💪 Other open source projects
- `ImageGlass` - A lightweight, versatile image viewer: https://imageglass.org
- `Fluent Reveal Effect Js` (Fluent Design System): https://github.com/d2phap/fluent-reveal-effect
- `Vue File selector` (Fluent Design System): https://github.com/d2phap/vue-file-selector
- `FileWatcherEx` - A wrapper of C# FileSystemWatcher for Windows: https://github.com/d2phap/FileWatcherEx
