import { rest } from 'msw'

export const handlers = [
  // Handles a POST /login request
  rest.post('/api/login', (_, res, ctx) => (
    res(
      ctx.status(200),
      ctx.json({
        user: {
          id: '아이디',
          name: '이름'
        },
        token: '토큰'
      }))
  )),

  rest.post('/api/join', (_, res, ctx) => (
    res(ctx.status(200))
  )),

  rest.get('/api/logout', (_, res, ctx) => (
    res(ctx.status(200))
  )),
  
  rest.post('/users/find-account', (_, res, ctx) => (
    res(
      ctx.status(200),
      ctx.json('아이디')
    )
  )),
  
  rest.post('/users/reset-password', (_, res, ctx) => (
    res(
      ctx.status(200),
      ctx.json('아이디')
    )
  )),

  rest.get('/users/1', (_, res, ctx) => (
    res(
      ctx.status(200),
      ctx.json({
        users: [
          {
            id: 'test',
            name: '이름',
            birth: '2003-03-01',
            email: 'a@a.com',
            phone: '010-1234-5678',
            address: '주소'
          }
        ],
        total: 1
      }),
    )
  )),

  rest.delete('/user/test', (_, res, ctx) => (
    res(ctx.status(200))
  )),

  rest.get('/board/1', (_, res, ctx) => (
    res(
      ctx.status(200),
      ctx.json({
        board: [
          {
            no: '1',
            id: 1,
            writer: '아이디',
            subject: '오늘의 제목',
            createdAt: '2023-05-12',
          }
        ],
        total: 1
      }),
    )
  )),

  rest.post('/board', (_, res, ctx) => (
    res(
      ctx.status(200),
      ctx.json({
        id: 1
      }),
    )
  )),

  rest.get('/board/detail/1', (_, res, ctx) => (
    res(
      ctx.status(200),
      ctx.json({
        id: 1,
        subject: '내용',
        content: '제목'
      }),
    )
  )),
]