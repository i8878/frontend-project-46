import fileDiff from '../src/filereader.js'
import { readFile } from '../src/parsers.js'
import { test, expect, beforeAll } from '@jest/globals'

let path1
let path2
let path3
let path4
let path5
let path6
let path7
let nondiff
let diff
let count
let repeater

beforeAll(() => {
    path1 = './__fixtures__/file1.json'
    path2 = './__fixtures__/file2.json' 
    path3 = './__fixtures__/file3.json'
    path4 = './__fixtures__/file1.yaml'
    path5 = './__fixtures__/file2.yaml'
    path6 = './__fixtures__/file1.xlm'
    path7 = './__fixtures__/file3.yaml'
    nondiff = readFile('./__fixtures__/nondiff.txt')
    diff = readFile('./__fixtures__/diff.txt')
    count = 1
    repeater = ' '
})

test('non difference json', () => {
    expect(fileDiff(path1, path1, 'list')).toEqual(nondiff)}) 

test('difference json', () => {
    expect(fileDiff(path1, path2, 'list')).toEqual(diff)})

test('non difference yaml', () => {
    expect(fileDiff(path4, path4, 'list')).toEqual(nondiff)
})

test('difference yaml', () => {
    expect(fileDiff(path4, path5, 'list')).toEqual(diff)
})

test('empty file', () => {
    expect(() => fileDiff(path1, path3, 'list')).not.toThrow()
})

test('unsupported format', () => {
    expect(() => fileDiff(path6, path6, 'list')).toThrow('Формат файлов не поддерживается')
})

test('difference format', () => {
    expect(() => fileDiff(path1, path4, 'list')).toThrow('Файлы должны быть с одинаковыми расширениями')
})

