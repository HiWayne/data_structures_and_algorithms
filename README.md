# 更新中…… 数据结构与算法（参考课程：极客时间-《数据结构与算法之美》）

语言：**TypeScript**<br />
项目管理：lerna<br />
每个算法都可通过对应目录下的index.js运行，会有信息在term打印<br />
测试用例`/packages/share/src/testCase`

## 链表(linked list)

目录：`/packages/linked_list/src`

判断链表是否有环`/packages/linked_list/src/circle`

删除倒数第 n 个结点`/packages/linked_list/src/delete`

合并两个有序链表`/packages/linked_list/src/merge`

判断回文（链表取中点、链表反转）`/packages/linked_list/src/reversal`

## 排序算法(sort)

目录：`/packages/sort/src`

排序按时间复杂度分为

### O(n²)

> **冒泡排序**
>`/packages/sort/src/bubbleSort`
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
>
> **插入排序**
>`/packages/sort/src/insertSort`
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
>
> **选择排序**
>`/packages/sort/src/selectionSort`
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
>`/packages/sort/src/mergeSort`
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
>
> **快速排序**
>`/packages/sort/src/quickSort`
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

> **桶排序**
>`/packages/sort/src/bucketSort`
> 1. **时间**
>
> - 最好：O(n)
> - 最坏：O(nlogn)
> - 平均：O(n)
>
> 2. **空间**
>
> - O(n + m)  // n-数据数量 m-桶的数量
>
> 3. **稳定性**
>
> - 根据桶内的排序而定，本例是稳定排序
>
> **计数排序**
>`/packages/sort/src/countingSort`
> 1. **时间**
>
> - 最好：O(n)
> - 最坏：O(n)
> - 平均：O(n)
>
> 2. **空间**
>
> - O(n + m)  // n-数据数量 m-桶的数量
>
> 3. **稳定性**
>
> - 稳定排序
>
> **基数排序**
>`/packages/sort/src/radixSort`
> 1. **时间**
>
> - 最好：O(n)
> - 最坏：O(n)
> - 平均：O(n)
>
> 2. **空间**
>
> - O(n + m)  // n-数据数量 m-桶的数量
>
> 3. **稳定性**
>
> - 稳定排序

## 跳表(skip list)

目录：`/packages/skipList/src`

 * 以下注释摘抄自——https://github.com/wangzheng0822/algo/blob/master/typescript/17_skiplist/SkipList.ts
 *
 * 跳跃表是Redis使用的底层算法
 * 在增删改查都有近似O（log n）的时间复杂度
 * 哈希表虽然在不产生冲突的情况下是O（1）的时间复杂度
 * 但是随着冲突的增多，所需要的扩容操作还是比较耗时的，综合起来不一定快于跳表
 * 这两种结构可以互相补充
 * 下面摘抄一段来自知乎的话 (https://juejin.im/post/57fa935b0e3dd90057c50fbc）
 * 比较跳表和哈希表，平衡树之间的区别
 * skiplist和各种平衡树（如AVL、红黑树等）的元素是有序排列的，而哈希表不是有序的。因此，在哈希表上只能做单个key的查找，不适宜做范围查找。所谓范围查找，指的是查找那些大小在指定的两个值之间的所有节点。
 * 在做范围查找的时候，平衡树比skiplist操作要复杂。在平衡树上，我们找到指定范围的小值之后，还需要以中序遍历的顺序继续寻找其它不超过大值的节点。
 * 如果不对平衡树进行一定的改造，这里的中序遍历并不容易实现。而在skiplist上进行范围查找就非常简单，只需要在找到小值之后，对第1层链表进行若干步的遍历就可以实现。
 * 平衡树的插入和删除操作可能引发子树的调整，逻辑复杂，而skiplist的插入和删除只需要修改相邻节点的指针，操作简单又快速。
 * 从内存占用上来说，skiplist比平衡树更灵活一些。一般来说，平衡树每个节点包含2个指针（分别指向左右子树），而skiplist每个节点包含的指针数目平均为1/(1-p)，具体取决于参数p的大小。
 * 如果像Redis里的实现一样，取p=1/4，那么平均每个节点包含1.33个指针，比平衡树更有优势。
 * 查找单个key，skiplist和平衡树的时间复杂度都为O(log n)，大体相当；而哈希表在保持较低的哈希值冲突概率的前提下，查找时间复杂度接近O(1)，性能更高一些。所以我们平常使用的各种Map或dictionary结构，大都是基于哈希表实现的。
 * 从算法实现难度上来比较，skiplist比平衡树要简单。

## 哈希表(hash table)

目录：`/packages/hashTable/src`

 * 初始大小8
 * 阀值0.75，大于等于0.75扩容
 * 扩容时，数据迁移不一次性完成，分摊到每次put时迁移一个旧数据
 * 避免哈希冲突采用链表法（拉链法）