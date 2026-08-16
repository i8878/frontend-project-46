import getStylish from './stylish.js'
import getPlain from './plain.js'

const formatter = (diff, settings) => {
    switch (settings.type) {
        case 'stylish': return getStylish(diff, settings)
        case 'plain': return getPlain(diff) 
        default: return diff
    }        
}

export default formatter