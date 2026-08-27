import { jsonParse, yamlParse } from './parsers.js'
import formatter from '../src/formatters/index.js'
import { getFileExtension, isObject } from '../src/helpers.js'


export default(path1, path2, format) => {
    const replacer = ' '
    const count = 2
    //const types = { "not": ' ', "1>2": '-', "1<2": '+' }
    let _obj1
    let _obj2
    
    if (getFileExtension(path1) === 'json') {
        _obj1 = jsonParse(path1)
    } else if (getFileExtension(path1) === 'yaml' || getFileExtension(path1) === 'yml') {
        _obj1 = yamlParse(path1)
    } else {
        throw new Error(`Формат файла ${getFileExtension(path1)} не поддерживается`)
    }
    
    if (getFileExtension(path2) === 'json') {
        _obj2 = jsonParse(path2)
    } else if (getFileExtension(path2) === 'yaml' || getFileExtension(path2) === 'yml') {
        _obj2 = yamlParse(path1)
    } else {
        throw new Error(`Формат файла ${getFileExtension(path2)} не поддерживается`)
    }

    if (JSON.stringify(_obj1) === JSON.stringify(_obj2) ) return 'Файлы не имеют отличий'
    const iter = (obj1, obj2, i) => {
        const difference = []
        const merged = { ...obj1, ...obj2 }
        for (let p in merged) {
            if (Object.hasOwn(obj1, p)) {
                if (Object.hasOwn(obj2, p)) {
                    if (obj1[p] === obj2[p]) {
                        difference.push({
                            type: '1=2',
                            depth: i,
                            property: p,
                            value: obj1[p]
                        })
                    // Значение свойства первого объекта не равно значению второго объекта 
                    } else {
                        if (isObject(obj1[p]) && isObject(obj2[p])) {
                            difference.push({
                                type: '1=2',
                                depth: i,
                                property: p,
                                value: iter(obj1[p], obj2[p], i + 1)
                            })
                        } else if (isObject(obj1[p])) {
                            difference.push({
                                type: '1>2',
                                depth: i,
                                property: p,
                                value: iter(obj1[p], structuredClone(obj1[p]), i + 1)
                            })
                            difference.push({
                                type: '1<2',
                                depth: i,
                                property: p,
                                value: obj2[p]
                            })

                        } else if (isObject(obj2[p])) {
                            difference.push({
                                type: '1=2',
                                depth: i,
                                property: p,
                                value: iter(obj2[p], structuredClone(obj2[p]), i + 1)
                            })
                            // Значение рассматриваемого свойства - не объект
                        } else {
                            difference.push({
                                type: '1>2',
                                depth: i,
                                property: p,
                                value: obj1[p]
                            })
                            difference.push({
                                type: '1<2',
                                depth: i,
                                property: p,
                                value: obj2[p]
                            })
                        }
                    }
                // Свойство есть в первом объекте, но нет во втором
                } else {
                    if(isObject(obj1[p])) {
                        difference.push({
                            type: '1>2',
                            depth: i,
                            property: p,
                            value: iter(obj1[p], structuredClone(obj1[p]), i + 1)
                        })
                    // Значение рассматриваемого свойста - не объект
                    } else {
                        difference.push({
                            type: '1>2',
                            depth: i,
                            property: p,
                            value: obj1[p]
                        })
                    }
                }
            // Свойство есть во втором объекте, но нет в первом
            } else {
                if (isObject(obj2[p])) {
                    difference.push({
                        type: '1<2',
                        depth: i,
                        property: p,
                        value: iter(obj2[p], structuredClone(obj2[p]), i + 1)
                    })
                } else {
                    difference.push({
                        type: '1<2',
                        depth: i,
                        property: p,
                        value: obj2[p]
                    })
                }
            }
        }

        return difference.sort((a, b) => a.property.localeCompare(b.property)) 
    }
 
    return formatter(iter(_obj1, _obj2, 1), { type: format, replacer: replacer, count: count })
}