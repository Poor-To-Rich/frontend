import { ChatMessageUnion } from '@/types/messageType';
import { MutableRefObject, useEffect, useLayoutEffect, useRef } from 'react';

interface Options {
  scrollRef: MutableRefObject<HTMLDivElement | null>;
  pages?: { messages?: ChatMessageUnion[] }[];
  messageDeps: any[];
  isFetchingNextPage?: boolean;
  followThreshold?: number;
  enabled?: boolean;
}

const useChatScroll = ({
  scrollRef,
  pages,
  messageDeps,
  isFetchingNextPage = false,
  followThreshold = 150,
  enabled = true,
}: Options) => {
  const didInitialScrollRef = useRef(false);
  const prevHeightRef = useRef(0);
  const prevPageCountRef = useRef(0);

  const scrollToBottom = (behavior: ScrollBehavior = 'auto') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  };

  const isNearBottom = (offset = followThreshold) => {
    const el = scrollRef.current;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight <= offset;
  };

  // 1) 최초 데이터 도착 시 1회 바닥으로 이동
  useLayoutEffect(() => {
    if (!enabled) return;
    if (!pages || didInitialScrollRef.current) return;

    const total = pages?.reduce((acc, p) => acc + (p.messages?.length ?? 0), 0) ?? 0;

    if (total > 0) {
      // DOM 페인트 이후 정확한 높이에서 스크롤
      requestAnimationFrame(() => {
        scrollToBottom('auto');
        didInitialScrollRef.current = true;
      });
    }
  }, [enabled, pages]);

  // 2) 새 메시지 들어올 때 바닥 근처면 따라가기
  useEffect(() => {
    if (!enabled) return;
    if (!didInitialScrollRef.current) return;
    if (isNearBottom()) scrollToBottom('smooth');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, messageDeps);

  // 3) 과거 페이지 로드 시 위치 보존
  useEffect(() => {
    if (!enabled) return;
    if (isFetchingNextPage) {
      prevHeightRef.current = scrollRef.current?.scrollHeight ?? 0;
    }
  }, [enabled, isFetchingNextPage]);

  useEffect(() => {
    if (!enabled) return;
    const pageCount = pages?.length ?? 0;
    if (pageCount > prevPageCountRef.current) {
      const el = scrollRef.current;
      if (el && prevHeightRef.current) {
        const now = el.scrollHeight;
        const prev = prevHeightRef.current;
        el.scrollTop = now - prev; // 기존 위치 유지
      }
    }
    prevPageCountRef.current = pageCount;
  }, [enabled, pages?.length]);
};

export default useChatScroll;
