"use strict";
exports.__esModule = true;
// 测试用例
var testCase_1 = require("../../../share/src/testCase");
var generateRandomArray = testCase_1["default"].generateRandomArray,
  testSortAlgorithm = testCase_1["default"].testSortAlgorithm;
/**
 * @description 冒泡排序
 */
function bubbleSort(array) {
  var _a;
  for (var i = array.length - 1; i > 0; i--) {
    for (var j = 0; j < i; j++) {
      if (array[j] > array[j + 1]) {
        // 数组两个元素调换位置，利用了es6解构赋值
        (_a = [array[j + 1], array[j]]),
          (array[j] = _a[0]),
          (array[j + 1] = _a[1]);
      }
    }
  }
  return array;
}
var RANGE = 50;
var COUNT = 20;
var arrayForTest = generateRandomArray(RANGE, COUNT);
testSortAlgorithm("冒泡排序", bubbleSort, arrayForTest, { logger: true });
