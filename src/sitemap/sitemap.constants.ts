import { TopLevelCategory } from 'src/top-page/models/top-page.model';

type routeMapType = Record<TopLevelCategory, string>;

export const CATEGORY_URL: routeMapType = {
  0: '/courses',
  1: '/services',
  2: '/books',
  3: '/products',
};
