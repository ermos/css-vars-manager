'use strict';

import Axios from "axios";

export interface varsCollection {
    tag: string
    color?: string
    value?: string
    shadeCount?: number
}

let root: CSSStyleDeclaration | null  = null
let collection = new Map<string, number>()

const intToHex: any = [
    '0', '1', '2', '3', '4',
    '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F'
]

const hexToInt: any = {
    0: '0', 1: '1', 2: '2', 3: '3', 4: '4',
    5: '5', 6: '6', 7: '7', 8: '8', 9: '9',
    A: '10', B: '11', C: '12', D: '13',
    E: '14', F: '15', a: '10', b: '11',
    c: '12', d: '13', e: '14', f: '15'
}

const color = {

    lighter(hex: string, power: number) {
        let base = hex.substr(1, 6).split('')
        let finalHex = '#';
        base.forEach(function(element){
            let current: number = parseInt(hexToInt[element])
            if(current + power > 15){
                current = 15
            }else{
                current = current + power
            }
            finalHex += intToHex[current]
        })
        return finalHex
    },

    darkness(hex: string, power: number) {
        let base = hex.substr(1, 6).split('')
        let finalHex = '#';
        base.forEach(function(element: any){
            let current: number = parseInt(hexToInt[element])
            if(current - power < 0){
                current = 0
            }else{
                current = current - power
            }
            finalHex += intToHex[current]
        })
        return finalHex
    }

}

function _setRoot (): void {
    root = document.documentElement.style
}

function _setVar (e: varsCollection): void {
    if (root !== null) {
        if (e.color !== undefined) {
            root.setProperty(e.tag, e.color);
            if (e.shadeCount !== undefined) {
                collection.set(e.tag, e.shadeCount);
                _setShade(e);
            }
        } else if (e.value !== undefined) {
            root.setProperty(e.tag, e.value);
        }
    }
}

function _updateVar (e: varsCollection): void {
    if (collection.get(e.tag) !== undefined && e.color !== undefined && root !== null) {
        root.setProperty(e.tag, e.color);
        _setShade({
            tag: e.tag,
            color: e.color,
            shadeCount: collection.get(e.tag),
        });
    }
}

function _setShade (e: varsCollection): void {
    if (root !== null && e.shadeCount !== undefined && e.color !== undefined) {
        for (let i = 1; i <= e.shadeCount; i++) {
            root.setProperty(e.tag + '-light-' + i, color.lighter(e.color, i*2));
            root.setProperty(e.tag + '-dark-' + i, color.darkness(e.color, i*2));
        }
    }
}

function _getShadeFrom (hex: string, power: number): string {
    if (power < 0) {
        return color.darkness(hex, Math.abs(power));
    } else if (power > 0) {
        return color.lighter(hex, power);
    } else {
        return hex;
    }
}

export const cssVars =  {
    setCollection (vars: varsCollection[]): void {
        if (root === null) {
            _setRoot()
        }

        vars.forEach(e => {
            _setVar(e)
        })
    },
    importCollection (jsonFile: string): void {
        if (root === null) {
            _setRoot()
        }

        Axios.get(jsonFile)
            .then(r => {
                if (root === null) {
                    throw new Error("root can't be null")
                }
                let values: varsCollection[] = r.data
                for (let i = 0; i < values.length; i++) {
                    _setVar(values[i])
                }
            })
            .catch(err => {
                console.error("[css-vars-managemer] ", err)
            })
    },
    get (tag: string): string | null {
        if (root === null) {
            _setRoot()
        }
        if (root !== null) {
            return root.getPropertyValue(tag);
        }
        return null;
    },
    set (e: varsCollection): void {
        if (root === null) {
            _setRoot()
        }
        _setVar(e)
    },
    update (e: varsCollection): void {
        if (root === null) {
            _setRoot()
        }
        _updateVar(e)
    },
    getShadeFromHex (hex: string, power: number): string {
        return _getShadeFrom(hex, power)
    },
    getShadeFromVar (vars: string, power: number): string | null {
        if (root === null) {
            _setRoot()
            if (root === null) {
                return null
            }
        }
        return _getShadeFrom(root.getPropertyValue(vars), power)
    }
}

export const darkMode = {
    init (): void {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // dark mode
        }
    },

    watcher (): void {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            const newColorScheme = e.matches ? "dark" : "light";
        });
    }
}

