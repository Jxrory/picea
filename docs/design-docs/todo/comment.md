# Todo Comment

## 前后端交互

### 数据格式

### API

## 后端

### SQL

```sql
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `uid` char(32) NOT NULL COMMENT '用户Id',
  `username` varchar(64) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(128) NOT NULL DEFAULT '' COMMENT '密码',
  `nick` varchar(64) DEFAULT '' COMMENT '用户别名, 展示名字',
  `email` varchar(64) DEFAULT '' COMMENT '电子邮箱',
  `mobile` varchar(16) DEFAULT '' COMMENT '手机号码',
  `sex` tinyint(8) DEFAULT 0 COMMENT '0 未知, 1 男, 2 女',
  `avator` varchar(128) DEFAULT '' COMMENT '头像URL',
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';


DROP TABLE IF EXISTS `todo_comment`;
CREATE TABLE IF NOT EXISTS `todo_comment` (
  `uid` char(32) NOT NULL COMMENT 'UID (唯一标识符)',
  `user_id` char(32) NOT NULL COMMENT '关联用户Id',
  `status` tinyint(8) DEFAULT 0 COMMENT '评论状态: 0 待审核, 1 审核通过评论, 9 评论已删除',
  `target_uid` char(32) DEFAULT '' COMMENT '关联的uid',
  `content` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '评论内容',
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```
