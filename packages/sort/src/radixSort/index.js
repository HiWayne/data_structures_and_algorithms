"use strict";
exports.__esModule = true;
var testCase_1 = require("share/src/testCase");
var testSortAlgorithm = testCase_1["default"].testSortAlgorithm;
/**
 * @description 基数排序
 */
// 合适位数很多的情况，且每位有阶级性
// 先用稳定排序按最后一位排序，然后再依次往前。1000, 1001, 1011, 1111
function radixSort(array) {
    array = array.map(function (number) { return number + ""; });
    var itemLength = array[0].length;
    var arrayLength = array.length;
    // 从后往前，按位对整个数组排序
    for (var i = itemLength - 1; i >= 0; i--) {
        // 每位只可能0-9，所以用计数排序
        array = countingSort(array, i, arrayLength);
    }
    array = array.map(function (string) { return Number(string); });
    return array;
}
/**
 *
 * @param array 要排序的数组
 * @param index 比较数组元素中的第几位
 * @param length 数组长度
 * @description 计数排序
 */
function countingSort(array, index, length) {
    var result = [];
    var buckets = [];
    for (var i = 0; i < length; i++) {
        // 0-9的值正好也对应桶的下标
        var bucketIndex = Number(array[i][index]);
        if (buckets[bucketIndex]) {
            buckets[bucketIndex]++;
        }
        else {
            buckets[bucketIndex] = 1;
        }
    }
    // 累计
    for (var i = 1; i < buckets.length; i++) {
        buckets[i] = buckets[i]
            ? buckets[i] + (buckets[i - 1] || 0)
            : buckets[i - 1] || 0;
    }
    // 要求是稳定排序，所以要倒过来遍历
    for (var i = length - 1; i >= 0; i--) {
        // 当前值以及比它小的值共有多少个
        var count = buckets[Number(array[i][index])];
        result[count - 1] = array[i];
        buckets[Number(array[i][index])]--;
    }
    return result;
}
// 基数排序对数据要求比较高，就手动写了测试用例
var arrayForTest = [
    253647,
    836274,
    262474,
    123734,
    384758,
    874234,
    938453,
    482742,
    583829,
    683723,
    738292,
    539342,
    382900,
];
testSortAlgorithm("基数排序", radixSort, arrayForTest, { logger: true });
