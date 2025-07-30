import { format, isThisYear, isToday, isYesterday } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatPublicLastMessageTime = (lastMessageTime: string) => {
  const now = new Date();
  const last = new Date(lastMessageTime);

  const diffMs = now.getTime() - last.getTime();
  const diffMin = Math.floor(diffMs / (1000 * 60));

  if (diffMin <= 10) return '방금 대화';
  if (diffMin <= 60) return '30분 전';
  if (diffMin <= 120) return '1시간 전';
  return null;
};

export const formatDetailLastMessageTime = (isoString: string) => {
  const date = new Date(isoString);

  if (isToday(date)) {
    return format(date, 'a h시 mm분', { locale: ko });
  }

  if (isYesterday(date)) return '어제';

  if (isThisYear(date)) return format(date, 'M월 d일');

  return format(date, 'yyyy년 M월 d일');
};
