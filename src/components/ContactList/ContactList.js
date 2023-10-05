import { useDispatch, useSelector } from 'react-redux';
import {
  StyledContactList,
  StyledContactListItem,
  StyledDeleteButton,
} from './ContactList.styled';
import {
  selectContacts,
  selectError,
  selectFilteredContacts,
  selectisLoading,
} from 'redux/selectors';

import { useEffect } from 'react';
import { deleteContact, fetchContacts } from 'redux/operations';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectisLoading);
  const dispatch = useDispatch();

  const filteredContacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {isLoading && <p>Loading contacts...</p>}
      {error && <p>{error}</p>}
      {contacts && (
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
