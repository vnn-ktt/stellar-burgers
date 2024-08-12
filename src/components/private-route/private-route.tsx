import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import {
  selectUserIsAuthed,
  selectUserIsLoading
} from '../../services/slices/userSlice';

type PrivateRouteProps = {
  children: ReactNode;
  forAuthed?: boolean;
};

export const PrivateRoute: FC<PrivateRouteProps> = ({
  children,
  forAuthed
}) => {
  const userIsLoading = useSelector(selectUserIsLoading);
  const userIsAuthed = useSelector(selectUserIsAuthed);

  if (userIsLoading) return <Preloader />;
  if (userIsAuthed && forAuthed) return <Navigate to='/profile' />;
  if (!userIsAuthed && !forAuthed) return <Navigate to='/login' />;
  else return <>{children}</>;
};
