import React from 'react';
import { useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { fetchFeeds } from '../../services/slices/feedsSlice';
import { getUser } from '../../services/slices/userSlice';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';
import {
  PrivateRoute,
  Modal,
  OrderModal,
  AppHeader,
  IngredientDetails
} from '@components';
import {
  NotFound404,
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders
} from '@pages';
import { getCookie } from '../../utils/cookie';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchFeeds());
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      dispatch(getUser());
    }
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={<OrderModal onClose={() => navigate(-1)} />}
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/login'
          element={
            <PrivateRoute forAuthed>
              <Login />
            </PrivateRoute>
          }
        />
        <Route
          path='/register'
          element={
            <PrivateRoute forAuthed>
              <Register />
            </PrivateRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <PrivateRoute forAuthed>
              <ForgotPassword />
            </PrivateRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <PrivateRoute forAuthed>
              <ResetPassword />
            </PrivateRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        >
          <Route
            path='orders'
            element={
              <PrivateRoute>
                <ProfileOrders />
              </PrivateRoute>
            }
          />
          <Route
            path='orders/:number'
            element={<OrderModal onClose={() => navigate(-1)} />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
