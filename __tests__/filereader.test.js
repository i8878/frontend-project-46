import fileDiff from '../src/filereader.js'

const path1
const path2

beforeAll(() => {
    path1 = '../file1.json'
    path2 = '../file2.json' 
})

test('non difference', () => {
    expect(fileDiff(path1, path1)).toEqual({ "host": "hexlet.io", "timeout": 50, "proxy": "123.234.53.22", "follow": false })
})