import {
  AllChatroomsRes,
  ChatroomFormDataType,
  ChatroomSortParam,
  JoinedChatroomType,
  leaveMultipleChatroomsReq,
} from '@/types/chatTypes';
import { delay, http, HttpResponse } from 'msw';
import Profile from '/image/default-profile-image.webp';
import { endpoints } from '@/api/endpoints';
import { getRandomTime } from '../utils/getRandomTime';

export const chatHandlers = [
  http.get('/chatrooms', ({ request }) => {
    const url = new URL(request.url);
    const sortBy = url.searchParams.get('sortBy') as ChatroomSortParam;
    const cursor = url.searchParams.get('cursor');
    const baseId = cursor ? parseInt(cursor, 10) + 1 : 1;

    const chatrooms = Array.from({ length: 10 }).map((_, i) => ({
      chatroomId: baseId + i,
      chatroomImage: Profile,
      chatroomTitle: `채팅방 ${baseId + i}`,
      description: `정렬 기준: ${sortBy}`,
      hashtags: ['#일상', '#스터디'],
      currentMemberCount: Math.floor(Math.random() * 10) + 1,
      maxMemberCount: 20,
      lastMessageTime: getRandomTime(),
    }));

    const isLastPage = baseId >= 30;

    const response: AllChatroomsRes = {
      chatrooms,
      hasNext: !isLastPage,
      nextCursor: isLastPage ? '' : String(baseId + 9),
    };

    return HttpResponse.json({ data: response }, { status: 200 });
  }),

  http.get('/users/me/chatrooms', ({ request }) => {
    const url = new URL(request.url);
    const cursorParam = url.searchParams.get('cursor');
    const cursor = cursorParam ? parseInt(cursorParam, 10) : null;
    const baseId = cursor ? cursor + 1 : 1;

    const chatrooms: JoinedChatroomType[] = Array.from({ length: 10 }).map((_, i) => {
      const id = baseId + i;
      return {
        chatroomId: id,
        chatroomImage: Profile,
        chatroomTitle: `참여중인 채팅방 ${id}`,
        currentMemberCount: Math.floor(Math.random() * 10) + 1,
        lastMessageTime: getRandomTime(),
        lastMessage: `마지막 메시지 ${id}`,
        isHost: id % 3 === 0,
        unreadMessageCount: id % 5 === 0 ? '99+' : Math.floor(Math.random() * 10),
      };
    });

    const isLastPage = baseId >= 30;

    return HttpResponse.json(
      {
        data: {
          chatrooms,
          hasNext: !isLastPage,
          nextCursor: !isLastPage ? String(baseId + 9) : undefined,
        },
      },
      { status: 200 },
    );
  }),
  http.patch(endpoints.chat.markAllAsRead, () => {
    return HttpResponse.json({ status: 200, message: '메세지를 모두 읽음 처리했습니다.' }, { status: 200 });
  }),
  http.delete(endpoints.chat.leaveMultipleChatrooms, async ({ request }) => {
    await delay(500);
    const { chatroomsToLeave } = (await request.json()) as leaveMultipleChatroomsReq;

    return HttpResponse.json({ data: { deletedChatroomIds: chatroomsToLeave } }, { status: 200 });
  }),
  http.get('/chatrooms/search', () => {
    const chatrooms = Array.from({ length: 10 }).map((_, i) => {
      const baseId = 0;
      return {
        chatroomId: baseId + i,
        chatroomImage: Profile,
        chatroomTitle: `채팅방 ${baseId + i}`,
        description: `채팅방입니다`,
        hashtags: ['일상', '스터디'],
        currentMemberCount: Math.floor(Math.random() * 10) + 1,
        maxMemberCount: 20,
        lastMessageTime: getRandomTime(),
      };
    });

    return HttpResponse.json({ data: { chatrooms: chatrooms } }, { status: 200 });
  }),

  http.get(endpoints.chat.getHostedChatrooms, () => {
    const chatrooms = Array.from({ length: 10 }).map((_, i) => {
      const baseId = 0;
      return {
        chatroomId: baseId + i,
        chatroomImage: Profile,
        chatroomTitle: `채팅방 ${baseId + i}`,
        description: `채팅방입니다`,
        hashtags: ['일상', '스터디'],
        currentMemberCount: Math.floor(Math.random() * 10) + 1,
        maxMemberCount: 20,
        lastMessageTime: getRandomTime(),
      };
    });

    return HttpResponse.json({ data: { chatrooms: chatrooms } }, { status: 200 });
  }),

  http.post(endpoints.chat.addChatroom, () => {
    return HttpResponse.json(
      {
        status: 200,
        message: '채팅방을 생성했습니다.',
        data: {
          newChatroomId: 1,
        },
      },
      { status: 200 },
    );
  }),

  http.get('/chatrooms/:chatroomId/edit', () => {
    const response: ChatroomFormDataType = {
      chatroomTitle: `부자되는 채팅방`,
      maxMemberCount: 50,
      description: `채팅방입니다 다들 부자 됩시다!!`,
      hashtags: ['일상', '스터디', '절약', '부자'],
      isRankingEnabled: false,
      isDefaultProfile: true,
    };

    return HttpResponse.json(
      {
        status: 200,
        message: '채팅방 조회에 성공했습니다.',
        data: response,
      },
      { status: 200 },
    );
  }),

  http.put('/chatrooms/:chatroomId/edit', () => {
    return HttpResponse.json(
      {
        status: 200,
        message: '채팅방 편집에 성공했습니다.',
        data: {
          chatroomId: 2,
        },
      },
      { status: 200 },
    );
  }),

  http.delete('/chatrooms/:chatroomId', () => {
    return HttpResponse.json(
      {
        status: 200,
        message: '채팅방 삭제에 성공했습니다.',
        data: {
          deletedChatroomId: 2,
        },
      },
      { status: 200 },
    );
  }),

  http.get('/chatrooms/:chatroomId', () => {
    const response = {
      chatroomId: 101,
      chatroomTitle: '절약왕들의 모임',
      chatroomImage: Profile,
      description: '소비를 줄이고 돈을 모으는 사람들의 모임입니다.',
      hashtags: ['절약', '재테크', '자취'],
      currentMemberCount: 12,
      maxMemberCount: 30,
      createdAt: '2025-07-20T14:32:00Z',
      isJoined: true,
      hasPassword: false,
      hostProfile: {
        userId: 555,
        profileImage: Profile,
        nickname: '짠돌이부자',
        isHost: true,
        rankingType: 'SAVER',
      },
    };
    return HttpResponse.json(
      {
        status: 200,
        message: '채팅방 커버 조회에 성공했습니다.',
        data: response,
      },
      { status: 200 },
    );
  }),

  http.post('/chatrooms/:chatroomId/enter', () => {
    return HttpResponse.json(
      {
        status: 200,
        message: '채팅방 입장에 성공했습니다.',
        data: {
          chatroomId: 1,
        },
      },
      { status: 200 },
    );
  }),

  http.get('/chatrooms/:chatroomId/like', () => {
    return HttpResponse.json(
      {
        status: 200,
        message: '채팅방 좋아요 상태조회에 성공했습니다.',
        data: {
          isLiked: true,
          likeCount: 42,
        },
      },
      { status: 200 },
    );
  }),

  http.patch('/chatrooms/:chatroomId/like', async ({ request }) => {
    const body = await request.json();
    const { isLiked } = body as { isLiked: boolean };

    return HttpResponse.json(
      {
        status: 200,
        message: '채팅방 좋아요 갱신에 성공했습니다.',
        data: {
          isLiked: isLiked,
          likeCount: isLiked ? 42 : 41,
        },
      },
      { status: 200 },
    );
  }),
];
