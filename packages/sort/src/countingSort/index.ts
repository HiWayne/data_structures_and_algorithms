import testCase from "share/src/testCase";

const { generateRandomArray, testSortAlgorithm } = testCase;

interface Extremum {
  max: number;
  min: number;
}

interface Value2IndexMap {
  [value: number]: number;
}

/**
 * @description 计数排序
 */
// 在数据范围不大且是自然数的情况下，按数据范围内的所有值分成桶，每个桶里都是相同的数据
function countingSort(array: number[]): number[] {
  const result: number[] = [];
  const length: number = array.length;
  const buckets: number[] = [];
  // 数组中的两个极值
  const extremum: Extremum = array.reduce(
    (res: Extremum, value: number, index: number) => {
      if (index === 0) {
        return { max: value, min: value };
      } else {
        if (value > res.max) {
          return { max: value, min: res.min };
        } else if (value < res.min) {
          return { max: res.max, min: value };
        } else {
          return res;
        }
      }
    },
    { max: 0, min: 0 }
  );
  const { max, min } = extremum;
  // 值到下标的映射，方便通过值查到桶
  const value2IndexMap: Value2IndexMap = {};
  for (let i: number = min; i <= max; i++) {
    value2IndexMap[i] = i - min;
  }
  // 有值匹配次数+1
  for (let i: number = 0; i < length; i++) {
    const bucketIndex: number = value2IndexMap[array[i]];
    if (buckets[bucketIndex]) {
      buckets[bucketIndex]++;
    } else {
      buckets[bucketIndex] = 1;
    }
  }
  // 每个桶保存的是array中符合当前值以及之前的值的总数，即对应的值在有序数组中的位置范围
  for (let i: number = 1; i < buckets.length; i++) {
    buckets[i] = buckets[i] ? buckets[i] + buckets[i - 1] : buckets[i - 1];
  }
  // 遍历数组，通过计数找到每个值在有序数组中的位置，然后-1。倒过来遍历是稳定排序
  for (let i: number = length - 1; i >= 0; i--) {
    const bucketIndex: number = value2IndexMap[array[i]];
    const index: number = buckets[bucketIndex] - 1;
    result[index] = array[i];
    buckets[bucketIndex]--;
  }
  return result;
}

const arrayForTest = generateRandomArray(50, 20);
testSortAlgorithm("计数排序", countingSort, arrayForTest, { logger: true });
