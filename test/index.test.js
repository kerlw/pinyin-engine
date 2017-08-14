const assert = require('assert');
const PinyinEngine = require('../');

describe('PinyinEngine()', () => {

    describe('#query()', () => {

        it('数据应当支持 `[string]`', () => {
            const pinyinEngine = new PinyinEngine([
                '清华大学',
                '北京大学',
                '中央美院'
            ]);
            assert.deepEqual(['中央美院'], pinyinEngine.query('meiyuan'));
        });
        it('数据应当支持 `[Object]`', () => {
            const pinyinEngine = new PinyinEngine([{
                    id: 0,
                    name: '清华大学'
                },
                {
                    id: 1,
                    name: '北京大学'
                },
                {
                    id: 3,
                    name: '中央美院'
                }
            ], ['name']);
            assert.deepEqual([{
                id: 3,
                name: '中央美院'
            }], pinyinEngine.query('meiyuan'));
        });

    });

    describe('PinyinEngine.participle()', () => {

        it('应当支持单个字符', () => {
            assert.deepEqual(['中', 'zhong'].join('\u0001'), PinyinEngine.participle('中'));
        });

        it('应当支持不在字典中的字符', () => {
            assert.deepEqual('😊', PinyinEngine.participle('😊'));
        });

        it('应当支持多个字符', () => {
            assert.deepEqual(['中国人😊', 'zhongguoren'].join('\u0001'), PinyinEngine.participle('中国人😊'));
        });

        it('应当支持单个多音字', () => {
            assert.deepEqual(['乐', 'le', 'yue'].join('\u0001'), PinyinEngine.participle('乐'));
        });

        it('应当支持多音字组合', () => {
            assert.deepEqual(['乐乐😊', 'lele', 'leyue', 'yuele', 'yueyue'].join('\u0001'), PinyinEngine.participle('乐乐😊'));
        });

    });
});