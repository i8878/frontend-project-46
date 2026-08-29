import getStylish from './stylish.js'
import getPlain from './plain.js'


const formatter = (diff, type) => {
    switch (type) {
        case 'plain': return getPlain(diff)
        case 'json': return JSON.stringify(diff)
        case 'stylish':
        default: return getStylish(diff)
    }        
}

export default formatter