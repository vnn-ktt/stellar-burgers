import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { selectIngredientById } from '../../services/slices/ingredientsSlice';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();

  if (id == undefined) {
    return <Preloader />;
  }

  const ingredientData = useSelector((state) =>
    selectIngredientById(id)(state)
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
