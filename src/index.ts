'use strict';

import Axios from "axios";

export interface colorObject {
    tag: string
    color: string
    shadeCount?: number
}

let root: CSSStyleDeclaration | null  = null
let collection = new Map<string, number>()

const ihCode: any = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
const hiCode: any = {0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', A: '10', B: '11', C: '12', D: '13', E: '14', F: '15', a: '10', b: '11', c: '12', d: '13', e: '14', f: '15'}

const convert = {

    hexToInt (hex: string) {
        return hiCode[hex]
    },

    IntToHex (int: number) {
        return ihCode[int]
    }

}

const color = {

    lighter(hex: string, power: number) {
        let base = hex.substr(1, 6).split('')
        let finalHex = '#';
        base.forEach(function(element){
            let current: number = parseInt(convert.hexToInt(element))
            if(current + power > 15){
                current = 15
            }else{
                current = current + power
            }
            finalHex += convert.IntToHex(current)
        })
        return finalHex
    },

    darkness(hex: string, power: number) {
        let base = hex.substr(1, 6).split('')
        let finalHex = '#';
        base.forEach(function(element: any){
            let current: number = parseInt(convert.hexToInt(element))
            if(current - power < 0){
                current = 0
            }else{
                current = current - power
            }
            finalHex += convert.IntToHex(current)
        })
        return finalHex
    }

}

function _setRoot (): void {
    root = document.documentElement.style
}

function _setShade (e: colorObject): void {
    if (root !== null && e.shadeCount !== undefined) {
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
    setColorsCollection (colors: colorObject[]): void {
        if (root === null) {
            _setRoot()
        }

        colors.forEach(e => {
            if (root !== null) {
                root.setProperty(e.tag, e.color);
                if (e.shadeCount !== undefined) {
                    collection.set(e.tag, e.shadeCount);
                    _setShade(e);
                }
            }
        })
    },
    importVarsCollection (jsonFile: string): void {
        if (root === null) {
            _setRoot()
        }

        Axios.get(jsonFile)
            .then(r => {
                if (root === null) {
                    throw new Error("root can't be null")
                }
                let values = r.data
                for(let name in values){
                    root.setProperty(name, values[name])
                }
            })
            .catch(err => {
                console.error("[css-vars-management] ", err)
            })
    },
    getVar (tag: string): string | null {
        if (root === null) {
            _setRoot()
        }
        if (root !== null) {
            return root.getPropertyValue(tag);
        }
        return null;
    },
    setVar (tag: string, value: string): void {
        if (root === null) {
            _setRoot()
        }
        if (root !== null) {
            root.setProperty(tag, value);
        }
    },
    setColor (e: colorObject): void {
        if (root === null) {
            _setRoot()
        }
        if (root !== null) {
            root.setProperty(e.tag, e.color);
            if (e.shadeCount !== undefined) {
                collection.set(e.tag, e.shadeCount);
                _setShade(e);
            }
        }
    },
    updateColor (tag: string, color: string): void {
        if (root === null) {
            _setRoot()
        }
        if (root !== null) {
            root.setProperty(tag, color);
            if (collection.get(tag) !== undefined) {
                _setShade({
                    tag: tag,
                    color: color,
                    shadeCount: collection.get(tag),
                });
            }
        }
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

