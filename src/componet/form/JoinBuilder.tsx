'use client'
import React from 'react';
import { Formik, Field, Form, FieldArray, useFormikContext, FormikProps } from 'formik';
import { TrashIcon } from '@heroicons/react/16/solid';

import { useState } from 'react';
import {  QueryBuilder, RuleGroupType,formatQuery } from 'react-querybuilder';
import { QuaryBuilderForm } from './QuaryBuilderForm';

interface JoinCondition {
  table: string;
  on: string;
  alias: string;
  type: string;
}

interface QueryBuilderFormValues {
  tables: string[];
  joinConditions: JoinCondition[];
  selectedColumns: string[];
}

const initialQuery: RuleGroupType = {
    combinator: 'and',
    rules: [],
  };

const JoinConditionInput: React.FC<{ joinIndex: number }> = ({ joinIndex }) => {
    const { values } = useFormikContext<QueryBuilderFormValues>();

  return (
    <div className="flex flex-wrap my-2">
      <div className="w-full md:w-1/4 px-2">
        <label className="block text-sm font-medium text-gray-700">Table</label>
        <Field as="select" name={`joinConditions[${joinIndex}].table`} className="w-full border p-2">
          {values.tables.map((table) => (
            <option key={table} value={table}>
              {table}
            </option>
          ))}
        </Field>
      </div>
      <div className="w-full md:w-1/4 px-2">
        <label className="block text-sm font-medium text-gray-700">Alias</label>
        <Field type="text" name={`joinConditions[${joinIndex}].alias`} placeholder="Alias" className="w-full border p-2" />
      </div>
      <div className="w-full md:w-1/4 px-2">
        <label className="block text-sm font-medium text-gray-700">Join Type</label>
        <Field as="select" name={`joinConditions[${joinIndex}].type`} className="w-full border p-2">
          <option value="INNER JOIN">INNER JOIN</option>
          <option value="LEFT JOIN">LEFT JOIN</option>
          <option value="RIGHT JOIN">RIGHT JOIN</option>
          {/* Add more join types as needed */}
        </Field>
      </div>
      <div className="w-full md:w-1/4 px-2">
        <label className="block text-sm font-medium text-gray-700">ON</label>
        <Field type="text" name={`joinConditions[${joinIndex}].on`} placeholder="ON" className="w-full border p-2" />
      </div>
    </div>
  );
};

const JoinBuilder: React.FC = () => {
    const [query, setQuery] = useState(initialQuery);
    const [joinValue,setJoin]=useState<any>()
  return (
    <div className='flex flex-col'>
    <Formik<QueryBuilderFormValues>
      initialValues={{ tables: ['table1', 'table2'], joinConditions: [], selectedColumns: [] }}
      onSubmit={(values) => {
        // const query = `SELECT ${values.selectedColumns.join(', ')} FROM ${values.tables[0]} AS ${values.joinConditions[0].alias}
        //   ${values.joinConditions[0].type} ${values.tables[1]} AS ${values.joinConditions[1].alias} ON ${values.joinConditions[0].alias}.${values.joinConditions[0].on} = ${values.joinConditions[1].alias}.${values.joinConditions[1].on}`;
        console.log('Generated Query:', values);
        setJoin(values)
      }}
    >
      {(props: FormikProps<QueryBuilderFormValues>) => (
        <Form>
              <label className="block text-sm font-medium text-gray-700">Create Table:</label>
          <FieldArray name="tables">
            {({ push, remove }) => (
              <div className="flex flex-col  items-center mb-4">
                 <button type="button" onClick={() => push('new_table')} className="bg-blue-500 text-white px-4 py-2 rounded">
                  Add Table
                </button>
                {props.values.tables.map((table, index) => (
                  <div key={index} className="w-full  px-2 mb-2 flex    ">
                    <label className="flex items-center">
                      <Field type={"text"} name={`tables[${index}]`} className="mr-2 border h-10" />
                      {/* {table} */}
                    </label>
                    <button type="button" onClick={() => remove(index)} className="text-red-500 ml-2">
                      <TrashIcon className='w-5 h-5 text-red-500'/>
                    </button>
                  </div>
                ))}
               
              </div>
            )}
          </FieldArray>

          <FieldArray name="joinConditions">
            {({ push, remove }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700">Join Conditions:</label>
                {props.values.joinConditions.map((_, index) => (
                  <div key={index} className='flex'>
                    <JoinConditionInput joinIndex={index} />
                    <button type="button" onClick={() => remove(index)} className="text-red-500 ml-2">
                    <TrashIcon className='w-5 h-5 text-red-500'/>
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => push({ table: '', on: '', alias: '', type: 'INNER JOIN' })} className="bg-blue-500 text-white px-4 py-2 rounded">
                  Add Join Condition
                </button>
              </div>
            )}
          </FieldArray>
<div className='mt-5'>
          <FieldArray name="selectedColumns" >
            {({ push, remove }) => (
              <div className="flex flex-col  mb-4">
                {props.values.selectedColumns.map((column, index) => (
                  <div key={index} className="w-full flex   md:w-1/3 px-2 mb-2">
                    <label className="flex items-center">
                      <Field type="text" name={`selectedColumns[${index}]`} className="mr-2 border h-10" />
                    
                    </label>
                    <button type="button" onClick={() => remove(index)} className="text-red-500 ml-2">
                      Remove
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => push('new_column')} className="bg-blue-500 text-white px-4 w-[200px] py-2 rounded">
                  Add Column
                </button>
              </div>
            )}
          </FieldArray>
          </div>

            <QuaryBuilderForm query={query}  setQuery={setQuery}/>
          <button type="submit" className="bg-green-500 mt-5 text-white px-4 py-2 rounded">
            Generate Query
          </button>
        </Form>
      )}
    </Formik>
{joinValue&& 
<>
    <h4 className='mt-10'>Query</h4>

      <pre>
        <code>{formatQuery(query, 'json')}</code>
        <code>{formatQuery(joinValue, 'json')}</code>
      </pre>
      </>}
    </div>
  );
};

export default JoinBuilder;
