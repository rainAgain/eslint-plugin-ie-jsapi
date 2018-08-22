module.exports = {
  methods: [
    'forEach',
    'isArray',
    'indexOf',
    'lastIndexOf',
    'every',
    'some',
    'map',
    'filter',
    'reduce',
    'reduceRight',
    'create',
    'defineProperty',
    'defineProperties',
    'getPrototypeOf',
    'keys',
    'seal',
    'freeze',
    'preventExtensions',
    'isSealed',
    'isFrozen',
    'isExtensible',
    'getOwnPropertyDescriptor',
    'getOwnPropertyNames',
    'trim'
  ],
  tips: {
    "trim": {
      unsuportBrowser: 'IE8 (字符串的调用不支持, 请用 jquery 的 trim 方法)'
    }
  }
}