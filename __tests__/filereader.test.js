import fileDiff from '../src/filereader.js'
import { test, expect, beforeAll } from '@jest/globals'

let path1
let path2
let path3
let path4
let path5
let path6

beforeAll(() => {
    path1 = './__fixtures__/file1.json'
    path2 = './__fixtures__/file2.json' 
    path3 = './__fixtures__/file3.json'
    path4 = './__fixtures__/file1.yaml'
    path5 = './__fixtures__/file2.yaml'
    path6 = './__fixtures__/file1.xlm'
})

test('non difference json', () => {
    expect(fileDiff(path1, path1)).toEqual([
        { label: " ", property: "follow", value: false },
        { label: " ", property: "host", value: "hexlet.io" }, 
        { label: " ", property: "proxy", value: "123.234.53.22" }, 
        { label: " ", property: "timeout", value: 50 } 
    ])
})

test('difference json', () => {
    expect(fileDiff(path1, path2)).toEqual([
        { label: "+", property: "follow", value: false },
        { label: " ", property: "host", value: "hexlet.io" },
        { label: "+", property: "proxy", value: "123.234.53.22" },    
        { label: "-", property: "timeout", value: 50 },
        { label: "+", property: "timeout", value: 20 },
        { label: "+", property: "verbose", value: true },
    ])
})

test('non difference yaml', () => {
    expect(fileDiff(path4, path4)).toEqual([
        { label: " ", property: "follow", value: false },
        { label: " ", property: "host", value: "hexlet.io" }, 
        { label: " ", property: "proxy", value: "123.234.53.22" }, 
        { label: " ", property: "timeout", value: 50 } 
    ])
})

test('difference yaml', () => {
    expect(fileDiff(path4, path5)).toEqual([
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

test('unsupported format', () => {
    expect(() => fileDiff(path6, path6)).toThrow('Формат файлов не поддерживается')
})

test('difference format', () => {
    expect(() => fileDiff(path1, path4)).toThrow('Файлы должны быть с одинаковыми расширениями')
})

