import { rest } from "msw";

export const handlers = [
  // // Handles a POST /login request
  // rest.post('/users/login', (_, res, ctx) => (
  //   res(
  //     ctx.status(200),
  //     ctx.json({
  //       "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZmluZHl1bmppMiIsImVtYWlsIjoiZmluZHl1bmppMkB0ZXN0LmNvbSIsInJvbGVzIjoidXNlciIsImlhdCI6MTY4NjA2OTkzMiwiZXhwIjoxNjg2MDczNTMyfQ.7xbJWqlLWB91WtnxFdwmeg72n4gb2FCLypELiEYAAbg",
  //       "user_id": "findyunji2",
  //       "user_name": "test5",
  //       "email": "findyunji2@test.com",
  //       "roles": "admin",
  //       "phone": "01052804375",
  //       "address": "home",
  //       "birth": "961201"
  //     }))
  // )),
  // rest.post('/users/join', (_, res, ctx) => (
  //   res(ctx.status(200))
  // )),
  // rest.get('/users/logout', (_, res, ctx) => (
  //   res(ctx.status(200))
  // )),
  // rest.get('/users/refresh', (_, res, ctx) => (
  //   res(
  //     ctx.status(200),
  //     ctx.json({
  //       "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZmluZHl1bmppMiIsImVtYWlsIjoiZmluZHl1bmppMkB0ZXN0LmNvbSIsInJvbGVzIjoidXNlciIsImlhdCI6MTY4NjA2OTkzMiwiZXhwIjoxNjg2MDczNTMyfQ.7xbJWqlLWB91WtnxFdwmeg72n4gb2FCLypELiEYAAbg",
  //       "user_id": "findyunji2",
  //       "user_name": "test5",
  //       "email": "findyunji2@test.com",
  //       "roles": "admin",
  //       "phone": "01052804375",
  //       "address": "home",
  //       "birth": "961201"
  //     })
  //   )
  // )),
  // rest.post('/users/find-account', (_, res, ctx) => (
  //   res(
  //     ctx.status(200),
  //     ctx.json('아이디')
  //   )
  // )),
  // rest.post('/users/reset-password', (_, res, ctx) => (
  //   res(
  //     ctx.status(200),
  //     ctx.json('아이디')
  //   )
  // )),
  // rest.get('/admin/user-list', (_, res, ctx) => (
  //   res(
  //     ctx.status(200),
  //     ctx.json([
  //       {
  //           "user_id": "findyunji",
  //           "user_name": "hello",
  //           "email": "yunji@updateTest.com",
  //           "roles": "user",
  //           "phone": "01052804375",
  //           "address": "home",
  //           "birth": "961201"
  //       },
  //       {
  //           "user_id": "findyunji2",
  //           "user_name": "test5",
  //           "email": "findyunji2@test.com",
  //           "roles": "user",
  //           "phone": "01052804375",
  //           "address": "home",
  //           "birth": "961201"
  //       }
  //     ]),
  //   )
  // )),
  // rest.delete('/users/test', (_, res, ctx) => (
  //   res(ctx.status(200))
  // )),
  // rest.get('/board/1', (_, res, ctx) => (
  //   res(
  //     ctx.status(200),
  //     ctx.json({
  //       board: [
  //         {
  //           no: '1',
  //           id: 1,
  //           writer: '아이디',
  //           subject: '오늘의 제목',
  //           createdAt: '2023-05-12',
  //         }
  //       ],
  //       total: 1
  //     }),
  //   )
  // )),
  // rest.post('/board', (_, res, ctx) => (
  //   res(
  //     ctx.status(200),
  //     ctx.json({
  //       id: 1
  //     }),
  //   )
  // )),
  // rest.get('/board/detail/1', (_, res, ctx) => (
  //   res(
  //     ctx.status(200),
  //     ctx.json({
  //       id: 1,
  //       subject: '내용',
  //       content: '제목'
  //     }),
  //   )
  // )),
  // /* 공지사항 */
  // rest.get('/notice/1', (_, res, ctx) => (
  //   res(
  //     ctx.status(200),
  //     ctx.json({
  //       board: [
  //         {
  //           no: '1',
  //           id: 1,
  //           writer: '아이디',
  //           subject: '오늘의 공지',
  //           createdAt: '2023-05-12',
  //         }
  //       ],
  //       total: 1
  //     }),
  //   )
  // )),
  // rest.post('/notice', (_, res, ctx) => (
  //   res(
  //     ctx.status(200),
  //     ctx.json({
  //       id: 1
  //     }),
  //   )
  // )),
  // rest.get('/notice/detail/1', (_, res, ctx) => (
  //   res(
  //     ctx.status(200),
  //     ctx.json({
  //       id: 1,
  //       subject: '내용',
  //       content: '제목'
  //     }),
  //   )
  // )),
  // /* qna */
  // rest.get('/qna/1', (_, res, ctx) => (
  //   res(
  //     ctx.status(200),
  //     ctx.json({
  //       board: [
  //         {
  //           no: '1',
  //           id: 1,
  //           writer: '아이디',
  //           subject: '오늘의 QNA',
  //           createdAt: '2023-05-12',
  //         }
  //       ],
  //       total: 1
  //     }),
  //   )
  // )),
  // rest.post('/qna', (_, res, ctx) => (
  //   res(
  //     ctx.status(200),
  //     ctx.json({
  //       id: 1
  //     }),
  //   )
  // )),
  // rest.get('/qna/detail/1', (_, res, ctx) => (
  //   res(
  //     ctx.status(200),
  //     ctx.json({
  //       id: 1,
  //       subject: '내용',
  //       content: '제목'
  //     }),
  //   )
  // )),
  // /* shop */
  // rest.get('/hospital/1', (_, res, ctx) => (
  //   res(
  //     ctx.status(200),
  //     ctx.json({
  //       board: [
  //         {
  //           no: '1',
  //           id: 1,
  //           name: '아이디',
  //           time: '오늘의 QNA',
  //           phone: '2023-05-12',
  //         }
  //       ],
  //       total: 1
  //     }),
  //   )
  // )),
  // rest.post('/hospital', (_, res, ctx) => (
  //   res(
  //     ctx.status(200),
  //     ctx.json({
  //       id: 1
  //     }),
  //   )
  // )),
  // rest.get('/hospital/detail/1', (_, res, ctx) => (
  //   res(
  //     ctx.status(200),
  //     ctx.json({
  //       id: 1,
  //       name: '업체명',
  //       time: '영업시간',
  //       detail: '상세 내용입니다.',
  //       phone: '010-1234-5678'
  //     }),
  //   )
  // )),
];
