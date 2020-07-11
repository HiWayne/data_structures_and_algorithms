"use strict";
exports.__esModule = true;
var testCase_1 = require("share/src/testCase");
var generateRandomArray = testCase_1["default"].generateRandomArray, testSortAlgorithm = testCase_1["default"].testSortAlgorithm;
/**
 * @description 插入排序
 */
function insertionSort(array) {
    for (var i = 0; i < array.length; i++) {
        var insertionTarget = array[i];
        for (var j = i - 1; j >= 0; j--) {
            if (insertionTarget < array[j]) {
                array[j + 1] = array[j];
                if (j === 0) {
                    array[j] = insertionTarget;
                }
            }
            else {
                if (j + 1 !== i) {
                    array[j + 1] = insertionTarget;
                }
                break;
            }
        }
    }
    return array;
}
var arrayForTest = generateRandomArray(50, 20);
testSortAlgorithm("插入排序", insertionSort, arrayForTest, {
    logger: true
});
