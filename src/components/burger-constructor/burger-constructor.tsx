import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  clearBurgerConstructor,
  selectBun,
  selectBurgerIngredients,
  selectBurgerIngredientsIds
} from '../../services/slices/burgerSlice';
import {
  selectOrderRequest,
  selectOrderModalData,
  clearOrderModalData,
  orderBurger,
  getUserOrders
} from '../../services/slices/userSlice';
import { selectUserIsAuthed } from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorBun = useSelector(selectBun);
  const constructorIngredients = useSelector(selectBurgerIngredients);
  const constructorItems = {
    bun: constructorBun,
    ingredients: constructorIngredients
  };
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const burgerItemsIds = useSelector(selectBurgerIngredientsIds);
  const userIsAuthed = useSelector(selectUserIsAuthed);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onOrderClick = () => {
    if (!userIsAuthed) {
      navigate('/login');
    } else if (constructorItems.bun || !orderRequest) {
      dispatch(orderBurger(burgerItemsIds));
    }
  };
  const closeOrderModal = () => {
    dispatch(getUserOrders());
    dispatch(clearBurgerConstructor());
    dispatch(clearOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
