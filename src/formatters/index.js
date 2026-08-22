import getStylish from './stylish.js'
import getPlain from './plain.js'


const formatter = (diff, settings) => {
    switch (settings.type) {
        case 'stylish': return getStylish(diff, settings)
        case 'plain': return getPlain(diff)
        case 'json': return JSON.stringify(diff) 
        default: return diff
    }        
}

export default formatter