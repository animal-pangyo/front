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


  /* 공지사항 */
  rest.get('/notice/1', (_, res, ctx) => (
    res(
      ctx.status(200),
      ctx.json({
        board: [
          {
            no: '1',
            id: 1,
            writer: '아이디',
            subject: '오늘의 공지',
            createdAt: '2023-05-12',
          }
        ],
        total: 1
      }),
    )
  )),

  rest.post('/notice', (_, res, ctx) => (
    res(
      ctx.status(200),
      ctx.json({
        id: 1
      }),
    )
  )),

  rest.get('/notice/detail/1', (_, res, ctx) => (
    res(
      ctx.status(200),
      ctx.json({
        id: 1,
        subject: '내용',
        content: '제목'
      }),
    )
  )),

  /* qna */
  rest.get('/qna/1', (_, res, ctx) => (
    res(
      ctx.status(200),
      ctx.json({
        board: [
          {
            no: '1',
            id: 1,
            writer: '아이디',
            subject: '오늘의 QNA',
            createdAt: '2023-05-12',
          }
        ],
        total: 1
      }),
    )
  )),

  rest.post('/qna', (_, res, ctx) => (
    res(
      ctx.status(200),
      ctx.json({
        id: 1
      }),
    )
  )),

  rest.get('/qna/detail/1', (_, res, ctx) => (
    res(
      ctx.status(200),
      ctx.json({
        id: 1,
        subject: '내용',
        content: '제목'
      }),
    )
  )),
  
  /* shop */
  rest.get('/hospital/1', (_, res, ctx) => (
    res(
      ctx.status(200),
      ctx.json({
        board: [
          {
            no: '1',
            id: 1,
            name: '아이디',
            time: '오늘의 QNA',
            phone: '2023-05-12',
          }
        ],
        total: 1
      }),
    )
  )),

  rest.post('/hospital', (_, res, ctx) => (
    res(
      ctx.status(200),
      ctx.json({
        id: 1
      }),
    )
  )),

  rest.get('/hospital/detail/1', (_, res, ctx) => (
    res(
      ctx.status(200),
      ctx.json({
        id: 1,
        name: '업체명',
        time: '영업시간',
        detail: '상세 내용입니다.',
        phone: '010-1234-5678'
      }),
    )
  )),
]