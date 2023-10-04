import { useDispatch, useSelector } from 'react-redux';
import {
  StyledContactList,
  StyledContactListItem,
  StyledDeleteButton,
} from './ContactList.styled';
import { getContacts, getFilter } from 'redux/selectors';

import { useEffect } from 'react';
import { deleteContact, fetchContacts } from 'redux/operations';

export const ContactList = () => {
  const { items, error, isLoading } = useSelector(getContacts);
  const filtered = useSelector(getFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const getFilteredContacts = () => {
    return items.filter(({ name }) =>
      name.toLowerCase().includes(filtered.toLowerCase())
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <>
      {isLoading && <p>Loading contacts...</p>}
      {error && <p>{error}</p>}
      {items && (
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
      )}
    </>
  );
};
