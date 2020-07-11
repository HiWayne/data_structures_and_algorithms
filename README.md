# 更新中…… 数据结构与算法（参考课程：极客时间-《数据结构与算法之美》）

语言：**TypeScript**<br />
项目管理：lerna<br />
每个算法都可通过对应目录下的index.js运行，会有信息在term打印<br />
测试用例`/packages/share/src/testCase`

## 链表

目录：`/packages/linked_list/src`

判断链表是否有环`/packages/linked_list/src/circle`

删除倒数第 n 个结点`/packages/linked_list/src/delete`

合并两个有序链表`/packages/linked_list/src/merge`

判断回文（链表取中点、链表反转）`/packages/linked_list/src/reversal`

## 排序算法

目录：`/packages/sort/src`

排序按时间复杂度分为

### O(n²)

> **冒泡排序**
>
> 1. **时间**
>
> - 最好：O(n)
> - 最坏：O(n²)
> - 平均：O(n²)
>
> 2. **空间**
>
> - 原地排序
>
> 3. **稳定性**
>
> - 稳定排序
>   **插入排序**
>
> 1. **时间**
>
> - 最好：O(n)
> - 最坏：O(n²)
> - 平均：O(n²)
>
> 2. **空间**
>
> - 原地排序
>
> 3. **稳定性**
>
> - 稳定排序
>   **选择排序**
>
> 1. **时间**
>
> - 最好：O(n)
> - 最坏：O(n²)
> - 平均：O(n²)
>
> 2. **空间**
>
> - 原地排序
>
> 3. **稳定性**
>
> - 不稳定排序

### O(nlogn)

> **归并排序**
>
> 1. **时间**
>
> - 最好：O(nlogn)
> - 最坏：O(nlogn)
> - 平均：O(nlogn)
>
> 2. **空间**
>
> - O(n)
>
> 3. **稳定性**
>
> - 稳定排序
>   **快速排序**
>
> 1. **时间**
>
> - 最好：O(nlogn)
> - 最坏：O(n²)
> - 平均：O(nlogn)
>
> 2. **空间**
>
> - 原地排序
>
> 3. **稳定性**
>
> - 不稳定排序

### O(n)

桶排序、计数排序、基数排序
