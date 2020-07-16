import testCase from "share/src/testCase";

const { generateRandomArray, testSortAlgorithm } = testCase;

interface Extremum {
  max: number;
  min: number;
}

/**
 * @description 桶排序
 */
function bucketSort(array: number[], bucketCount?: number): number[] {
  const length: number = array.length;
  // 有序数组
  const sortedArray: number[] = [];
  // 桶
  const buckets: number[][] = [];
  // 数组中的两个极值
  const extremum: Extremum = array.reduce(
    (res, value, index) => {
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
    { max: null, min: null }
  );
  const { max, min } = extremum;
  // 如果没有手动设置桶数，自动取值
  if (!bucketCount) {
    bucketCount = Math.ceil(Math.min(length, max) / 10);
  }
  // 每个桶的范围
  const space: number = (max - min + 1) / bucketCount;
  for (let i = 0; i < array.length; i++) {
    const value: number = array[i];
    // 确定该值所在桶的位置
    const index: number = Math.max(Math.ceil(value / space) - 1, 0);
    // 放进桶后排好序（插排，快排不是稳定排序这里没用），要考虑桶还没有建立的情况
    if (buckets[index]) {
      const length: number = buckets[index].length;
      for (let i: number = length - 1; i >= 0; i--) {
        if (value < buckets[index][i]) {
          buckets[index][i + 1] = buckets[index][i];
          if (i === 0) {
            buckets[index][i] = value;
          }
        } else {
          buckets[index][i + 1] = value;
          // 后面的不能再比对了
          break;
        }
      }
    } else {
      buckets[index] = [];
      buckets[index].push(value);
    }
  }
  // 从桶中依次取出所有值，已经是有序的
  for (let i: number = 0; i < buckets.length; i++) {
    // 有些桶可能没值
    if (buckets[i]) {
      for (let j: number = 0; j < buckets[i].length; j++) {
        sortedArray.push(buckets[i][j]);
      }
    }
  }
  return sortedArray;
}

const arrayForTest = generateRandomArray(50, 20);
testSortAlgorithm("桶排序", (array) => bucketSort(array, 5), arrayForTest, {
  logger: true,
});
