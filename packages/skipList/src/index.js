/**
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
 */
/**
 * @method insert 插入或更改
 * @method remove 删
 * @method get    查
 */
var SkipList = /** @class */ (function () {
    function SkipList() {
        // 索引层数
        this.levelCount = 0;
        // 节点数量
        this.size = 0;
        this.head = new SkipListNode(SkipListNode.negInf, null);
        this.tail = new SkipListNode(SkipListNode.posInf, null);
        this.head.right = this.tail;
        this.tail.left = this.head;
    }
    SkipList.prototype.insert = function (key, value) {
        var node = this.findNode(key);
        var i = 0;
        // 已经存在，直接改值
        if (node.key === key) {
            node.value = value;
        }
        else {
            // 在最底层插入新节点
            var targetNode = new SkipListNode(key, value);
            targetNode.left = node;
            targetNode.right = node.right;
            node.right.left = targetNode;
            node.right = targetNode;
            // 限制最大层数不超过二分查找需要的层数，多出的层数既浪费了循环，也增加了查找时间复杂度
            while (Math.random() < 0.5 &&
                i < Math.ceil(this.getBaseLog(2, this.size))) {
                i++;
                // 创建一个空跳表节点，用于索引不需要存具体数据
                var targetUpNode = new SkipListNode(key, null);
                targetNode.up = targetUpNode;
                targetUpNode.down = targetNode;
                // 当新增的层数大于当前最大层数时
                if (i > this.levelCount) {
                    this.createEmptyLevel();
                }
                var leftNode = targetNode.left;
                while (!leftNode.up && leftNode.left) {
                    leftNode = leftNode.left;
                }
                var leftUpNode = leftNode.up;
                targetUpNode.left = leftUpNode;
                targetUpNode.right = leftUpNode.right;
                leftUpNode.right.left = targetUpNode;
                leftUpNode.right = targetUpNode;
                targetNode = targetUpNode;
            }
            this.size++;
        }
    };
    SkipList.prototype.remove = function (key) {
        var node = this.findNode(key);
        if (node.key === key) {
            while (node) {
                node.left.right = node.right;
                node.right.left = node.left;
                node = node.up;
            }
            this.size--;
            return true;
        }
        else {
            return false;
        }
    };
    SkipList.prototype.get = function (key) {
        var node = this.findNode(key);
        if (node.key === key) {
            return node.value;
        }
        else {
            return null;
        }
    };
    // 通过key找节点，结果为 <= 给定key的节点
    SkipList.prototype.findNode = function (key) {
        var node = this.head;
        while (true) {
            while (node.right && node.right.key <= key) {
                node = node.right;
            }
            if (node.down) {
                node = node.down;
            }
            else {
                break;
            }
        }
        return node;
    };
    // 创建一层空索引，当某值得索引超过当前最大层数时，需要头尾节点向上提升一层
    SkipList.prototype.createEmptyLevel = function () {
        var headUpNode = new SkipListNode(SkipListNode.negInf, null);
        var tailUpNode = new SkipListNode(SkipListNode.posInf, null);
        headUpNode.right = tailUpNode;
        tailUpNode.left = headUpNode;
        this.head.up = headUpNode;
        this.tail.up = tailUpNode;
        headUpNode.down = this.head;
        tailUpNode.down = this.tail;
        this.head = headUpNode;
        this.tail = tailUpNode;
        this.levelCount++;
    };
    // 求logx y
    SkipList.prototype.getBaseLog = function (x, y) {
        return Math.log(y) / Math.log(x);
    };
    return SkipList;
}());
var SkipListNode = /** @class */ (function () {
    function SkipListNode(key, value) {
        this.key = key;
        this.value = value;
    }
    SkipListNode.negInf = Number.MIN_VALUE;
    SkipListNode.posInf = Number.MAX_VALUE;
    return SkipListNode;
}());
// test
var skipList = new SkipList();
skipList.insert(0, "跳表节点1");
skipList.insert(1, { name: "跳表节点2" });
console.log(skipList.get(0));
console.log(skipList.get(1));
skipList.remove(1);
console.log(skipList.get(1));
skipList.insert(0, "新跳表节点1");
console.log(skipList.get(0));
