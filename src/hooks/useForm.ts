import { useState, ChangeEvent } from 'react';
function useForm<T>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const resetForm = () => setValues(initialValues);
  return { values, handleChange, resetForm, setValues };
}
export default useForm;
