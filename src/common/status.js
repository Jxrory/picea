//////// todo item 状态 ////////
// 0 NEEDS-ACTIO, 1 COMPLETED, 2 IN-PROCESS, 9 CANCELLED
export const TODO_ITEM_STATUS = {
  "NEEDS-ACTIO": 0, // 待action
  COMPLETED: 1, // 完成
  "IN-PROCESS": 2, // 处理中
  CANCELLED: 9, // 取消
};

// Todo Item 是否为完成状态
export function todoItemIsDone(status) {
  return TODO_ITEM_STATUS.COMPLETED === status;
}

// Todo Item 状态是否可以转换到完成状态
export function todoItemCanDone(status) {
  return (
    status === TODO_ITEM_STATUS["NEEDS-ACTIO"] ||
    status === TODO_ITEM_STATUS["IN-PROCESS"]
  );
}

export const SUB_TODO_ITEM_STATUS = {
  UNDO: 0, // 未完成
  DONE: 1, // 完成
  DELETED: 9, // 删除
};

export const COMMENT_STATUS = {
  UNDO: 0, // 未完成
  DONE: 1, // 完成
  DELETED: 9, // 删除
};

//////// todo item label ////////
export const TODO_ITEM_LABEL = {
  A: "a",
  B: "b",
  C: "c",
  D: "d",
};

//////// 象限label对应的优先级 ////////
export const LABEL_TO_PRIORITY = {
  a: [1, 2],
  b: [3, 4],
  c: [5, 6],
  d: [7, 8],
};

/**
 * 优先级转换为象限label
 *
 * @param {int} priority 优先级
 * @returns label
 */
export function priority2label(priority) {
  for (const label in LABEL_TO_PRIORITY) {
    if (Object.hasOwnProperty.call(LABEL_TO_PRIORITY, label)) {
      if (LABEL_TO_PRIORITY[label].indexOf(priority) > -1) {
        return label;
      }
    }
  }
}

/**
 * 将 label 转换成默认优先级, 未匹配到就是 0
 *  a -> 1, b -> 3, c -> 6, d -> 8
 *
 * @param {String} label
 * @returns
 */
export function label2priority(label) {
  return LABEL_TO_PRIORITY[label][0] || 0;
}
