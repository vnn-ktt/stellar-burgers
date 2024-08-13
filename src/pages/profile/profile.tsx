import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { selectUser, updateUser } from '../../services/slices/userSlice';
import useForm from '../../hooks/useForm';

type TUser = {
  name: string;
  email: string;
  password: string;
};

export const Profile: FC = () => {
  const user = useSelector(selectUser);

  const { values, handleChange, resetForm, setValues } = useForm<TUser>({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setValues((prevState: TUser) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    values.name !== user?.name ||
    values.email !== user?.email ||
    !!values.password;

  console.log(isFormChanged);

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const updatedFields: Partial<TUser> = {};
    if (values.name !== user.name) updatedFields.name = values.name;
    if (values.email !== user.email) updatedFields.email = values.email;
    if (values.password) updatedFields.password = values.password;
    if (Object.keys(updatedFields).length > 0) {
      dispatch(updateUser(updatedFields));
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    resetForm();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  };

  return (
    <>
      <ProfileUI
        formValue={values}
        isFormChanged={isFormChanged}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
    </>
  );
};
