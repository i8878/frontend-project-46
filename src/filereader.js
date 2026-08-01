import fs from 'fs'
import path from 'path'
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
        console.log('Error: ' + e)
    }
    
    return content.join('')
}


export default(path1, path2) => {
    const difference = []
    const text1 = readFile(path1)
    const text2 = readFile(path2)
    const json1 = JSON.parse(text1)
    const json2 = JSON.parse(text2)
    const merged = { ...json1, ...json2 }
    for (let p in merged) {
        if (Object.hasOwn(json1, p)) {
            if (Object.hasOwn(json2, p)) {
                if (json1[p] === json2[p]) {
                    difference.push({ label: ' ', property: p, value: json1[p] })
                }else{
                    difference.push({ label: '-', property: p, value: json1[p] })
                    difference.push({ label: '+', property: p, value:  json2[p] })
                }
            }else{
                difference.push({ label: '+', property: p, value: json1[p] })
            }
        }else{
            difference.push({ label: '+', property: p, value: json2[p] })
        }
    }
    difference.sort((a, b) => a.property.localeCompare(b.property))

    //return '{\n' + difference.map(x=>`  ${x.label} ${x.property}: ${x.value}\n`).join('') + '}'
    return difference //.map(x=>`${x.label} ${x.property}: ${x.value}\n`)
}



