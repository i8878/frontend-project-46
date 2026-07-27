import fs from 'fs'
import _path from 'path'

export default (path) => {
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
        console.log('Error: ' + e)
    }
    
    return content.join('')
}


