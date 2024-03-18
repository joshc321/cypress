import { SearchInput } from './SearchInput'
import { Form } from '@/components/Form';
import { SubmitHandler } from 'react-hook-form';
import z from 'zod';

const schema = z.object({
  query: z.string(),
});

type SearchValues = {
  query: string;
};

type SearchBarProps = {
  searchValue: string;
  onSubmit: SubmitHandler<SearchValues>;
};

export const SearchBar = ({ searchValue, onSubmit }: SearchBarProps) => {

  return (
      <Form<SearchValues, typeof schema>
        onSubmit={onSubmit}
        options={{
          values: { query: searchValue },
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <SearchInput
              error={formState.errors['query']}
              registration={register('query')}
            />
          </>
        )}
        
      </Form>
  );
};