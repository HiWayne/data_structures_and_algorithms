import { ListNode } from "share/src/interfaces";
// 测试用例
import testCase from "share/src/testCase";

const { linkedListWithCircleHead } = testCase;

/**
 * @param head 链表头结点
 * @description 判断一个链表是否有环
 */
function isCircle(head: ListNode<any>): boolean {
  // 快慢指针如果能相遇则说明有环
  if (head === null || head.next === null) {
    return false;
  }
  const fast = head.next.next;
  const slow = head.next;
  while (fast) {
    if (fast.data === slow.data) {
      return true;
    }
  }
  return false;
}

console.log(isCircle(linkedListWithCircleHead));
