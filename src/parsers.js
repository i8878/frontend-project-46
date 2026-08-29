import fs from 'node:fs'
import { load } from 'js-yaml'
import _path from 'path'

const readFile = (path) => {
    const content = []
    let bytesRead
    const fd = fs.openSync(path, 'r')
    const buffer = Buffer.alloc(1024)
    do {
        bytesRead = fs.readSync(fd, buffer, 0, 1024, null)
        content.push(buffer.toString('utf8', 0, bytesRead));
    } while(bytesRead > 0)
    fs.closeSync(fd)
    
    
    return content.join('')
}

const jsonParse = (path) => {
    let content
    let jsonContent
    try {
        content = readFile(path)
        jsonContent = JSON.parse(content)
        return jsonContent
    } catch(e) {
        console.log('Error: ' + e)
    }

    return jsonContent
}

const yamlParse = (path) => {
    let content
    let yamlContent
    try {
        content = readFile(path)
        yamlContent = load(content)
    } catch(e) {
        console.log('Error: ' + e)
    }

    return yamlContent
}


export default(path) => {
    let obj
    const ext = _path.extname(path) 
    switch (ext) {
        case '.json':
            obj = jsonParse(path)
            break
        case '.yml':
            obj = yamlParse(path)
            break
        default: 
            throw new Error(`Формат файла ${ext} не поддерживается`) 
    }

    return obj
}


export { jsonParse, yamlParse, readFile }