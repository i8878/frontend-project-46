import fileDiff from '../src/filereader.js'
import { test, expect, beforeAll } from '@jest/globals'

let path1
let path2
let path3

beforeAll(() => {
    path1 = './__fixtures__/file1.json'
    path2 = './__fixtures__/file2.json' 
    path3 = './__fixtures__/file3.json'
})

test('non difference', () => {
    expect(fileDiff(path1, path1)).toEqual([
        { label: " ", property: "follow", value: false },
        { label: " ", property: "host", value: "hexlet.io" }, 
        { label: " ", property: "proxy", value: "123.234.53.22" }, 
        { label: " ", property: "timeout", value: 50 } 
    ])
})

test('difference', () => {
    expect(fileDiff(path1, path2)).toEqual([
        { label: "+", property: "follow", value: false },
        { label: " ", property: "host", value: "hexlet.io" },
        { label: "+", property: "proxy", value: "123.234.53.22" },    
        { label: "-", property: "timeout", value: 50 },
        { label: "+", property: "timeout", value: 20 },
        { label: "+", property: "verbose", value: true },
    ])
})

test('empty file', () => {
    expect(fileDiff(path1, path3)).toEqual([
        { label: "+", property: "follow", value: false },
        { label: "+", property: "host", value: "hexlet.io" },
        { label: "+", property: "proxy", value: "123.234.53.22" },
        { label: "+", property: "timeout", value: 50 },
    ])
})
