import { InMemoryCache } from '@apollo/client';
import { mockCacheData } from './__mockData';
import cacheConfig from '../../__cacheConfig';

export const mockCache = new InMemoryCache(cacheConfig).restore(mockCacheData);
