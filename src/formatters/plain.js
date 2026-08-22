import { group, formatValue } from '../helpers.js'

const getPlain = (diff) => {
    const result = []
    const getStr = (obj) => {
        let str = ''
        if (obj.value.length === 2) {
            str = `Property '${obj.key}' was updated. From ${formatValue(obj.value[0].value)} to ${formatValue(obj.value[1].value)}`
        } else {
            switch (obj.value[0].label) {
                case '+':
                    str = `Property '${obj.key}' was added with value: ${formatValue(obj.value[0].value)}`
                    break
                case '-':
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




export default getPlain