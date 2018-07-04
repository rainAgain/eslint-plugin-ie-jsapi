# eslint-plugin-ie-jsapi

use to check ie jsapi

## Fork

forked from [rfeie/eslint-plugin-ie-static-methods](https://github.com/rfeie/eslint-plugin-ie-static-methods)

## Introduce

this package just add a part of js api in Es5.

you can fork this package then write the extra.js

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-ie-jsapi`:

```
$ npm install eslint-plugin-ie-jsapi --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-ie-jsapi` globally.

## Usage

Add `ie-jsapi` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "ie-jsapi"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "ie-jsapi/ie-jsapi": "error"
    }
}
```

### Configuring
If you'd like to set specific methods to ignore due to polyfills you can add an
entry in your .eslintrc file. Using the settings objects and providing an array
of methods for each Object type. Example:

```js
// ...
  "settings": {
    "ieStaticMethodsAllow": {
      // Ignore Object.assign and Number.parseFloat
      "Object": ["assign"],
      "Number": ["parseFloat"]
    }
  }
```
## Supported Rules

```
Extra: {
    methods: ['forEach','isArray'], // add api
    tips: {
      // add error browser tip
      "forEach": {
        unsuportBrowser: 'IE 8,safari'
      }
    }
  }
```

or in new version you can add js api in  extra.js





