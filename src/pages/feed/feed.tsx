import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchFeeds,
  selectOrders,
  selectFeedsIsLoading
} from '../../services/slices/feedsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  const feedsIsLoading = useSelector(selectFeedsIsLoading);
  const orders: TOrder[] = useSelector(selectOrders);

  if (feedsIsLoading) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
