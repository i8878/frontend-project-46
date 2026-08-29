import path, { extname } from "node:path"


const isObject = (v) => typeof v === 'object' && v !== null


const formatValue = (value, w = '\'') => {
    let result
    if (Array.isArray(value)) { 
        result = '[complex value]'
    } else {
        if( typeof value === 'string') {
            result = w + value + w
        } else {
            result = value
        }
    }
    return result
}

const getFullName = (text) => {
    let result
    const dirs = text.split('/')
    if (path.isAbsolute(text)) {
        result = path.join('/', ...dirs) 
    } else {
        result = path.resolve(...dirs)
    }

    return result
}
 
export { isObject, formatValue, getFullName, extname } 