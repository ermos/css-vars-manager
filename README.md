# CSS Vars Manager
> Manage your CSS variables dynamically with Javascript

CSS Vars Manager is a ready to use CSS Variable's Manager using javascript.
You can set variable dynamically and update them without write one thousand line of code.
The libary offers a css variables importer, useful for a dark mode theme for example.

## 🚀 Install

```
npm i css-vars-manager
```

## 🔦 Usage

The library contains two object that you can import on your project, `cssVars` to manage you're CSS variables and
`darkMode` for working with browser dark mode feature. Let's see what you can make with this package.

### Working

all `cssVars`'s method work with a classic object's interface :

```typescript
 interface varsCollection {
    tag: string
    color?: string
    value?: string
    shadeCount?: number
}
```

Objects need to contain `tag`'s key, this is you're css tag's name. If you want working with color, you need to use `color`'s
key, with that we can generate shade of your color. Per default we generate zero shade,
you need to specify how many shade you want with using `shadeCount`'s key. For other type of css variable, you can simply use
`value`'s key.

-----------

# cssVars

### Methods

- [set()](#set)
- [get()](#get)
- [update()](#update)
- [setCollection()](#set-collection)
- [importCollection()](#import-collection)
- [getShadeFromHex()](#get-shade-from-hex)
- [getShadeFromVar()](#get-shade-from-vars)

-----------

<h3 id="set">set()</h3>

> Allows you to push a variable.

#### Example
```javascript
import { cssVars } from "css-vars-manager";

cssVars.set({
    tag: "--interface-size",
    value: "1200px"
});
cssVars.set({
    tag: "--main-color",
    color: "#000",
    shadeCount: 1
});
```

#### Result
```css
html {
    --interface-size: 1200px;
    --main-color: #000;
    --main-color-light-1: #222;
    --main-color-dark-1: #000;
}
```

-----------

<h3 id="get">get()</h3>

> Get a variable's value.

#### Example
```css
html {
    --interface-size: "1200px";
    --main-color: #000;
}
```
```javascript
import { cssVars } from "css-vars-manager";

console.log(
    cssVars.get("--interface-size"),
    cssVars.get("--main-color")
);
```

#### Result
```
console > 1200px #000
```

-----------

<h3 id="update">update()</h3>

> Allows you to update a variable.

If your variable have been add with `color`'s tag, you don't need to specify `shadeCount`'s tag, we use the `shadeCount` you
used for initialize this variable.

#### Example
```javascript
import { cssVars } from "css-vars-manager";

cssVars.update({
    tag: "--interface-size",
    value: "1200px"
});
cssVars.update({
    tag: "--main-color",
    color: "#FFF",
});
```

#### Result
```css
html {
    --interface-size: 1200px;
    --main-color: #FFF;
    --main-color-light-1: #FFF;
    --main-color-dark-1: #DDD;
}
```

-----------

<h3 id="set-collection">setCollection()</h3>

> Allows to set multiple css variables from an array.

#### Example
```javascript
import { cssVars } from "css-vars-manager";

cssVars.setCollection(
    [
        {
            tag: "--logo",
            value: "url('/static/logo.svg')",
        },
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
    --logo: url('/static/logo.svg');
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
}
```

-----------

<h3 id="import-collection">importCollection()</h3>

> Allows to import a variables configuration from JSON file.

#### Example

##### dark.json
````json
[
  {
    "tag": "--logo",
    "value": "url('/static/logo_dark.svg')"
  },
  {
    "tag": "--main-color",
    "color": "#000",
    "shadeCountolor": 3
  },
  {
    "tag": "--text-color",
    "color": "#fff",
    "shadeCountolor": 1
  },
  {
    "tag": "--neutral-color",
    "color": "#d5514b"
  }
]
````

```javascript
import { cssVars } from "css-vars-manager";

cssVars.importVarsCollection("/static/theme/dark.json");
```

#### Result
```css
html {
    --logo: url('/static/logo_dark.svg');
    --main-color: #000;
    --main-color-light-1: #FFF;
    --main-color-dark-1: #DDD;
    --main-color-light-2: #FFF;
    --main-color-dark-2: #BBB;
    --main-color-light-3: #FFF;
    --main-color-dark-3: #999;
    --text-color: #fff;
    --text-color-light-1: #222;
    --text-color-dark-1: #000;
    --neutral-color: #d5514b;
}
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
