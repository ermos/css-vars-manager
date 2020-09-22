# CSS Vars Manager
> Manage your CSS variables dynamically with Javascript

CSS Vars Manager is a ready to use CSS Variable's Manager using javascript.
You can set variable dynamically and update them without write one thousand line of code.
The libary offers a css variables importer, useful for a dark mode theme for example.

## 🚀 Setting up

```
npm i css-vars-manager
```

## 🔦 Usage

- [setVar()](#set-var)
- [getVar()](#set-var)
- [setColorsCollection()](#set-colors-collection)
- [importVarsCollection()](#import-vars-collection)
- [setColor()](#set-color)
- [updateColor()](#update-color)
- [getShadeFromHex()](#get-shade-from-hex)
- [getShadeFromVar()](#get-shade-from-vars)

-----------

<h3 id="set-var">setVar()</h3>

> Allows you to push a variable.

#### Example
```javascript
import { cssVars } from "css-vars-manager";

cssVars.setVar("--interface-size", "1200px");
```

#### Result
```css
html {
    --interface-size: "1200px";
}
```

-----------

<h3 id="set-var">getVar()</h3>

> Get a variable's value.

#### Example
```css
html {
    --interface-size: "1200px";
}
```
```javascript
import { cssVars } from "css-vars-manager";

console.log(
    cssVars.getVar("--interface-size")
);
```

#### Result
```
console > 1200px
```

-----------

<h3 id="set-colors-collection">setColorsCollection()</h3>

> Allows to set multiple colors variables from an array.

#### Example
```javascript
import { cssVars } from "css-vars-manager";

cssVars.setColorsCollection(
    [
        {
          tag: "--main-color",  // # Variable's name
          color: "#000",        // # Variable's color
          shadeCount: 3,        // # Number of shades (light and darkness)
        },
        {
          tag: "--sub-color",
          color: "#000",
          shadeCount: 1,
        },
        {
          tag: "--neutral-color",
          color: "#d5514b",
        },
    ],
)
```
#### Result
```css
html {
    --main-color: #fff;
    --main-color-light-1: #FFF;
    --main-color-dark-1: #DDD;
    --main-color-light-2: #FFF;
    --main-color-dark-2: #BBB;
    --main-color-light-3: #FFF;
    --main-color-dark-3: #999;
    --sub-color: #000;
    --sub-color-light-1: #222;
    --sub-color-dark-1: #000;
    --neutral-color: #d5514b;
};
```

-----------

<h3 id="import-vars-collection">importVarsCollection()</h3>

> Allows to import a variables configuration from JSON file.

#### Example
```javascript
import { cssVars } from "css-vars-manager";

cssVars.importVarsCollection("/static/theme/dark.json");
```

-----------

<h3 id="set-color">setColor()</h3>

> Allows you to set a variable's color.

#### Example
```javascript
import { cssVars } from "css-vars-manager";

cssVars.setColor(
        {
          tag: "--main-color",  // # Variable's name
          color: "#000",        // # Variable's color
          shadeCount: 3,        // # Number of shades (light and darkness)
        },
);
```

-----------

<h3 id="update-color">updateColor()</h3>

> Allows you to update a variable's color (and shades).

#### Example
```javascript
import { cssVars } from "css-vars-manager";

cssVars.updateColor("--main-color", "#000");
```

-----------

<h3 id="get-shade-from-hex">getShadeFromHex()</h3>

> Allows you to create shade from a hex color.

#### Example
```javascript
import { cssVars } from "css-vars-manager";

console.log(
    "#000 lighter :",
    cssVars.getShadeFromHex("#000", 2)
);

console.log(
    "#000 darkness :",
    cssVars.getShadeFromHex("#000", -2)
);
```

#### Result
```
console > #000 lighter : #222
console > #000 darkness : #000
```

-----------

<h3 id="get-shade-from-vars">getShadeFromVar()</h3>

> Allows you to create shade from a variable's color (in hexadecimal).

#### Example
```css
html {
    --main-color: "#FFF";
}
```
```javascript
import { cssVars } from "css-vars-manager";

console.log(
    "--main-color lighter :",
    cssVars.getShadeFromVar("--main-color", 2)
);

console.log(
    "--main-color darkness :",
    cssVars.getShadeFromVar("--main-color", -2)
);
```

#### Result
```
console > --main-color lighter : #FFF
console > --main-color darkness : #DDD
```
