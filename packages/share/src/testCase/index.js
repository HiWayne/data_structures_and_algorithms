"use strict";
exports.__esModule = true;
var testCase = {};
function createListNode(data, next) {
    return {
        data: data,
        next: next
    };
}
// 回文测试用例
(function () {
    var listNode5 = createListNode("H", null);
    var listNode4 = createListNode("E", listNode5);
    var listNode3 = createListNode("Y", listNode4);
    var listNode2 = createListNode("E", listNode3);
    var listNode1 = createListNode("H", listNode2);
    testCase.linkedListWithPalindromeHead = listNode1;
})();
// 环测试用例
(function () {
    var listNode1 = {
        data: 1,
        next: null
    };
    var listNode4 = createListNode(4, listNode1);
    var listNode3 = createListNode(3, listNode4);
    var listNode2 = createListNode(2, listNode3);
    listNode1.next = listNode2;
    testCase.linkedListWithCircleHead = listNode1;
})();
// 合并两个有序链表测试用例
(function () {
    // 有序链表1
    var listNode5 = createListNode("8", null);
    var listNode4 = createListNode("7", listNode5);
    var listNode3 = createListNode("4", listNode4);
    var listNode2 = createListNode("2", listNode3);
    var listNode1 = createListNode("1", listNode2);
    // 有序链表2
    var listNode12 = createListNode("10", null);
    var listNode11 = createListNode("9", listNode12);
    var listNode10 = createListNode("6", listNode11);
    var listNode9 = createListNode("6", listNode10);
    var listNode8 = createListNode("4", listNode9);
    var listNode7 = createListNode("3", listNode8);
    var listNode6 = createListNode("1", listNode7);
    testCase.linkedListWithMerge1 = listNode1;
    testCase.linkedListWithMerge2 = listNode6;
})();
// 删除链表倒数第几个结点测试用例(可以借用之前的)
testCase.linkedListWithDelete = testCase.linkedListWithPalindromeHead;
/**
 *
 * @param range 每个元素数字范围，如：50代表0-50
 * @param count 数组项数
 * @description 随机生成数组
 */
var generateRandomArray = function (range, count) {
    return Array(count)
        .fill(1)
        .map(function () { return Math.floor(Math.random() * (range + 1)); });
};
testCase.generateRandomArray = generateRandomArray;
/**
 *
 * @param algorithmsName 算法名称
 * @param sortAlgorithm 算法
 * @param array 数组
 * @param config 配置项: logger - 打印排序前后的数组; closeOrder - 数组接近有序
 * @description 测试排序算法消耗时间
 */
var testSortAlgorithm = function (algorithmsName, sortAlgorithm, array, config) {
    if (config === null || config === void 0 ? void 0 : config.logger) {
        console.log("\u539F\u6570\u7EC4: " + array);
    }
    var length = array.length;
    var preTime = new Date().getTime();
    try {
        array = sortAlgorithm(array);
    }
    catch (err) {
        console.warn("\u6392\u5E8F\u5931\u8D25: " + err);
        return;
    }
    var newTime = new Date().getTime();
    var timeSpeed = (newTime - preTime) / 1000;
    if (config === null || config === void 0 ? void 0 : config.logger) {
        console.log("\u6392\u5E8F\u540E\u6570\u7EC4: " + array);
    }
    console.log("" + algorithmsName + length + "\u4F4D" + ((config === null || config === void 0 ? void 0 : config.closeOrder) ? "接近有序数组" : "完全无序数组") + "\u82B1\u8D39\u65F6\u95F4: " + timeSpeed + "s");
    return array;
};
testCase.testSortAlgorithm = testSortAlgorithm;
exports["default"] = testCase;
