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
  ))
]