"use strict";
exports.__esModule = true;
// 测试用例
var testCase_1 = require("share/src/testCase");
var generateRandomArray = testCase_1["default"].generateRandomArray, testSortAlgorithm = testCase_1["default"].testSortAlgorithm;
var MinType = /** @class */ (function () {
    function MinType() {
    }
    return MinType;
}());
/**
 * @description 选择排序
 */
// 把数组分为有序区和无序区，每次找到最小的，然后放入有序区的末尾
function selectionSort(array) {
    var _a;
    // 等到倒数第二项被替换时，整个数组就已经有序了
    for (var i = 0; i < array.length - 1; i++) {
        // 找无序区中最小的
        var min = {
            value: null,
            index: null
        };
        for (var j = i; j < array.length; j++) {
            if (!min.value && !min.index) {
                min.value = array[j];
                min.index = j;
            }
            else {
                if (array[j] < min.value) {
                    min.value = array[j];
                    min.index = j;
                }
            }
        }
        // 已找到最小的，和有序区的下一个元素进行替换
        if (min.index === i) {
            break;
        }
        else {
            _a = [array[min.index], array[i]], array[i] = _a[0], array[min.index] = _a[1];
        }
    }
    return array;
}
var arrayForTest = generateRandomArray(50, 20);
testSortAlgorithm("选择排序", selectionSort, arrayForTest, { logger: true });
