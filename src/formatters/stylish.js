const getStylish = (diff) => {
    const replacer = ' '
    const count = 2
    const labels = { "1=2": ' ', "1>2": '-', "1<2": '+' }
    let depth = 0
    const iter = (diff, nested = false) => {
        const result = ['{']
        depth = nested ? depth + 1 : depth
        for (let s of diff) {
            if (Array.isArray(s.value)) {
                result.push(`${replacer.repeat(count + depth * (count + 2))}${labels[s.type]} ${s.property}: ${iter(s.value, true)}`)
                result.push(`${replacer.repeat(count + (depth * 4) + 2)}}`)
                
            } else {
                result.push(`${replacer.repeat(count + depth * (count + 2))}${labels[s.type]} ${s.property}: ${s.value}`)            
            }
        }    
        if (!nested) result.push('}')
        depth--
        
        return result.join('\n')
    }

    return iter(diff)
}

export default getStylish