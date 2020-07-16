"use strict";
exports.__esModule = true;
var testCase_1 = require("share/src/testCase");
var generateRandomArray = testCase_1["default"].generateRandomArray, testSortAlgorithm = testCase_1["default"].testSortAlgorithm;
/**
 * @description 桶排序
 */
function bucketSort(array, bucketCount) {
    var length = array.length;
    // 有序数组
    var sortedArray = [];
    // 桶
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
    }, { max: null, min: null });
    var max = extremum.max, min = extremum.min;
    // 如果没有手动设置桶数，自动取值
    if (!bucketCount) {
        bucketCount = Math.ceil(Math.min(length, max) / 10);
    }
    // 每个桶的范围
    var space = (max - min + 1) / bucketCount;
    for (var i = 0; i < array.length; i++) {
        var value = array[i];
        // 确定该值所在桶的位置
        var index = Math.max(Math.ceil(value / space) - 1, 0);
        // 放进桶后排好序（插排，快排不是稳定排序这里没用），要考虑桶还没有建立的情况
        if (buckets[index]) {
            var length_1 = buckets[index].length;
            for (var i_1 = length_1 - 1; i_1 >= 0; i_1--) {
                if (value < buckets[index][i_1]) {
                    buckets[index][i_1 + 1] = buckets[index][i_1];
                    if (i_1 === 0) {
                        buckets[index][i_1] = value;
                    }
                }
                else {
                    buckets[index][i_1 + 1] = value;
                    // 后面的不能再比对了
                    break;
                }
            }
        }
        else {
            buckets[index] = [];
            buckets[index].push(value);
        }
    }
    // 从桶中依次取出所有值，已经是有序的
    for (var i = 0; i < buckets.length; i++) {
        // 有些桶可能没值
        if (buckets[i]) {
            for (var j = 0; j < buckets[i].length; j++) {
                sortedArray.push(buckets[i][j]);
            }
        }
    }
    return sortedArray;
}
var arrayForTest = generateRandomArray(50, 20);
testSortAlgorithm("桶排序", function (array) { return bucketSort(array, 5); }, arrayForTest, {
    logger: true
});
