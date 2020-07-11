"use strict";
exports.__esModule = true;
// 测试用例
var testCase_1 = require("share/src/testCase");
var generateRandomArray = testCase_1["default"].generateRandomArray, testSortAlgorithm = testCase_1["default"].testSortAlgorithm;
/**
 * @description 快速排序
 */
function quickSort(array, start, end) {
    // 当数组仅剩一项时，不需要分区也有序了，终止
    if (start !== undefined && start === end) {
        return;
    }
    start = start || 0;
    end = end || array.length - 1;
    // 分区点
    var pivot = end;
    var partiedPivot = partition(array, pivot, start, end);
    if (partiedPivot !== start) {
        quickSort(array, start, partiedPivot - 1);
    }
    if (partiedPivot !== end) {
        quickSort(array, partiedPivot + 1, end);
    }
    return array;
}
// 分区函数，比分区点小的在左边，大的在右边。返回分区点最终所在位置，以划分左右子任务范围
function partition(array, pivot, start, end) {
    var _a;
    var pivotValue = array[pivot];
    var disorderIndex = start;
    for (var i = start; i <= end; i++) {
        if (array[i] <= pivotValue) {
            if (i !== disorderIndex) {
                _a = [array[i], array[disorderIndex]], array[disorderIndex] = _a[0], array[i] = _a[1];
            }
            disorderIndex++;
        }
    }
    return disorderIndex - 1;
}
var arrayForTest = generateRandomArray(50, 20);
testSortAlgorithm("快速排序", quickSort, arrayForTest, { logger: true });
