import { CHATROOM_SCROLL_KEY } from '@/constants/storageKeys';
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
  latestReadMessageId?: string | null;
}

const useChatScroll = ({
  scrollRef,
  pages,
  messageDeps,
  isFetchingNextPage = false,
  followThreshold = 150,
  latestReadMessageId,
}: Options) => {
  const wasAtBottomRef = useRef(false);
  const didInitialScrollRef = useRef(false);
  const prevHeightRef = useRef(0);

  const isNearBottom = (offset = followThreshold) => {
    const el = scrollRef.current;

    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight <= offset;
  };

  // 📌 특정 messageId로 스크롤 이동 (재시도 + 성공 시점 콜백)
  const scrollToMessage = (id: string, block: ScrollLogicalPosition = 'center', onSuccess?: () => void) => {
    let attempts = 0;
    const maxAttempts = 20;
    const targetId = String(id);

    const tryScroll = () => {
      const target = document.querySelector<HTMLElement>(`[data-message-id="${targetId}"]`);
      if (target) {
        target.scrollIntoView({ behavior: 'auto', block });
        onSuccess?.();
        didInitialScrollRef.current = true;
        return;
      }
      if (attempts < maxAttempts) {
        attempts++;
        setTimeout(tryScroll, 100);
      } else {
        didInitialScrollRef.current = true;
      }
    };

    tryScroll();
  };

  // 📌 last 보정 (anchor 성공 이후에만 실행)
  const scrollToLast = (id: string, onSuccess?: () => void) => {
    let attempts = 0;
    const maxAttempts = 20;

    const tryScroll = () => {
      const lastEl = document.querySelector<HTMLElement>(`[data-message-id="${String(id)}"]`);
      if (lastEl) {
        const rect = lastEl.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const offset = rect.bottom - viewportHeight;
        window.scrollBy(0, offset);
        onSuccess?.();
        return;
      }
      if (attempts < maxAttempts) {
        attempts++;
        setTimeout(tryScroll, 100);
      }
    };

    tryScroll();
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

  // 1)  최초 진입 / 복귀 로직
  useLayoutEffect(() => {
    if (!pages || didInitialScrollRef.current) return;

    const container = scrollRef.current;
    const total = pages.reduce((acc, p) => acc + (p.messages?.length ?? 0), 0);

    if (total > 0 && container) {
      const savedScrollRange = sessionStorage.getItem(CHATROOM_SCROLL_KEY);

      waitForImages(container).then(() => {
        requestAnimationFrame(() => {
          if (latestReadMessageId) {
            // 👉 특정 메시지 anchor
            scrollToMessage(latestReadMessageId, 'center', () => {
              didInitialScrollRef.current = true;
            });
          } else if (savedScrollRange) {
            try {
              const { first, last } = JSON.parse(savedScrollRange) as {
                first: string | null;
                last: string | null;
              };

              if (first) {
                // 👉 먼저 anchor로 이동
                scrollToMessage(first, 'start', () => {
                  if (last) {
                    // 👉 anchor 성공한 뒤에만 last 보정 실행
                    scrollToLast(last, () => {
                      didInitialScrollRef.current = true;
                    });
                  } else {
                    didInitialScrollRef.current = true;
                  }
                });
              }
            } catch (e) {
              console.error('restoreScrollPosition parse error', e);
            }
          } else {
            // 👉 저장된 위치도 없으면 맨 아래로
            scrollToBottom(scrollRef, 'instant');
            didInitialScrollRef.current = true;
            wasAtBottomRef.current = true;
          }
        });
      });
    }
  }, [latestReadMessageId, pages]);

  // 2) 새 메시지 들어올 때 바닥 근처면 따라가기
  useEffect(() => {
    console.log('didInitialScrollRef.current', didInitialScrollRef.current);
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
