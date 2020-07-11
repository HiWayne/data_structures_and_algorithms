// 测试用例
import testCase from "../../../share/src/testCase";

const { generateRandomArray, testSortAlgorithm } = testCase;

/**
 * @description 冒泡排序
 */
function bubbleSort(array: number[]): number[] {
  for (let i: number = array.length - 1; i > 0; i--) {
    for (let j: number = 0; j < i; j++) {
      if (array[j] > array[j + 1]) {
        // 数组两个元素调换位置，利用了es6解构赋值
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array;
}

const RANGE = 50;
const COUNT = 20;
const arrayForTest: number[] = generateRandomArray(RANGE, COUNT);
testSortAlgorithm("冒泡排序", bubbleSort, arrayForTest, { logger: true });
