
const getStylish = (diff, settings) => {
    const { replacer, count } = settings
    const labels = { "1=2": ' ', "1>2": '-', "1<2": '+' }
    const iter = (diff, nested = false) => {
        const result = ['{']
        for (let s of diff) {
            if (Array.isArray(s.value)) {
                result.push(`${replacer.repeat(count * s.depth)}${labels[s.type]}${s.property}: ${iter(s.value, true)}`)
                result.push(`${replacer.repeat(count * s.depth + 1)}}`)
            } else {
                result.push(`${replacer.repeat(count * s.depth)}${labels[s.type]}${s.property}: ${s.value}`)            
            }
        }    
        if (!nested) result.push('}')
        
        return result.join('\n')
    }
        
    return iter(diff)
}

export default getStylish