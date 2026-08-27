import fileDiff from '../src/filedifference.js'
import { readFile } from '../src/parsers.js'
import { test, expect, describe } from 'vitest'
//import { fileURLtoPath } from 'url'
import path from 'path'


const _dirname = path.basename(import.meta.dirname)

const getFileName = (name) => path.join(_dirname , '..', '__fixtures__', name)

const resultStylish = readFile(getFileName('diffStylish.txt'))
const resultPlain = readFile(getFileName('diffPlain.txt'))
const resultJson = readFile(getFileName('diffJson.txt'))


test('compare json files format: stylish', () => {
    expect(fileDiff(getFileName('file1.json'), getFileName('file2.json'), 'stylish')).toEqual(resultStylish)
})

test('compare json files format: plain', () => {
    expect(fileDiff(getFileName('file1.json'), getFileName('file2.json'), 'plain')).toEqual(resultPlain)
})

test('compare json files format: json', () => {
    expect(fileDiff(getFileName('file1.json'), getFileName('file2.json'), 'json')).toEqual(resultJson)
})

test('compare two identical files', () => {
    expect(fileDiff(getFileName('file1.json'), getFileName('file1.json'))).toBe('Файлы не имеют отличий')
})

describe('not supported files extension', () => {
    test('first file extension not supported', () => {
        expect(() => fileDiff(getFileName('file1.xml'), getFileName('file1.json'))).toThrow('Формат файла xml не поддерживается')
    })
    test('second file extension not supported', () => {
        expect(() => fileDiff(getFileName('file1.json'), getFileName('file1.xml'))).toThrow('Формат файла xml не поддерживается')
    })
})

