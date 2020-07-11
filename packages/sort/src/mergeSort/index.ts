import testCase from "share/src/testCase";

const { generateRandomArray, testSortAlgorithm } = testCase;

/**
 * @description 归并排序
 */
// 把问题分解成，将一个数组分成两部分，让它们分别有序，再合并。将这个策略递归到每个小数组
// 终止条件是小数组长度为1，本事就有序了，直接返回
function mergeSort(array: number[]): number[] {
  const length: number = array.length;
  if (length === 0) {
    console.log("数组不能为空");
    return;
  }
  if (length === 1) {
    return array;
  }
  const centerPoint: number =
    (length & 1) === 0 ? length / 2 - 1 : (length - 1) / 2 - 1;
  const leftSort: number[] = mergeSort(array.slice(0, centerPoint + 1));
  const rightSort: number[] = mergeSort(array.slice(centerPoint + 1, length));
  return merge(leftSort, rightSort);
}

function merge(arr1: number[], arr2: number[]): number[] {
  const arr: number[] = [];
  let index1: number = 0,
    index2: number = 0;
  while (arr1[index1] && arr2[index2]) {
    if (arr1[index1] <= arr2[index2]) {
      arr.push(arr1[index1]);
      index1++;
    } else {
      arr.push(arr2[index2]);
      index2++;
    }
  }
  arr1[index1]
    ? arr1
        .slice(index1, arr1.length)
        .forEach((value: number): number => arr.push(value))
    : arr2
        .slice(index2, arr2.length)
        .forEach((value: number): number => arr.push(value));
  return arr;
}

const arrayForTest = generateRandomArray(50, 20);
testSortAlgorithm("归并排序", mergeSort, arrayForTest, { logger: true });
