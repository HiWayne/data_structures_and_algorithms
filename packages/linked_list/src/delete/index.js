"use strict";
exports.__esModule = true;
// 测试用例
var testCase_1 = require("share/src/testCase");
var linkedListWithDelete = testCase_1["default"].linkedListWithDelete;
/**
 * @param lisNode 链表头结点
 * @param index 倒数位数
 * @description 删除链表倒数第几个结点
 */
// 用两个指针，后一个比前一个多(index - 1)个距离，当后一个到终点时，前一个的就是倒数第index个结点
function deleteByIndex(listNode, index) {
    if (index < 1) {
        console.warn("index: " + index + "\u4E0D\u80FD\u5C0F\u4E8E1");
        return;
    }
    if (!listNode) {
        console.warn("链表不能为空");
        return;
    }
    // 删除结点肯定要知道它的上一个结点，所以prePoint是倒数第index + 1个结点
    var prePoint = listNode, nextPoint = Array(index)
        .fill(1)
        .reduce(function (nextListNode) {
        var next = nextListNode.next;
        if (next) {
            return next;
        }
        else {
            console.warn("\u4E0D\u5B58\u5728\u5012\u6570\u7B2C" + index + "\u4E2A\u7ED3\u70B9");
            return {};
        }
    }, listNode);
    while (nextPoint && nextPoint.next) {
        prePoint = prePoint.next;
        nextPoint = nextPoint.next;
    }
    // 删除它的下一个结点，即倒数第index个结点
    prePoint.next = prePoint.next.next;
    return listNode;
}
console.log(deleteByIndex(linkedListWithDelete, 2));
