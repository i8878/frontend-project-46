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

const group = (arr) => {
    const group = {}
        const iter = (arr, parent = '') => {
            for (let s of arr) {
                const key = `${parent}${parent.length > 0 ? '.' + s.property : s.property }`
                if(Object.hasOwn(group, key)) {
                    group[key].push({ type: s.type, value: s.value })
                } else {
                    group[key] = [{ type: s.type, value: s.value }]
                }
                if (Array.isArray(s.value)) iter(s.value, key)
            }
        }
    
    iter(arr)
    return group
}

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


export { getFileExtension, isObject, replaceCharAt, group, formatValue }