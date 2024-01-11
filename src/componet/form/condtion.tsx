'use client'
import React from 'react';
import { Formik, Field, Form, FieldArray, useFormikContext, FormikProps } from 'formik';
import { PlusIcon,TrashIcon } from '@heroicons/react/16/solid';

interface Condition {
  field: string;
  operator: string;
  value: string;
}

interface GroupedCondition {
  conditions: Condition[];
  operator: 'AND' | 'OR';
}

interface QueryBuilderFormValues {
  groupedConditions: GroupedCondition[];
}

const ConditionInput: React.FC<{ conditionIndex: number }> = ({ conditionIndex }) => {
  const { values } = useFormikContext<QueryBuilderFormValues>();

  return (
    <div className='w-full space-x-2 px-2 my-2'>
      <Field type="text" className='border' name={`groupedConditions[${conditionIndex}].field`} placeholder="Field" classNamw='w-full border ' />
      <Field type="text" className='border' name={`groupedConditions[${conditionIndex}].operator`} as="select">
        <option value="AND">AND</option>
        <option value="OR">OR</option>
      </Field>
      <Field className='border' type="text" name={`groupedConditions[${conditionIndex}].value`} placeholder="Value" />
    </div>
  );
};

const QueryBuilder: React.FC = () => {
    return (
      <Formik
        initialValues={{ groupedConditions: [{ conditions: [], operator: 'AND' }] }}
        onSubmit={(values) => {
          console.log('Generated Query:', values);
        }}
      >
        {({ values }: FormikProps<QueryBuilderFormValues>) => (
          <Form>
            <FieldArray name="groupedConditions">
              {({ push, remove }) => (
                <div>
                  {values.groupedConditions.map((groupedCondition, groupIndex) => (

                    <div key={groupIndex} className='w-full flex flex-col '>
                        {groupIndex ==0 &&
                        <div> <button
                        className='flex items-center justify-center'
                          type="button"
                          onClick={() =>
                            push({ conditions: [], operator: 'AND' })
                          }
                        >
                          <PlusIcon className='w-5 h-5 text-blue-500' /> 
                          <p>Create group</p>
                        </button>  </div>}
                        <div className='border my-4'>
                      <div className='flex justify-between px-2 w-[400px] pt-4'>
                        <Field type="text" className='flex w-1/2 border' name={`groupedConditions[${groupIndex}].operator`} as="select">
                          <option value="AND">AND</option>
                          <option value="OR">OR</option>
                        </Field>
  
                       
  
                        <button
                          type="button"
                          onClick={() => remove(groupIndex)}
                        >
                          <TrashIcon className='w-5 h-5 text-red-500' />
                        </button>
                      </div>
                      <div>
                        <FieldArray name={`groupedConditions.${groupIndex}.conditions`}>
                          {({ push: pushCondition, remove: removeCondition }) => (
                            <div>
                                 <button
                                type="button"
                                className='flex items-center border rounded pl-2 pt-2'
                                onClick={() => pushCondition({ field: '', operator: '', value: '' })}
                              >
                                <PlusIcon className='w-5 h-5 text-blue-500' />
                                <p>Multi condition</p>
                              </button>
                              {groupedCondition?.conditions?.map((_, conditionIndex) => (
                                <div key={conditionIndex} className='flex '>
                                  <ConditionInput conditionIndex={conditionIndex} />
                                  <button
                                    type="button"
                                    onClick={() => removeCondition(conditionIndex)}
                                  >
                                    <TrashIcon className='w-5 h-5 text-red-500' />
                                  </button>
                                </div>
                              ))}
                             
                            </div>
                          )}
                        </FieldArray>
                      </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>
  
            <button type="submit" className='bg-green-500 px-2 rounded text-white mt-5'>Generate Query</button>
          </Form>
        )}
      </Formik>
    );
  };
  
  export default QueryBuilder;