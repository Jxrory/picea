# ICS 格式

```bash
BEGIN:VCALENDAR                                  # 日历开始
PRODID:-//test.us//iCalendar Event//EN           # 软件信息
VERSION:2.0                                      # 遵循的 iCalendar 版本号
CALSCALE:GREGORIAN                               # 历法：公历
METHOD:PUBLISH                                   # 方法：公开 也可以是 REQUEST 等用于日历间的信息沟通方法
CLASS:PUBLIC                                     # Classification 此属性定义日历组件的访问分类: "PUBLIC" / "PRIVATE" / "CONFIDENTIAL" / iana-token / x-name
BEGIN:VTIMEZONE                                  # Time Zone Component
TZID:Asia/Shanghai                               # Time Zone Identifier 时区标识符
TZURL:http://tzurl.org/zoneinfo-outlook/Asia/Shanghai            # Time Zone URL: 访问 http://tzurl.azureedge.net/zoneinfo-outlook/Asia
X-LIC-LOCATION:Asia/Shanghai
BEGIN:STANDARD
TZOFFSETFROM:+0800
TZOFFSETTO:+0800
TZNAME:CST
DTSTART:19700101T000000
END:STANDARD
END:VTIMEZONE                                     # 时区组件结束
BEGIN:VEVENT                                      # 事件开始
DTSTAMP:20190723T071307Z                          # 有 Method 属性时表示 实例创建时间，没有时表示最后修订的日期时间
DTSTART;TZID=Asia/Shanghai:20191024T150000        # 开始的日期时间
DTEND;TZID=Asia/Shanghai:20191024T160000          # 结束的日期时间
SUMMARY:我的会议                                   # 简介 一般是标题
# UID (唯一标识符)
UID:20190723T071307Z-105904298@fe80:0:0:0:e4:cbff:fe80:b24c%ens5
# Time Zone Identifier 时区标识符
TZID:Asia/Shanghai
# 描述
DESCRIPTION:issac 的描述
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
# 日历结束
END:VCALENDAR
```

## 参考

[日历标准格式 - 2020-07-06](https://cloud.tencent.com/developer/article/1655829)
