// 测试用例
import testCase from "share/src/testCase";

const { generateRandomArray, testSortAlgorithm } = testCase;

/**
 * @description 快速排序
 */
function quickSort(array: number[], start?: number, end?: number): number[] {
  // 当数组仅剩一项时，不需要分区也有序了，终止
  if (start !== undefined && start === end) {
    return;
  }
  start = start || 0;
  end = end || array.length - 1;
  // 分区点
  const pivot: number = end;
  const partiedPivot: number = partition(array, pivot, start, end);
  if (partiedPivot !== start) {
    quickSort(array, start, partiedPivot - 1);
  }
  if (partiedPivot !== end) {
    quickSort(array, partiedPivot + 1, end);
  }
  return array;
}
// 分区函数，比分区点小的在左边，大的在右边。返回分区点最终所在位置，以划分左右子任务范围
function partition(array: number[], pivot: number, start: number, end: number) {
  const pivotValue: number = array[pivot];
  let disorderIndex: number = start;
  for (let i: number = start; i <= end; i++) {
    if (array[i] <= pivotValue) {
      if (i !== disorderIndex) {
        [array[disorderIndex], array[i]] = [array[i], array[disorderIndex]];
      }
      disorderIndex++;
    }
  }
  return disorderIndex - 1;
}

const arrayForTest = generateRandomArray(50, 20);
testSortAlgorithm("快速排序", quickSort, arrayForTest, { logger: true });
