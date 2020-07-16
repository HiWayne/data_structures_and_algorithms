import { ListNode, TestCase, ConfigType } from "../interfaces";

const testCase: TestCase = {} as TestCase;

function createListNode<T>(data: T, next?: ListNode<any>): ListNode<T> {
  return {
    data,
    next,
  };
}

// 回文测试用例
(function () {
  const listNode5 = createListNode("H", null);

  const listNode4 = createListNode("E", listNode5);

  const listNode3 = createListNode("Y", listNode4);

  const listNode2 = createListNode("E", listNode3);

  const listNode1 = createListNode("H", listNode2);

  testCase.linkedListWithPalindromeHead = listNode1;
})();

// 环测试用例
(function () {
  const listNode1: ListNode<number> = {
    data: 1,
    next: null,
  };
  const listNode4 = createListNode(4, listNode1);

  const listNode3 = createListNode(3, listNode4);

  const listNode2 = createListNode(2, listNode3);

  listNode1.next = listNode2;

  testCase.linkedListWithCircleHead = listNode1;
})();

// 合并两个有序链表测试用例
(function () {
  // 有序链表1
  const listNode5 = createListNode("8", null);

  const listNode4 = createListNode("7", listNode5);

  const listNode3 = createListNode("4", listNode4);

  const listNode2 = createListNode("2", listNode3);

  const listNode1 = createListNode("1", listNode2);

  // 有序链表2
  const listNode12 = createListNode("10", null);

  const listNode11 = createListNode("9", listNode12);

  const listNode10 = createListNode("6", listNode11);

  const listNode9 = createListNode("6", listNode10);

  const listNode8 = createListNode("4", listNode9);

  const listNode7 = createListNode("3", listNode8);

  const listNode6 = createListNode("1", listNode7);

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
const generateRandomArray: (r: number, c: number) => number[] = (
  range: number,
  count: number
): number[] =>
  Array(count)
    .fill(1)
    .map(() => Math.floor(Math.random() * (range + 1)));
testCase.generateRandomArray = generateRandomArray;

/**
 *
 * @param algorithmsName 算法名称
 * @param sortAlgorithm 算法
 * @param array 数组
 * @param config 配置项: logger - 打印排序前后的数组; closeOrder - 数组接近有序
 * @description 测试排序算法消耗时间
 */
const testSortAlgorithm = (
  algorithmsName: string,
  sortAlgorithm: (array: number[], options?: any) => number[],
  array: number[],
  config?: ConfigType
): number[] => {
  if (config?.logger) {
    console.log(`原数组: ${array}`);
  }
  const length = array.length;
  const preTime = new Date().getTime();
  try {
    array = sortAlgorithm(array);
  } catch (err) {
    console.warn(`排序失败: ${err}`);
    return;
  }
  const newTime = new Date().getTime();
  const timeSpeed = (newTime - preTime) / 1000;
  if (config?.logger) {
    console.log(`排序后数组: ${array}`);
  }
  console.log(
    `${algorithmsName}${length}位${
      config?.closeOrder ? "接近有序数组" : "完全无序数组"
    }花费时间: ${timeSpeed}s`
  );
  return array;
};
testCase.testSortAlgorithm = testSortAlgorithm;

export default testCase;
