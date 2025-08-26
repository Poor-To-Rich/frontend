import { http, HttpResponse } from 'msw';

export const photoHandlers = [
  http.get('/chatrooms/:chatroomId/photos/:photoId', ({ params }) => {
    const { photoId } = params;
    const id = Number(photoId);

    if (id === 100) {
      return HttpResponse.json({
        data: {
          chatroomId: Number(params.chatroomId),
          uploadedAt: '2025-07-22T15:00:00Z',
          uploadedBy: {
            userId: 1,
            nickname: '야호',
          },
          photoId: 100,
          photoUrl: 'https://poor-to-rich.s3.ap-northeast-2.amazonaws.com/d13a16ce-c4b3-427e-bf18-44e6033603f3.webp',
          prevPhotoId: null,
          nextPhotoId: 101,
        },
      });
    }

    if (id === 101) {
      return HttpResponse.json({
        data: {
          chatroomId: Number(params.chatroomId),
          uploadedAt: '2025-07-23T15:00:00Z',
          uploadedBy: {
            userId: 1,
            nickname: '짠돌이부자',
          },
          photoId: 101,
          photoUrl: 'https://poor-to-rich.s3.ap-northeast-2.amazonaws.com/7f46fb55-9646-494f-8bec-1c7a0b825a7c.webp',
          prevPhotoId: 100,
          nextPhotoId: 102,
        },
      });
    }

    if (id === 102) {
      return HttpResponse.json({
        data: {
          chatroomId: Number(params.chatroomId),
          uploadedAt: '2025-07-24T15:00:00Z',
          uploadedBy: {
            userId: 1,
            nickname: '데굴',
          },
          photoId: 102,
          photoUrl: 'https://poor-to-rich.s3.ap-northeast-2.amazonaws.com/fa7e0f3a-a0a8-495d-b2a7-52b5a54de1fe.webp',
          prevPhotoId: 101,
          nextPhotoId: null,
        },
      });
    }

    return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
  }),
];
