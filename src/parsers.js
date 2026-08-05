import fs from 'node:fs'
import { load } from 'js-yaml'
import _path from 'path'

const readFile = (path) => {
    const content = []
    let bytesRead
    try{
        path = _path.join(process.cwd(), path)
        const fd = fs.openSync(path, 'r')
        const buffer = Buffer.alloc(1024)
        do {
            bytesRead = fs.readSync(fd, buffer, 0, 1024, null)
            content.push(buffer.toString('utf8', 0, bytesRead));
        } while(bytesRead > 0)
        fs.closeSync(fd)
    }catch(e){
        //throw new Error('Ошибка чтения файла')
        console.log('Error: ' + e)
    }
    
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


export { jsonParse, yamlParse }