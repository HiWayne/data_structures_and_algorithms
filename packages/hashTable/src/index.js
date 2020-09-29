/**
 * @description 散列表（哈希表）实现，链表法
 * @method put 增/改
 * @method remove 删
 * @method get 查
 */
var HashTable = /** @class */ (function () {
    function HashTable() {
        this.temporaryTable = []; // 扩容时的临时数组，存放旧数组的数据
        this.size = 8; // 散列表最大个数
        this.usedSize = 0; // 已使用的个数
        this.table = new Array(HashTable.DEFAULT_INITAL_CAPACITY)
            .fill(true)
            .map(function () { return new Entry(null, null); });
    }
    HashTable.prototype.hash = function (key) {
        var h;
        h = key.split("").reduce(function (acc, s) { return acc + Number(s.charCodeAt(0)); }, 0);
        return key == null ? 0 : (h ^ (h >>> 16)) % this.table.length;
    };
    // 扩容数组
    HashTable.prototype.resize = function () {
        // 旧数组还有数据没有迁移完
        var temporaryTableLength = this.temporaryTable.length;
        if (temporaryTableLength > 0) {
            while (temporaryTableLength > 0) {
                this.moveOldDataToNewPlace();
                temporaryTableLength = this.temporaryTable.length;
            }
        }
        this.size = this.size * 2;
        this.temporaryTable = this.table;
        this.table = new Array(this.size)
            .fill(true)
            .map(function () { return new Entry(null, null); });
        this.usedSize = 0;
    };
    // 从旧数组里取一条数据移动到扩容后的新数组，没有则跳过
    HashTable.prototype.moveOldDataToNewPlace = function () {
        var length = this.temporaryTable.length;
        if (length > 0) {
            for (var i = length - 1; i >= 0; i--) {
                if (this.temporaryTable[i].next !== null) {
                    var data = this.temporaryTable[i].next;
                    while (data) {
                        var key = data.key;
                        var value = data.value;
                        this.add(key, value, true);
                        data = data.next;
                    }
                    this.temporaryTable.splice(i, 1);
                    break;
                }
                else {
                    this.temporaryTable.splice(i, 1);
                }
            }
        }
    };
    HashTable.prototype.put = function (key, value) {
        return this.add(key, value);
    };
    // todo 1. 链表里的每个数据都要重新算hash 2. 在旧数据还没清空的情况下新数据可能就到了0.75
    HashTable.prototype.add = function (key, value, flag) {
        if (flag === void 0) { flag = false; }
        var capacity = this.table.length;
        // flag === true 防止moveOldDataToNewPlace时，触发新的扩容
        if (!flag) {
            // 扩容，分次扩容，扩容操作分摊到每次put
            if (this.usedSize / capacity >= HashTable.LOAD_FACTOR) {
                this.resize();
            }
            this.moveOldDataToNewPlace();
        }
        var index = this.hash(key);
        var result = this.table[index];
        // 当前索引没值
        if (result.next === null) {
            this.table[index].next = new Entry(key, value);
            this.table[index].next.pre = this.table[index];
            this.usedSize++;
            return true;
        }
        else {
            var preResult = result;
            result = result.next;
            // 数组只有链表头
            if (result === null) {
                preResult.next = new Entry(key, value);
                preResult.next.pre = preResult;
                return true;
            }
            while (result.key !== key && result.next !== null) {
                result = result.next;
            }
            // 如果有重复的key则覆盖
            if (result.key === key) {
                result.value = value;
            }
            else {
                result.next = new Entry(key, value);
                result.next.pre = result;
            }
            return true;
        }
    };
    HashTable.prototype.remove = function (key) {
        var index = this.hash(key);
        var result = this.table[index];
        // 如果数组中有数据
        if (result.next !== null) {
            result = result.next;
            while (result.key !== key && result.next !== null) {
                result = result.next;
            }
            // 如果链表中有
            if (result.key === key) {
                // 删除链表节点
                var pre = result.pre;
                var next = result.next;
                pre.next = next;
                if (next !== null) {
                    next.pre = pre;
                }
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    HashTable.prototype.get = function (key) {
        var index = this.hash(key);
        var result = this.table[index];
        // 数组元素存在
        if (result.next !== null) {
            result = result.next;
            while (result.key !== key && result.next !== null) {
                result = result.next;
            }
            if (result.key === key) {
                return result.value;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    };
    HashTable.DEFAULT_INITAL_CAPACITY = 8; // 散列表默认长度
    HashTable.LOAD_FACTOR = 0.75; // 装载因子
    return HashTable;
}());
var Entry = /** @class */ (function () {
    function Entry(key, value) {
        this.key = key;
        this.value = value;
        this.pre = null;
        this.next = null;
    }
    return Entry;
}());
var hashTable = new HashTable();
console.log("put a: 1, result", hashTable.put("a", 1));
console.log("put b: 2, result", hashTable.put("b", 2));
console.log("get a, result", hashTable.get("a"));
console.log("get b, result", hashTable.get("b"));
console.log("remove a, result", hashTable.remove("a"));
console.log("get a, result", hashTable.get("a"));
console.log("remove a again, result", hashTable.remove("a"));
console.log("put(update) b: 3, result", hashTable.put("b", 3));
console.log("get b, result", hashTable.get("b"));
