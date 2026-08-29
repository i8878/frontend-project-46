import parse from './parsers.js'
import formatter from '../src/formatters/index.js'
import { getFullName, isObject } from '../src/helpers.js'


export default(path1, path2, format) => {
    path1 = getFullName(path1)
    path2 = getFullName(path2)
    const _obj1 = parse(path1)
    const _obj2 = parse(path2)
    
    if (JSON.stringify(_obj1) === JSON.stringify(_obj2) ) return 'Файлы не имеют отличий'
    const iter = (obj1, obj2) => {
        const difference = []
        const merged = { ...obj1, ...obj2 }
        for (let p in merged) {
            if (Object.hasOwn(obj1, p)) {
                if (Object.hasOwn(obj2, p)) {
                    if (obj1[p] === obj2[p]) {
                        difference.push({
                            type: '1=2',
                            property: p,
                            value: obj1[p]
                        })
                    // Значение свойства первого объекта не равно значению второго объекта 
                    } else {
                        if (isObject(obj1[p]) && isObject(obj2[p])) {
                            difference.push({
                                type: '1=2',
                                property: p,
                                value: iter(obj1[p], obj2[p])
                            })
                        } else if (isObject(obj1[p])) {
                            difference.push({
                                type: '1>2',
                                property: p,
                                value: iter(obj1[p], structuredClone(obj1[p]))
                            })
                            difference.push({
                                type: '1<2',
                                property: p,
                                value: obj2[p]
                            })

                        } else if (isObject(obj2[p])) {
                            difference.push({
                                type: '1=2',
                                property: p,
                                value: iter(obj2[p], structuredClone(obj2[p]))
                            })
                            // Значение рассматриваемого свойства - не объект
                        } else {
                            difference.push({
                                type: '1>2',
                                property: p,
                                value: obj1[p]
                            })
                            difference.push({
                                type: '1<2',
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
                            property: p,
                            value: iter(obj1[p], structuredClone(obj1[p]))
                        })
                    // Значение рассматриваемого свойста - не объект
                    } else {
                        difference.push({
                            type: '1>2',
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
                        property: p,
                        value: iter(obj2[p], structuredClone(obj2[p]))
                    })
                } else {
                    difference.push({
                        type: '1<2',
                        property: p,
                        value: obj2[p]
                    })
                }
            }
        }

        return difference.sort((a, b) => a.property.localeCompare(b.property)) 
    }
 
    return formatter(iter(_obj1, _obj2, 1), format)
}

