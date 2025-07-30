import { AllChatroomsRes, ChatroomSortParam, JoinedChatroomType } from '@/types/chatTypes';
import { http, HttpResponse } from 'msw';
import Profile from '/image/default-profile-image.webp';

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
      lastMessageTime: new Date().toISOString(),
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
        lastMessageTime: new Date(Date.now() - i * 1000 * 60).toISOString(),
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
];
