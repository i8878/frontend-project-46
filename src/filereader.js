import { jsonParse, yamlParse } from './parsers.js'

const getFileExtension = (path) => {
    const reverse = path.split('').reverse().join('')
    return  reverse.substring(0, reverse.indexOf('.')).trim('/').split('').reverse().join('')
}

export default(path1, path2) => {
    const difference = []
    let obj1
    let obj2
    if (getFileExtension(path1) !== getFileExtension(path2)) {
        throw new Error('Файлы должны быть с одинаковыми расширениями')
    } else if (getFileExtension(path1) === 'json') {
        obj1 = jsonParse(path1)
        obj2 = jsonParse(path2)
    } else if (getFileExtension(path1) === 'yaml' || getFileExtension(path1) === 'yml') {
        obj1 = yamlParse(path1)
        obj2 = yamlParse(path2)
    } else {
        throw new Error('Формат файлов не поддерживается')
    }
    const merged = { ...obj1, ...obj2 }
    for (let p in merged) {
        if (Object.hasOwn(obj1, p)) {
            if (Object.hasOwn(obj2, p)) {
                if (obj1[p] === obj2[p]) {
                    difference.push({ label: ' ', property: p, value: obj1[p] })
                } else {
                    difference.push({ label: '-', property: p, value: obj1[p] })
                    difference.push({ label: '+', property: p, value:  obj2[p] })
                }
            } else {
                difference.push({ label: '+', property: p, value: obj1[p] })
            }
        } else {
            difference.push({ label: '+', property: p, value: obj2[p] })
        }
    }
    
    return difference.sort((a, b) => a.property.localeCompare(b.property))
}



