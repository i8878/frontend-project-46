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

export { getFileExtension, isObject, replaceCharAt }