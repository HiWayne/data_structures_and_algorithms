// 测试用例
import testCase from "share/src/testCase";

const { generateRandomArray, testSortAlgorithm } = testCase;

/**
 * @description 插入排序
 */
function insertionSort(array: number[]): number[] {
  for (let i: number = 0; i < array.length; i++) {
    const insertionTarget: number = array[i];
    for (let j: number = i - 1; j >= 0; j--) {
      if (insertionTarget < array[j]) {
        array[j + 1] = array[j];
        if (j === 0) {
          array[j] = insertionTarget;
        }
      } else {
        if (j + 1 !== i) {
          array[j + 1] = insertionTarget;
        }
        break;
      }
    }
  }
  return array;
}

const arrayForTest: number[] = generateRandomArray(50, 20);

testSortAlgorithm("插入排序", insertionSort, arrayForTest, {
  logger: true,
});
