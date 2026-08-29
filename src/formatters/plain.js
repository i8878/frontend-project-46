import { formatValue } from '../helpers.js'

const getPlain = (diff) => {
    const result = []
    const getStr = (obj) => {
        let str = ''
        if (obj.value.length === 2) {
            str = `Property '${obj.key}' was updated. From ${formatValue(obj.value[0].value)} to ${formatValue(obj.value[1].value)}`
        } else {
            switch (obj.value[0].type) {
                case '1<2':
                    str = `Property '${obj.key}' was added with value: ${formatValue(obj.value[0].value)}`
                    break
                case '1>2':
                    str = `Property '${obj.key}' was removed`
                    break
                }   
            }
            
            return str
        }

        const grouped = group(diff)
        Object.keys(grouped).map(x=> result.push(getStr({ key: x, value: grouped[x]})))
        
        return result.filter(x=> x.length > 0).join('\n')
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


export default getPlain