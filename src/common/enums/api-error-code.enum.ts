
export enum ApiErrorCode {
    TIMEOUT = -1, // 系统繁忙
    SUCCESS = 0, // 成功

    USER_ID_INVALID = 10001, // 用户 ID 无效
    USER_PHONE_INVALID = 10005, // 用户 电话 无效
    USER_EMAIL_INVALID = 10006, // 用户 邮箱 无效
    USER_NAME_INVALID = 10002, // 用户 姓名 无效
    USER_AGE_INVALID = 10003, // 用户 年龄 无效
}