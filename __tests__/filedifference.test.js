import fileDiff from '../src/filedifference.js'
import { readFile } from '../src/parsers.js'
import { test, expect, beforeAll } from '@jest/globals'

let path1
let path2
let path3
let path4
let path5
let path6
let nondiff
let nondiff_j
let diff_s
let diff_p
let diff_j

beforeAll(() => {
    path1 = './__fixtures__/file1.json'
    path2 = './__fixtures__/file2.json' 
    path3 = './__fixtures__/file3.json'
    path4 = './__fixtures__/file1.yaml'
    path5 = './__fixtures__/file2.yaml'
    path6 = './__fixtures__/file1.xlm'
    nondiff = readFile('./__fixtures__/nondiff.txt')
    nondiff_j = readFile('./__fixtures__/nondiffJSON.txt')
    diff_s = readFile('./__fixtures__/diff.txt')
    diff_p = readFile('./__fixtures__/diffPlain.txt')
    diff_j = readFile('./__fixtures__/diffJSON.txt')
})

test('non difference json format: stylish', () => {
    expect(fileDiff(path1, path1, 'stylish')).toEqual(nondiff)}) 

test('non difference json format: plain', () => {
    expect(fileDiff(path1, path1, 'plain')).toEqual('')
})

test('non difference json format: json', () => {
    expect(fileDiff(path1, path1, 'json')).toEqual(nondiff_j)
})

test('difference json format: stylish', () => {
    expect(fileDiff(path1, path2, 'stylish')).toEqual(diff_s)})

test('difference json format: plain', () => {
    expect(fileDiff(path1, path2, 'plain')).toEqual(diff_p)
})

test('difference json format: json', () => {
    expect(fileDiff(path1, path2, 'json')).toEqual(diff_j)
})

test('non difference yaml stylish', () => {
    expect(fileDiff(path4, path4, 'stylish')).toEqual(nondiff)
})

test('difference yaml stylish', () => {
    expect(fileDiff(path4, path5, 'stylish')).toEqual(diff_s)
})

test('empty file', () => {
    expect(() => fileDiff(path1, path3, 'stylish')).not.toThrow()
})

test('unsupported format', () => {
    expect(() => fileDiff(path6, path6, 'stylish')).toThrow('Формат файлов не поддерживается')
})

test('difference format', () => {
    expect(() => fileDiff(path1, path4, 'stylish')).toThrow('Файлы должны быть с одинаковыми расширениями')
})

