'use client'
import { Field, QueryBuilder, RuleGroupType,formatQuery } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.css';

const fields: Field[] = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
  { name: 'age', label: 'Age', inputType: 'number' },
  { name: 'address', label: 'Address' },
  { name: 'phone', label: 'Phone' },
  { name: 'email', label: 'Email', validator: ({ value }) => /^[^@]+@[^@]+/.test(value) },
  { name: 'twitter', label: 'Twitter' },
  { name: 'isDev', label: 'Is a Developer?', valueEditorType: 'checkbox', defaultValue: false },
];



export const QuaryBuilderForm = ({query, setQuery}:any) => {
//   const [query, setQuery] = useState(initialQuery);
//   console.log(query)


  return (
    <div className='w-[600px]'>
      <QueryBuilder  fields={fields} query={query} onQueryChange={q => setQuery(q)}/>

     
    </div>
  );
};