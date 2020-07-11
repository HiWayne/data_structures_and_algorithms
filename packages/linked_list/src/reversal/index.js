"use strict";
exports.__esModule = true;
// 测试用例
var testCase_1 = require("share/src/testCase");
/**
 *
 * @param head 链表头结点
 * @description 判断以链表形式存放的一段字符串是否是回文
 * @returns boolean
 */
function determineIsPalindrome(head) {
    // 利用快慢指针反转链表前半部分
    if (head === null || head.next === null) {
        return true;
    }
    var slow = head, fast = head, prev = null;
    // 快指针最终只有两种可能：1. 刚好到达最后一个结点；2. 到达最后一个结点的下一个结点(null)
    while (fast !== null && fast.next !== null) {
        // 快指针后移两位
        fast = fast.next.next;
        // 先保存慢指针的下个结点
        var next = slow.next;
        // 当前慢指针的next指向上一个结点
        slow.next = prev;
        // prev后移一位，为下个结点反转做准备
        prev = slow;
        // 慢指针向后移动一位
        slow = next;
    }
    // 快指针正好走完说明是奇数链表，慢指针在中点，需要后移一位才是后半段的头结点
    if (fast !== null) {
        slow = slow.next;
    }
    // 循环比较前后半段
    while (slow !== null) {
        if (prev.data !== slow.data) {
            return false;
        }
        slow = slow.next;
        prev = prev.next;
    }
    // 循环结束没有不等的情况
    return true;
}
console.log(determineIsPalindrome(testCase_1.linkedListWithPalindromeHead));
