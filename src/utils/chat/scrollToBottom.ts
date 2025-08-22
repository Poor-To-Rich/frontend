import { MutableRefObject } from 'react';

export const scrollToBottom = (
  scrollRef: MutableRefObject<HTMLDivElement | null>,
  behavior: ScrollBehavior = 'auto',
) => {
  const el = scrollRef.current;
  if (!el) return;
  el.scrollTo({ top: el.scrollHeight, behavior });
};
