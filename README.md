# kamar-notices

Module that grabs the notices and returns an array from a KAMAR school portal

## Install

```
npm install kamar-notices
```

or use yarn

```
yarn add kamar-notices
```

## Usage

```js
const KamarNotices = require("kamar-notices");
const notices = new KamarNotices("PORTAL_URL");
notices.getNotices().then((noticeList) => {
  /*
    [
        {
            for: 'All',
            title: 'Test Notice',
            staff: 'ABC',
            content: "This is a test notice"
        }
        ...
    ]
  */
});
```

Checkout my [notices-screen](https://github.com/chezzzer/notices-screen) repo for a way to display it on a TV.
