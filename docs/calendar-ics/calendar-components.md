# 日历组件

## iCalendar Object

### 语法

iCalendar 流的语法如下：

```text
icalstream = 1*icalobject

icalobject = "BEGIN" ":" "VCALENDAR" CRLF
             icalbody
             "END" ":" "VCALENDAR" CRLF
```

### 简单示例

```text
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//hacksw/handcal//NONSGML v1.0//EN
BEGIN:VEVENT
UID:19970610T172345Z-AF23B2@example.com
DTSTAMP:19970610T172345Z
DTSTART:19970714T170000Z
DTEND:19970715T040000Z
SUMMARY:Bastille Day Party
END:VEVENT
END:VCALENDAR
```

## Calendar Components

日历组件可以是 `event`(事件)、`to-do`(待办事项)、`journal`(日记条目)、`time zone information`(时区信息)、`free/busy time information`(忙/闲时间信息)或 `alarm`(闹钟)

icalbody 符号的定义:

```lisp
icalbody   = calprops component

calprops   = *(
            ;
            ; The following are REQUIRED,
            ; but MUST NOT occur more than once.
            ;
            prodid / version /
            ;
            ; The following are OPTIONAL,
            ; but MUST NOT occur more than once.
            ;
            calscale / method /
            ;
            ; The following are OPTIONAL,
            ; and MAY occur more than once.
            ;
            x-prop / iana-prop
            ;
            )

component  = 1*(eventc / todoc / journalc / freebusyc /
            timezonec / iana-comp / x-comp)

iana-comp  = "BEGIN" ":" iana-token CRLF
            1*contentline
            "END" ":" iana-token CRLF

x-comp     = "BEGIN" ":" x-name CRLF
            1*contentline
            "END" ":" x-name CRLF
```

> NOTICE: 日历对象中至少要包含一个组件.

### 事件 `VEVENT`

名称: `VEVENT`

目的: **提供一组组件属性来描述一个事件.**

#### `VEVENT` 格式定义

```lisp
eventc     = "BEGIN" ":" "VEVENT" CRLF
             eventprop *alarmc
             "END" ":" "VEVENT" CRLF

eventprop  = *(
            ;
            ; 以下是必需, 但只能出现一次.
            ;
            dtstamp / uid /
            ;
            ; 如果组件出现在未指定“METHOD”属性的 iCalendar 对象中，则需要以下内容；
            ; 否则，它是可选的； 在任何情况下，它都只能出现一次。
            ;
            dtstart /
            ;
            ; 以下是可选的, 但只能出现一次.
            ;
            class / created / description / geo /
            last-mod / location / organizer / priority /
            seq / status / summary / transp /
            url / recurid /
            ;
            ; 以下是可选的, 可以出现多次.
            ;
            rrule /
            ;
            ; “dtend”或“duration”可以出现在“eventprop”中，
            ; 但“dtend”和“duration”不得出现在同一个“eventprop”中。
            ;
            dtend / duration /
            ;
            ; 以下是可选的, 可以出现多次.
            ;
            attach / attendee / categories / comment /
            contact / exdate / rstatus / related /
            resources / rdate / x-prop / iana-prop
            ;
            )
```

#### `VEVENT` 详细描述

`VEVENT` 是一系列属性的组合, 可能含有 `VALARM` (提醒) 组件, 表示为在日历上预定的时间量.

例如, 它可以是一项活动; 明天上午 8:00 至上午 9:00 举行一小时的部门会议。

通常，一个事件会在单独的日历上占用时间。因此，该时间段在日历上显示为繁忙, 或者可以设置 `TRANSPARENT` (透明的) 不将该时间段标记为繁忙, 在搜索空闲时间段时可以搜索到该时间段.

    “VEVENT”也是用于在日历中指定
    周年纪念或每日提醒的日历组件。这些事件
    具有“DTSTART”属性的 DATE 值类型，而不是
    DATE-TIME的默认值类型。如果这样的“VEVENT”具有“DTEND”
    属性，则还必须将其指定为 DATE 值。
    “VEVENT”的周年类型可以跨越多个日期（即，
    “DTEND”属性值设置为
    “DTSTART”属性值）。如果这样的“VEVENT”具有“DURATION”
    属性，则必须将其指定为“dur-day”或“dur-week”值。

    “VEVENT”的“DTSTART”属性指定
    事件的包含开始。对于重复事件，它还指定
    重复集中的第一个实例。
    “VEVENT”日历组件的“DTEND”属性指定
    事件的非包容性结束。对于“VEVENT”日历组件
    指定具有 DATE 值类型但没有
    “DTEND”或“DURATION”属性的“DTSTART ”属性的情况，事件'
    s 的持续时间被认为是一天。对于“VEVENT”日历组件的情况
    指定具有 DATE-TIME 值类型但没有
    “DTEND”属性的“DTSTART”属性，事件
    在“DTSTART”属性指定的相同日历日期和时间结束。

    “VEVENT”日历组件不能嵌套在另一个
    日历组件中。但是，“VEVENT”日历组件可以相互
    关联，也可以与“VTODO”或
    具有“RELATED-TO”属性的“VJOURNAL”日历组件相关。

TODO(jx) 待整理

#### `VEVENT` Example

以下是用于表示会议的“VEVENT”日历组件的示例，该会议对于繁忙时间的搜索能被搜索到:

```text
BEGIN:VEVENT
UID:19970901T130000Z-123401@example.com
DTSTAMP:19970901T130000Z
DTSTART:19970903T163000Z
DTEND:19970903T190000Z
SUMMARY:年度员工复核
CLASS:PRIVATE
CATEGORIES:BUSINESS,HUMAN RESOURCES
END:VEVENT
```

以下是“VEVENT”日历组件的示例, 在搜索繁忙时间时不会计算在内：

```text
BEGIN:VEVENT
UID:19970901T130000Z-123402@example.com
DTSTAMP:19970901T130000Z
DTSTART:19970401T163000Z
DTEND:19970402T010000Z
SUMMARY:Laurel正在上敏感意识班.
CLASS:PUBLIC
CATEGORIES:BUSINESS,HUMAN RESOURCES
TRANSP:TRANSPARENT
END:VEVENT
```

以下是“VEVENT”日历组件的示例 用于表示每年都会发生的周年纪念日：

```text
BEGIN:VEVENT
UID:19970901T130000Z-123403@example.com
DTSTAMP:19970901T130000Z
DTSTART;VALUE=DATE:19971102
SUMMARY:我们幸福的周年纪念
TRANSP:TRANSPARENT
CLASS:CONFIDENTIAL
CATEGORIES:ANNIVERSARY,PERSONAL,SPECIAL OCCASION
RRULE:FREQ=YEARLY
END:VEVENT
```

下面是一个使用“VEVENT”表示日历组件的例子为期多天的活动定于 2007 年 6 月 28 日 至 2007 年 7 月 8 日（含）。
请注意，“DTEND”属性 设置为 2007 年 7 月 9 日，因为“DTEND”属性指定事件的非包含性结束。

```text
BEGIN:VEVENT
UID:20070423T123432Z-541111@example.com
DTSTAMP:20070423T123432Z
DTSTART;VALUE=DATE:20070628
DTEND;VALUE=DATE:20070709
SUMMARY:Montreal国际爵士乐节
TRANSP:TRANSPARENT
END:VEVENT
```

### 待办事项组件 `VTODO`

组件名称: `VTODO`

目的: **提供一组日历属性来描述`TODO`.**

#### `VTODO` 格式定义

```lisp
todoc      = "BEGIN" ":" "VTODO" CRLF
            todoprop *alarmc
            "END" ":" "VTODO" CRLF

todoprop   = *(
            ;
            ; 以下是必需的, 但只能出现一次.
            ;
            dtstamp / uid /
            ;
            ; 以下是可选的, 但只能出现一次.
            ; 与 `VEVENT` 差别: 多了 `completed`, `percent`, `recurid` 属性.
            ;
            class / completed / created / description /
            dtstart / geo / last-mod / location / organizer /
            percent / priority / recurid / seq / status /
            summary / url /
            ;
            ; 以下是可选的, 可以出现多次.
            ;
            rrule /
            ;
            ; “due”或“duration”可以出现在“todoprop”中，
            ; 但“due”和“duration”不得出现在同一个“todoprop”中。
            ;
            due / duration /
            ;
            ; 以下是可选的, 可能出现多次.
            ;
            attach / attendee / categories / comment /
            contact / exdate / rstatus / related /
            resources / rdate / x-prop / iana-prop
            ;
            )
```

#### `VTODO` 详细描述

#### `VTODO` Examples

以下是需要在 2007 年 5 月 1 日之前完成的“VTODO”日历组件的示例。
在 2007 年 5 月 1 日午夜，此待办事项将被视为过期。

```text
BEGIN:VTODO
UID:20070313T123432Z-456553@example.com
DTSTAMP:20070313T123432Z
DUE;VALUE=DATE:20070501
SUMMARY:提交 Quebec 2006 年所得税申报表
CLASS:CONFIDENTIAL
CATEGORIES:FAMILY,FINANCE
STATUS:NEEDS-ACTION
END:VTODO
```

以下是 2007 年 7 月 9 日 UTC 时间下午 1:00 之前到期并已完成的“VTODO”日历组件示例 UTC 时间 2007 年 7 月 7 日上午 10:00。

```text
BEGIN:VTODO
UID:20070514T103211Z-123404@example.com
DTSTAMP:20070514T103211Z
DTSTART:20070514T110000Z
DUE:20070709T130000Z
COMPLETED:20070707T100000Z
SUMMARY:Submit Revised Internet-Draft
PRIORITY:1
STATUS:NEEDS-ACTION
END:VTODO
```

### 日志组件 `Journal`

名称: `VJOURNAL`

目的: **提供一组描述日志条目的组件属性**

#### `VJOURNAL` 格式定义

```lisp
journalc   = "BEGIN" ":" "VJOURNAL" CRLF
            jourprop
            "END" ":" "VJOURNAL" CRLF

jourprop   = *(
            ;
            ; 以下是必需的, 但只能出现一次.
            ;
            dtstamp / uid /
            ;
            ; 以下是可选的, 但只能出现一次.
            ;
            class / created / dtstart /
            last-mod / organizer / recurid / seq /
            status / summary / url /
            ;
            ; 以下是可选的, 可以出现多次.
            ;
            rrule /
            ;
            ; 以下是可选的, 可能出现多次.
            ;
            attach / attendee / categories / comment /
            contact / description / exdate / related / rdate /
            rstatus / x-prop / iana-prop
            ;
            )
```

#### `VJOURNAL` 详细描述

#### `VJOURNAL` Examples

以下是“VJOURNAL”日历示例:

```text
BEGIN:VJOURNAL
UID:19970901T130000Z-123405@example.com
DTSTAMP:19970901T130000Z
DTSTART;VALUE=DATE:19970317
SUMMARY:Staff meeting minutes
DESCRIPTION:1. 员工会议：参与者包括 Joe\, Lisa\, and Bob. 和 Bob。对极光项目计划进行了审查。该项目目前没有预算储备。Lisa 将升级为管理层。下周二会议。\n 2. 电话会议：ABC 公司的销售代表打电话讨论新打印机。承诺在周五之前为我们提供演示。\n3. 亨利·米勒（Handsoff Insurance）：汽车是由树总计。正在调查借车。555-2323（电话）。
END:VJOURNAL
```

### 忙/闲组件 `VFREEBUSY`

### 时区组件 `VTIMEZONE`

### 报警组件 `VALARM`
