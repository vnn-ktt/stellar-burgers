import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { useParams } from 'react-router-dom';
import { TIngredient, TOrder } from '@utils-types';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredientsSlice';
import { selectFeedByNumber } from '../../services/slices/feedsSlice';
import { selectUserOrderByNumber } from '../../services/slices/userSlice';

interface OrderInfoProps {
  user?: boolean;
}

export const OrderInfo: FC<OrderInfoProps> = ({ user }) => {
  const ingredients = useSelector(selectIngredients);

  const { number } = useParams<{ number: string }>();

  const orderNumber = number ? Number(number) : NaN;
  if (isNaN(orderNumber)) {
    return <Preloader />;
  }

  let orderData: TOrder | undefined;
  if (user) {
    orderData = useSelector(selectUserOrderByNumber(orderNumber));
  } else {
    orderData = useSelector(selectFeedByNumber(orderNumber));
  }

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;
    const date = new Date(orderData.createdAt);
    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);
  if (!orderInfo) {
    return <Preloader />;
  }
  return <OrderInfoUI orderInfo={orderInfo} />;
};
