import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import {
  selectUserIsAuthed,
  selectUserIsLoading
} from '../../services/slices/userSlice';

type PrivateRouteProps = {
  children: ReactNode;
  anonym?: boolean;
};

export const PrivateRoute: FC<PrivateRouteProps> = ({
  children,
  anonym = false
}) => {
  const location = useLocation();
  const from = location.state?.from || '/';
  const userIsLoading = useSelector(selectUserIsLoading);
  const userIsAuthed = useSelector(selectUserIsAuthed);
  if (userIsLoading) return <Preloader />;
  if (userIsAuthed && anonym) return <Navigate to={from} />;
  if (!userIsAuthed && !anonym)
    return <Navigate to='/login' state={{ from: location }} />;
  return children;
};
