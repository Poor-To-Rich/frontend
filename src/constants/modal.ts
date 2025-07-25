export const MEMBER_LEAVE_CHATROOM_NOTICE = `채팅방을 나가시겠어요?
대화내용이 모두 삭제되고 복원이 불가능 합니다.`;

export const HOST_LEAVE_CHATROOM_NOTICE = `채팅방을 나가시겠어요?
방장이 나가면 채팅방이 종료되어 더 이상
더 이상 새로운 대화를 할 수 없습니다.
종료된 채팅방은 나의 채팅방 목록에서 삭제되며,
한번 삭제된 대화내용은 복원이 불가능합니다.`;

export const getHostTransferNotice = (nickname: string) =>
  `방장을 ${nickname}님으로 변경할까요?
변경한 후에는 취소할 수 없습니다.`;
