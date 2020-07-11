export interface ListNode<T> {
  data: T;
  next: ListNode<T>;
}

export class ConfigType {
  logger?: boolean;
  closeOrder?: boolean;
}

export interface TestCase {
  testSortAlgorithm: (
    algorithmsName: string,
    sortAlgorithm: (array: number[]) => number[],
    array: number[],
    config?: ConfigType
  ) => number[];
  [key: string]: any;
}
