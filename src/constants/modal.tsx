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

export const rankingDescriptions = [
  <>
    매주 월요일 <strong>AM 12시</strong>에 랭킹이 집계됩니다.
  </>,
  <>
    지난주의 지출을 비교하여 <strong>상위 3위 / 하위 3위</strong>를 뽑습니다.
  </>,
  <>
    상위, 하위 1등은 각각 <strong>플렉스왕 / 절약왕</strong>으로 선발됩니다.
  </>,
  <>
    플렉스왕/절약왕에게는 프로필에 <span className="text-oliveGreen font-bold">랭킹 뱃지</span>가 부여됩니다.
  </>,
  <>
    해당 주에 지출 가계부를 <strong className="text-defaultGreen">3일 이상</strong> 작성한 사용자만 후보가 될 수
    있습니다.
    <br />
    <span className="text-sunsetRose">(후보 인원이 2명 미만인 경우에는 랭킹 제공 X)</span>
  </>,
];
