"use strict";
exports.__esModule = true;
// 测试用例
var testCase_1 = require("share/src/testCase");
var linkedListWithMerge1 = testCase_1["default"].linkedListWithMerge1, linkedListWithMerge2 = testCase_1["default"].linkedListWithMerge2;
/**
 * @param listNode1 链表1头结点
 * @param listNode2 链表2头结点
 * @description 合并两个有序链表(默认从小到大)
 */
function merge(listNode1, listNode2) {
    var point1 = listNode1, point2 = listNode2, 
    // 新建一个链表存放合并的结果
    newPoint = null, 
    // 新链表的头结点
    newListHead = null;
    // 每次比较出两个链表最左结点中较小的那一个，把它放进新链表，并把指针向右移一位为下次比较做准备，另一个链表不变
    // 当其中一个链表比较完了，直接把另一个链表剩余部分加进新链表即可
    while (point1 !== null && point2 !== null) {
        // 临时存放较小值
        var target = void 0;
        if (point1.data <= point2.data) {
            target = point1;
            point1 = point1.next;
        }
        else if (point2.data < point1.data) {
            target = point2;
            point2 = point2.next;
        }
        if (newPoint === null) {
            newPoint = target;
            newListHead = target;
        }
        else {
            newPoint.next = target;
            newPoint = newPoint.next;
        }
    }
    // 当一个链表比较完时，另一个链表必然没有结束，直接把剩余部分加进新链表中
    point1 === null ? (newPoint.next = point2) : (newPoint.next = point1);
    return newListHead;
}
console.log(merge(linkedListWithMerge1, linkedListWithMerge1));
