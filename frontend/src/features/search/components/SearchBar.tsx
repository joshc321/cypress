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
  onSubmit: SubmitHandler<SearchValues>;
};

export const SearchBar = ({ onSubmit }: SearchBarProps) => {

  return (
      <Form<SearchValues, typeof schema>
        onSubmit={onSubmit}
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