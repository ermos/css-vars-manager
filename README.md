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

List of methods :

- [SetColorsCollection()](SetColorsCollection())
- [ImportVarsCollection()](ImportVarsCollection())
- [SetColor()](SetColor())
- [UpdateColor()](UpdateColor())
- [GetShadeFromHex()](GetShadeFromHex())
- [GetShadeFromVars()](GetShadeFromVars())

-----------

### SetColorsCollection()

> Allows to set multiple colors variables from an array.

#### Example
```javascript
import { cssVars } from "css-vars-manager";

cssVars.SetColorsCollection(
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

### ImportVarsCollection()

> Allows to import a variables configuration from JSON file.

#### Example
```javascript
import { cssVars } from "css-vars-manager";

cssVars.ImportVarsCollection("/static/theme/dark.json");
```

-----------

### SetColor()

> Allows you to set a variable's color.

#### Example
```javascript
import { cssVars } from "css-vars-manager";

cssVars.SetColor(
        {
          tag: "--main-color",  // # Variable's name
          color: "#000",        // # Variable's color
          shadeCount: 3,        // # Number of shades (light and darkness)
        },
);
```

-----------

### UpdateColor()

> Allows you to update a variable's color (and shades).

#### Example
```javascript
import { cssVars } from "css-vars-manager";

cssVars.UpdateColor("--main-color", "#000");
```

-----------

### GetShadeFromHex()

> Allows you to create shade from a hex color.

#### Example
```javascript
import { cssVars } from "css-vars-manager";

console.log(
    "#000 lighter :",
    cssVars.GetShadeFromHex("#000", 2)
);

console.log(
    "#000 darkness :",
    cssVars.GetShadeFromHex("#000", -2)
);
```

#### Result
```
console > #000 lighter : #222
console > #000 darkness : #000
```

-----------

### GetShadeFromVars()

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
    cssVars.GetShadeFromVars("--main-color", 2)
);

console.log(
    "--main-color darkness :",
    cssVars.GetShadeFromVars("--main-color", -2)
);
```

#### Result
```
console > --main-color lighter : #FFF
console > --main-color darkness : #DDD
```
