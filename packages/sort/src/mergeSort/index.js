"use strict";
exports.__esModule = true;
var testCase_1 = require("share/src/testCase");
var generateRandomArray = testCase_1["default"].generateRandomArray, testSortAlgorithm = testCase_1["default"].testSortAlgorithm;
/**
 * @description 归并排序
 */
function mergeSort(array) {
    var length = array.length;
    if (length === 0) {
        console.log("数组不能为空");
        return;
    }
    if (length === 1) {
        return array;
    }
    var centerPoint = (length & 1) === 0 ? length / 2 - 1 : (length - 1) / 2 - 1;
    var leftSort = mergeSort(array.slice(0, centerPoint + 1));
    var rightSort = mergeSort(array.slice(centerPoint + 1, length));
    return merge(leftSort, rightSort);
}
function merge(arr1, arr2) {
    var arr = [];
    var index1 = 0, index2 = 0;
    while (arr1[index1] && arr2[index2]) {
        if (arr1[index1] <= arr2[index2]) {
            arr.push(arr1[index1]);
            index1++;
        }
        else {
            arr.push(arr2[index2]);
            index2++;
        }
    }
    arr1[index1]
        ? arr1
            .slice(index1, arr1.length)
            .forEach(function (value) { return arr.push(value); })
        : arr2
            .slice(index2, arr2.length)
            .forEach(function (value) { return arr.push(value); });
    return arr;
}
var arrayForTest = generateRandomArray(50, 20);
testSortAlgorithm("归并排序", mergeSort, arrayForTest, { logger: true });
