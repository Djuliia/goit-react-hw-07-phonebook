import { useDispatch, useSelector } from 'react-redux';
import {
  StyledContactList,
  StyledContactListItem,
  StyledDeleteButton,
} from './ContactList.styled';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/contactSlice';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filtered = useSelector(getFilter);
  const dispatch = useDispatch();

  const getFilteredContacts = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filtered.toLowerCase())
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <StyledContactList>
      {filteredContacts.map(({ id, name, number }) => (
        <StyledContactListItem key={id}>
          {name}: {number}
          <StyledDeleteButton onClick={() => dispatch(deleteContact(id))}>
            Delete
          </StyledDeleteButton>
        </StyledContactListItem>
      ))}
    </StyledContactList>
  );
};
