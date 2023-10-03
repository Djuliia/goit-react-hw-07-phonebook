import { useDispatch } from 'react-redux';
import { Label, StyledInput } from './Filter.styled';
import { setFilter } from 'redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();

  return (
    <Label>
      Find contacts by name
      <StyledInput
        type="text"
        name="filter"
        onChange={e => dispatch(setFilter(e.target.value))}
      />
    </Label>
  );
};
