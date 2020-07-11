import { ListNode } from "share/src/interfaces";
// 测试用例
import testCase from "share/src/testCase";

const { linkedListWithDelete } = testCase;

/**
 * @param lisNode 链表头结点
 * @param index 倒数位数
 * @description 删除链表倒数第几个结点
 */
// 用两个指针，后一个比前一个多(index - 1)个距离，当后一个到终点时，前一个的就是倒数第index个结点
function deleteByIndex(
  listNode: ListNode<string>,
  index: number
): ListNode<string> {
  if (index < 1) {
    console.warn(`index: ${index}不能小于1`);
    return;
  }
  if (!listNode) {
    console.warn("链表不能为空");
    return;
  }
  // 删除结点肯定要知道它的上一个结点，所以prePoint是倒数第index + 1个结点
  let prePoint: ListNode<string> = listNode,
    nextPoint: ListNode<string> = Array(index)
      .fill(1)
      .reduce((nextListNode: ListNode<string>) => {
        const next = listNode.next;
        if (next) {
          return next;
        } else {
          console.warn(`不存在倒数第${index}个结点`);
          return {};
        }
      }, {});
  while (nextPoint && nextPoint.next) {
    prePoint = prePoint.next;
    nextPoint = nextPoint.next;
  }
  // 删除它的下一个结点，即倒数第index个结点
  prePoint.next = prePoint.next.next;
  return listNode;
}

console.log(deleteByIndex(linkedListWithDelete, 2));
