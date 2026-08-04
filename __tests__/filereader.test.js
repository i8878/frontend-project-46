import fileDiff from '../src/filereader.js'

let path1
let path2

beforeAll(() => {
    path1 = './file1.json'
    path2 = './file2.json' 
})

test('non difference', () => {
    expect(fileDiff(path1, path1)).toEqual([
        { label: " ", property: "follow", value: false },
        { label: " ", property: "host", value: "hexlet.io" }, 
        { label: " ", property: "proxy", value: "123.234.53.22" }, 
        { label: " ", property: "timeout", value: 50 } 
    ])
})