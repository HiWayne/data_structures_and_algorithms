"use strict";
exports.__esModule = true;
var testCase_1 = require("share/src/testCase");
var generateRandomArray = testCase_1["default"].generateRandomArray, testSortAlgorithm = testCase_1["default"].testSortAlgorithm;
/**
 * @description 计数排序
 */
// 在数据范围不大且是自然数的情况下，按数据范围内的所有值分成桶，每个桶里都是相同的数据
function countingSort(array) {
    var result = [];
    var length = array.length;
    var buckets = [];
    // 数组中的两个极值
    var extremum = array.reduce(function (res, value, index) {
        if (index === 0) {
            return { max: value, min: value };
        }
        else {
            if (value > res.max) {
                return { max: value, min: res.min };
            }
            else if (value < res.min) {
                return { max: res.max, min: value };
            }
            else {
                return res;
            }
        }
    }, { max: 0, min: 0 });
    var max = extremum.max, min = extremum.min;
    // 值到下标的映射，方便通过值查到桶
    var value2IndexMap = {};
    for (var i = min; i <= max; i++) {
        value2IndexMap[i] = i - min;
    }
    // 有值匹配次数+1
    for (var i = 0; i < length; i++) {
        var bucketIndex = value2IndexMap[array[i]];
        if (buckets[bucketIndex]) {
            buckets[bucketIndex]++;
        }
        else {
            buckets[bucketIndex] = 1;
        }
    }
    // 每个桶保存的是array中符合当前值以及之前的值的总数，即对应的值在有序数组中的位置范围
    for (var i = 1; i < buckets.length; i++) {
        buckets[i] = buckets[i] ? buckets[i] + buckets[i - 1] : buckets[i - 1];
    }
    // 遍历数组，通过计数找到每个值在有序数组中的位置，然后-1。倒过来遍历是稳定排序
    for (var i = length - 1; i >= 0; i--) {
        var bucketIndex = value2IndexMap[array[i]];
        var index = buckets[bucketIndex] - 1;
        result[index] = array[i];
        buckets[bucketIndex]--;
    }
    return result;
}
var arrayForTest = generateRandomArray(50, 20);
testSortAlgorithm("计数排序", countingSort, arrayForTest, { logger: true });
