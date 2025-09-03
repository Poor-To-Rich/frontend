import { ChatMessageUnion } from '@/types/messageType';
import { scrollToBottom } from '@/utils/chat/scrollToBottom';
import { waitForImages } from '@/utils/chat/waitForImages';
import { MutableRefObject, useEffect, useLayoutEffect, useRef } from 'react';

interface Options {
  scrollRef: MutableRefObject<HTMLDivElement | null>;
  pages?: { messages?: ChatMessageUnion[] }[];
  messageDeps: any[];
  isFetchingNextPage?: boolean;
  followThreshold?: number;
}

const useChatScroll = ({
  scrollRef,
  pages,
  messageDeps,
  isFetchingNextPage = false,
  followThreshold = 150,
}: Options) => {
  const wasAtBottomRef = useRef(false);
  const didInitialScrollRef = useRef(false);
  const prevHeightRef = useRef(0);

  const isNearBottom = (offset = followThreshold) => {
    const el = scrollRef.current;

    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight <= offset;
  };

  // 📌 스크롤 이벤트로 현재 위치 추적
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollHandler = () => {
      wasAtBottomRef.current = isNearBottom();
    };

    el.addEventListener('scroll', scrollHandler);
    // 초기 상태도 저장
    scrollHandler();

    return () => {
      el.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollRef, followThreshold]);

  // 1) 최초 데이터 도착 시 1회 바닥으로 이동
  useLayoutEffect(() => {
    if (!pages || didInitialScrollRef.current) return;

    const el = scrollRef.current;
    const total = pages?.reduce((acc, p) => acc + (p.messages?.length ?? 0), 0) ?? 0;

    if (total > 0 && el) {
      waitForImages(el).then(() => {
        requestAnimationFrame(() => {
          scrollToBottom(scrollRef, 'instant');
          didInitialScrollRef.current = true;
          wasAtBottomRef.current = true;
        });
      });
    }
  }, [pages]);

  // 2) 새 메시지 들어올 때 바닥 근처면 따라가기
  useEffect(() => {
    if (!didInitialScrollRef.current || !scrollRef.current) return;
    const el = scrollRef.current;

    if (wasAtBottomRef.current) {
      waitForImages(el).then(() => {
        requestAnimationFrame(() => {
          scrollToBottom(scrollRef, 'instant');
        });
      });
    }
  }, [messageDeps, pages]);

  // 3) 과거 페이지 로드 시 위치 보존
  useEffect(() => {
    if (isFetchingNextPage) {
      prevHeightRef.current = scrollRef.current?.scrollHeight ?? 0;
    }
  }, [isFetchingNextPage]);

  useEffect(() => {
    const el = scrollRef.current;

    if (!isFetchingNextPage) {
      if (el && prevHeightRef.current) {
        const diff = el.scrollHeight - prevHeightRef.current;
        if (diff > 0) {
          el.scrollTop += diff;
        }
      }
    }
  }, [isFetchingNextPage]);
};

export default useChatScroll;
