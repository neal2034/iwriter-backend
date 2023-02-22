export default {
  auth:{
    UnAuthorized: { code: 100001, msg: '没有权限' },
    UserExist: { code: 100002, msg: 'user already exist' },
    UserNotExist: { code: 100003, msg: 'user not exist' },
    InvalidToken: { code: 100004, msg: 'invalid invitation token' },
    AuthenticationError: { code: 100005, msg: '用户名或密码错误' },
    ExtendCallLimit: {code: 100006, msg: "extend call limit for free user"},
    OpenApiServerError: {code:100007, msg:'openapi server error'}
  }
}