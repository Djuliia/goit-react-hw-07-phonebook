import { Formik } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import {
  StyledForm,
  StyledField,
  StyledBtn,
  ErrorMsg,
} from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactSlice';
import { getContacts } from 'redux/selectors';

const schema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan'"
    )
    .max(22)
    .required('Required'),
  number: Yup.string()
    .matches(
      /^\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}$/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .max(12)
    .required('Required'),
});

export const ContactForm = () => {
  const nameInputId = nanoid();
  const numberInputId = nanoid();
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = (values, { resetForm }) => {
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );
    if (existingContact) {
      alert(`Contact with name "${values.name}" already exists.`);
      return;
    }
    dispatch(addContact(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <StyledForm>
        <label htmlFor={nameInputId}>Name</label>
        <StyledField
          type="text"
          name="name"
          id={nameInputId}
          autoComplete="off"
        />
        <ErrorMsg name="name" component="div" />
        <label htmlFor={numberInputId}>Number</label>
        <StyledField
          type="tel"
          name="number"
          id={numberInputId}
          autoComplete="off"
        />
        <ErrorMsg name="number" component="div" />
        <StyledBtn type="submit">Add contact</StyledBtn>
      </StyledForm>
    </Formik>
  );
};
