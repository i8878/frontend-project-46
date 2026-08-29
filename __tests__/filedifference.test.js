import fileDiff from '../src/filedifference.js'
import { readFile } from '../src/parsers.js'
import { test, expect, describe } from 'vitest'
import path from 'path'


const _dirname = path.basename(import.meta.dirname)
const getFixtureName = (name) => path.join('/', _dirname , '..', '__fixtures__', name)

const resultStylish = readFile(getFixtureName('diffStylish.txt'))
const resultPlain = readFile(getFixtureName('diffPlain.txt'))
const resultJson = readFile(getFixtureName('diffJson.txt'))


describe('test json files', () => {
    test('compare files format: stylish', () => {
        expect(fileDiff(getFixtureName('file1.json'), getFixtureName('file2.json'), 'stylish')).toEqual(resultStylish)
    })

    test('compare files format: plain', () => {
        expect(fileDiff(getFixtureName('file1.json'), getFixtureName('file2.json'), 'plain')).toEqual(resultPlain)
    })

    test('compare files format: json', () => {
        expect(fileDiff(getFixtureName('file1.json'), getFixtureName('file2.json'), 'json')).toEqual(resultJson)
    })

    test('compare two identical files', () => {
        expect(fileDiff(getFixtureName('file1.json'), getFixtureName('file1.json'))).toBe('Файлы не имеют отличий')
    })
})

describe('test yaml files', () => {
    test('compare files format: stylish', () => {
        expect(fileDiff(getFixtureName('file1.yml'), getFixtureName('file2.yml'), 'stylish')).toEqual(resultStylish)
    })

    test('compare files format: plain', () => {
        expect(fileDiff(getFixtureName('file1.yml'), getFixtureName('file2.yml'), 'plain')).toEqual(resultPlain)
    })

    test('compare files format: json', () => {
        expect(fileDiff(getFixtureName('file1.yml'), getFixtureName('file2.yml'), 'json')).toEqual(resultJson)
    })

    test('compare identical files', () => {
        expect(fileDiff(getFixtureName('file1.yml'), getFixtureName('file1.yml'))).toBe('Файлы не имеют отличий')
    })
})

describe('not supported files extension', () => {
    test('first file extension not supported', () => {
        expect(() => fileDiff(getFixtureName('file1.xml'), getFixtureName('file1.json'))).toThrow('Формат файла .xml не поддерживается')
    })
    test('second file extension not supported', () => {
        expect(() => fileDiff(getFixtureName('file1.json'), getFixtureName('file1.xml'))).toThrow('Формат файла .xml не поддерживается')
    })
})

