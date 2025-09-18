import { useEffect } from 'react';
import { useLocation, useNavigationType, matchPath } from 'react-router-dom';

const ScrollToUp = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  const excludedRoutes = ['/chat', '/chat/chatroom/:id'];

  const isExcluded = excludedRoutes.some(pattern => matchPath({ path: pattern, end: true }, pathname));

  useEffect(() => {
    if (isExcluded) return;

    if (navigationType !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType, isExcluded]);

  return null;
};

export default ScrollToUp;
