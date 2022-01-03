# EVENT 的格式和 SQL 的确定

## 日历格式 `ics`

由 `VEVENT` 包裹, 参考: [日历标准格式](https://cloud.tencent.com/developer/article/1655829)

```bash
BEGIN:VEVENT                                      # 事件开始
# UID (唯一标识符)
UID:20190723T071307Z-105904298@fe80:0:0:0:e4:cbff:fe80:b24c%ens5
DTSTART;TZID=Asia/Shanghai:20191024T150000        # 开始的日期时间
DTEND;TZID=Asia/Shanghai:20191024T160000          # 结束的日期时间
SUMMARY:我的会议                                   # 简介 一般是标题
DESCRIPTION:issac 的描述                           # 描述
TZID:Asia/Shanghai                                # Time Zone Identifier 时区标识符
CREATED:20190723T071307Z                          # 创建的日期和时间, 该值必须指定为具有 UTC 时间的日期
DTSTAMP:20190723T071307Z                          # 有 Method 属性时表示 实例创建时间，没有时表示最后修订的日期时间, 该值必须指定为具有 UTC 时间的日期
# 地址
LOCATION:https://cloud.tencent.com/developer/user/6258660
# Alarm Component 报警组件
BEGIN:VALARM
# 触发 alarm (开始之前10分钟提醒)
TRIGGER:-PT10M
# AUDIO\DISPLAY\EMAIL
ACTION:DISPLAY
# In a DISPLAY alarm, the intended alarm effect is for
# the text value of the "DESCRIPTION" property to be displayed to the user.
DESCRIPTION:Reminder
# alarm 结束
END:VALARM
# 事件结束
END:VEVENT
```

### 优先级的问题

#### RFC5545 优先级

缺少优先级补充下, [rfc5545](https://datatracker.ietf.org/doc/html/rfc5545) 协议中是有优先级字段: [PRIORITY](https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.1.9)

> 属性名称：PRIORITY
>
> 用途：此属性定义日历组件的相对优先级。
>
> 值类型：INTEGER
>
> 一致性：可以在“VEVENT”和“VTODO”日历组件中指定此属性。
>
> 说明：此优先级指定为 0 到 9 范围内的整数。`0` 指定未定义的优先级, `1` 是最高优先级, 后续数字指定递减的顺序优先级, `9`是最低优先级。
>
> 具有“HIGH”、“MEDIUM”和“LOW”三级优先级方案的 CUA 被映射到此属性中，以便 `1-4` 范围内的属性值指定“HIGH”优先级。 `5`是正常或“中”优先级。`6-9` 范围内的值是“低”优先级。

**使用**:

```text
符号定义：
    priority = "PRIORITY" prioparam ":" priovalue CRLF ; 默认为零（即未定义）。

    prioparam = *(";" other-param)

    priovalue = integer ;必须在 [0..9] 范围内 ; 所有其他值保留供将来使用。
```

#### 规整到现有系统中

现在使用的是 4 象限优先级, 需要将优先级类别划分 4 种类型.

```bash
重要且紧急: 1, 2    # 默认 `1`
重要不紧急: 3, 4    # 默认 `3`
紧急不重要: 6, 7    # 默认 `6`
不重要不紧急: 8, 9  # 默认 `8`
```

未指定优先级默认是 `0`, 目前没有使用到的优先级 `5` 暂时留白

### 状态

[RFC5545 状态定义](https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.1.11)

```text
statvalue-event = "TENTATIVE" ;表示事件是暂定的。
                    / "CONFIRMED" ;表示事件确定。
                    / "CANCELLED" ;表示事件被取消。

statvalue-todo = "NEEDS-ACTION" ; 表示待办事项需要采取行动。
                    / "COMPLETED" ; 表示待办事项已完成。
                    / "IN-PROCESS" ; 表示正在处理的待办事项。
                    / "CANCELLED" ; 表示待办事项被取消。

statvalue-jour = "DRAFT" ;表示期刊是草稿。
                    / "FINAL" ;表示日志是最终的。
                    / "CANCELLED" ;表示日志被删除。
```

## 前后端交互

### `TODO Item`数据格式定时

使用 `json` 格式

```json
{
  "uid": "8B9CF5C2-3F03-436D-A371-BF6B6A3D7AAF", // UID (唯一标识符)
  "dtstamp": "2022-01-01T01:50:52.000+00:00", // 最后修订的日期时间

  "class": "PRIVATE", // 类别: "PUBLIC" / "PRIVATE" / "CONFIDENTIAL" / iana-token / x-name ;默认为 PUBLIC
  "completed": "2022-01-01T01:50:52.000+00:00", // 完成时间
  "created": "2022-01-01T01:50:52.000+00:00", // 创建的日期和时间
  "description": "issac 的描述", // 描述
  "dtstart": "2022-01-01T01:50:52.000+00:00", // 开始的日期时间
  "geo": "37.386013;-122.082932", // 坐标
  "last-mod": "2022-01-01T01:50:52.000+00:00", // 最后修改时间
  "location": "ALTREP=\"http://xyzcorp.com/conf-rooms/f123.vcf\":Conference Room - F123, Bldg. 002", // 地址信息
  "organizer": "jxrory@jxrory.com", // 组织者/拥有者
  "percent": 30, // 待办事项的完成百分比
  "priority": 1, // 优先级, 定义参考 [优先级的问题] 小节
  // "recurid": 1,
  "seq": 0, // 修改次数, 创建的时候是 0
  "status": "NEEDS-ACTION", // 参考 日历格式.状态: "NEEDS-ACTION" / "COMPLETED" / "IN-PROCESS" / "CANCELLED"
  "summary": "我的会议", // 简介 一般是标题
  "url": "https://www.jxrory.com",
  "due": "2022-01-01T01:50:52.000+00:00", // 到期时间

  "attach": "uri", // 附件
  "attendee": [], // 参与者
  "categories": "APPOINTMENT,EDUCATION", // 类别
  "comment": [], // 评论
  "contact": "Jim Dolittle, ABC Industries, +1-919-555-1234", // 联系人
  "exdate": "", // 异常日期时间, 没有细看: https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.5.1
  "rstatus": "", // Request Status
  "related": "START", // 指定警报触发器相对于日历组件的开始或结束的关系: START | END
  "resources": "EASEL,PROJECTOR,VCR", // 该属性定义了由日历组件指定的活动所预期的设备或资源

  "rdate": "",
  "rrule": ""
}
```

### 接口定义

#### 创建 TODO

| Path            | Method | Detail                  | 备注                         |
| --------------- | ------ | ----------------------- | ---------------------------- |
| /api/todos      | POST   | 添加一个 TODO ITEM      |                              |
| /api/todos      | GET    | 获取所有的待完成的 TODO |                              |
| /api/todos/{id} | GET    | 获取 {id} TODO 的详情   |                              |
| /api/todos/{id} | PUT    | 更新 {id} todo          | 目前还不支持细粒度的更新方式 |
| /api/todos/{id} | DELETE | 删除 {id} todo          |                              |

## 后端相关

### SQL

```sql
DROP TABLE IF EXISTS `todo`;
CREATE TABLE IF NOT EXISTS `todo` (
  `uid` varchar(64) NOT NULL COMMENT 'UID (唯一标识符)',
  `priority` tinyint(8) DEFAULT 0 COMMENT '优先级: 0: 未定义, 1-9: 优先级逐步降低',
  `percent` int(8) DEFAULT 0 COMMENT '待办事项的完成百分比',
  `seq` int(8) DEFAULT 0 COMMENT '修改次数, 创建时为: 0',
  `status` int(8) DEFAULT 0 COMMENT 'TODO状态: 0 NEEDS-ACTIO, 1 COMPLETED, 2 IN-PROCESS, 9 CANCELLED',
  `related` varchar(8) DEFAULT '' COMMENT '指定警报触发器相对于日历组件的开始或结束的关系: START | END',
  `clazz` varchar(16) DEFAULT 'PUBLIC' COMMENT '类别: "PUBLIC", "PRIVATE", "CONFIDENTIAL", iana-token, x-name ;默认为 PUBLIC',
  `geo` varchar(32) DEFAULT '' COMMENT 'GPS坐标',
  `dtstart` datetime DEFAULT NULL COMMENT '开始时间',
  `completed` datetime DEFAULT NULL COMMENT '完成时间',
  `due` datetime DEFAULT NULL COMMENT '到期时间',
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',
  `dtstamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后修订的日期时间',
  `categories` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '类别',
  `location` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '地址信息',
  `organizer` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '组织者/拥有者',
  `summary` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '简介一般是标题',
  `url` varchar(256) DEFAULT '' COMMENT '关联的url',
  `description` longtext COLLATE utf8mb4_unicode_ci COMMENT '内容',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
```
