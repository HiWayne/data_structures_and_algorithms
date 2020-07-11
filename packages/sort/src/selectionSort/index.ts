// 测试用例
import testCase from "share/src/testCase";

const { generateRandomArray, testSortAlgorithm } = testCase;

class MinType {
  value: number;
  index: number;
}

/**
 * @description 选择排序
 */
// 把数组分为有序区和无序区，每次找到最小的，然后放入有序区的末尾
function selectionSort(array: number[]): number[] {
  // 等到倒数第二项被替换时，整个数组就已经有序了
  for (let i: number = 0; i < array.length - 1; i++) {
    // 找无序区中最小的
    const min: MinType = {
      value: null,
      index: null,
    };
    for (let j: number = i; j < array.length; j++) {
      if (!min.value && !min.index) {
        min.value = array[j];
        min.index = j;
      } else {
        if (array[j] < min.value) {
          min.value = array[j];
          min.index = j;
        }
      }
    }
    // 已找到最小的，和有序区的下一个元素进行替换
    if (min.index === i) {
      break;
    } else {
      [array[i], array[min.index]] = [array[min.index], array[i]];
    }
  }
  return array;
}

const arrayForTest: number[] = generateRandomArray(50, 20);
testSortAlgorithm("选择排序", selectionSort, arrayForTest, { logger: true });
