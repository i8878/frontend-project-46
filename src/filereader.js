import fs from 'fs'

const fileReader = (path) => {
    const fd = fs.openSync(path, 'r')
    const buffer = Buffer.alloc(1024)
    const content = []
    let bytesRead
    do {
        bytesRead = fs.readSync(fd, buffer, 0, 1024, null)
        content.push(buffer.toString('utf8', 0, bytesRead));
    } while(bytesRead > 0)
    fs.closeSync(fd)
    return content.join('')
}

fileReader('../file1.json')

export { fileReader }

