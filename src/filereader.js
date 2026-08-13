import { jsonParse, yamlParse } from './parsers.js'



export default(path1, path2, format) => {
    const replacer = ' '
    const count = 2
    const labels = { "not": ' ', "1>2": '-', "1<2": '+' }
    let _obj1
    let _obj2
    if (getFileExtension(path1) !== getFileExtension(path2)) {
        throw new Error('Файлы должны быть с одинаковыми расширениями')
    } else if (getFileExtension(path1) === 'json') {
        _obj1 = jsonParse(path1)
        _obj2 = jsonParse(path2)
    } else if (getFileExtension(path1) === 'yaml' || getFileExtension(path1) === 'yml') {
        _obj1 = yamlParse(path1)
        _obj2 = yamlParse(path2)
    } else {
        throw new Error('Формат файлов не поддерживается')
    }
    const iter = (obj1, obj2, i) => {
        const difference = []
        const merged = { ...obj1, ...obj2 }
        for (let p in merged) {
            if (Object.hasOwn(obj1, p)) {
                if (Object.hasOwn(obj2, p)) {
                    if (obj1[p] === obj2[p]) {
                        difference.push({
                            label: `${replacer.repeat(count * i )}${labels['not']}`,
                            property: p,
                            value: obj1[p]
                        })
                    // Значение свойства первого объекта не равно значению второго объекта 
                    } else {
                        if (isObject(obj1[p]) && isObject(obj2[p])) {
                            difference.push({
                                label: `${replacer.repeat(count * i)}${labels['not']}`,
                                property: p,
                                value: iter(obj1[p], obj2[p], i + 1)
                            })
                        } else if (isObject(obj1[p])) {
                            difference.push({
                                label: `${replacer.repeat(count * i)}${labels['1>2']}`,
                                property: p,
                                value: iter(obj1[p], structuredClone(obj1[p]), i + 1)
                            })
                            difference.push({
                                label: `${replacer.repeat(count * i)}${labels['1<2']}`,
                                property: p,
                                value: obj2[p]
                            })

                        } else if (isObject(obj2[p])) {
                            difference.push({
                                label: `${replacer.repeat(count * i)}${labels['not']}`,
                                property: p,
                                value: iter(obj2[p], structuredClone(obj2[p]), i + 1)
                            })
                            console.log('4')
                            // Значение рассматриваемого свойства не объект
                        } else {
                            difference.push({
                                label: `${replacer.repeat(count * i)}${labels['1>2']}`,
                                property: p,
                                value: obj1[p]
                            })
                            difference.push({
                                label: `${replacer.repeat(count * i)}${labels['1<2']}`,
                                property: p,
                                value: obj2[p]
                            })
                        }
                    }
                // Свойство есть в первом объекте, но нет во втором
                } else {
                    if(isObject(obj1[p])) {
                        difference.push({
                            label: `${replacer.repeat(count * i)}${labels['1>2']}`,
                            property: p,
                            value: iter(obj1[p], structuredClone(obj1[p]), i + 1)
                        })
                    // Значение рассматриваемого свойста не объект
                    } else {
                        difference.push({
                            label: `${replacer.repeat(count * i)}${labels['1>2']}`,
                            property: p,
                            value: obj1[p]
                        })
                    }
                }
            // Свойство есть во втором объекте, но нет в первом
            } else {
                if (isObject(obj2[p])) {
                    difference.push({
                        label: `${replacer.repeat(count * i)}${labels['1<2']}`,
                        property: p,
                        value: iter(obj2[p], structuredClone(obj2[p]), i + 1)
                    })
                } else {
                    difference.push({
                        label: `${replacer.repeat(count * i)}${labels['1<2']}`,
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

const formatter = (diff, type) => {
    const printStylish = (diff, nested = false) => {
        console.log('{')
        for (let s of diff) {
            if (Array.isArray(s.value)) {
                process.stdout.write(`${s.label}${s.property}: `) 
                printStylish(s.value, true)
                console.log(replaceCharAt(s.label, s.label.length - 1, ' }') )
            } else {
                console.log(`${s.label}${s.property}: ${s.value}`)            
            }
        }
        if (!nested) console.log('}')
    }
    const getStylish = (diff, nested = false) => {
        const result = ['{']
        for (let s of diff) {
            if (Array.isArray(s.value)) {
                result.push(`${s.label}${s.property}: ${getStylish(s.value, true)}`)
                result.push(replaceCharAt(s.label, s.label.length - 1, ' }') )
            } else {
                result.push(`${s.label}${s.property}: ${s.value}`)            
            }
        }
        if (!nested) result.push('}')
        
        return result.join('\n')
    }

    switch (type) {
        case 'stylish': printStylish(diff) 
            break
        case 'list': return getStylish(diff)
        case 'raw': 
        default: return diff
    }   
}

const getFileExtension = (path) => {
    const reverse = path.split('').reverse().join('')
    return  reverse.substring(0, reverse.indexOf('.')).trim('/').split('').reverse().join('')
}

const isObject = (v) => typeof v === 'object' && v !== null
const replaceCharAt = (text, index, char) => {
    if ( index < text.length && index >= 0) {
        return text.substring(0, index) + char + text.substring(index + 1)
    }
}