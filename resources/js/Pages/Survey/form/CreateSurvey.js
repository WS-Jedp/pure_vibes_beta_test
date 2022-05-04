import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

import { QuestionAnswerType } from '../../../Container/QuestionAnswerType'
import { getQuestionAnswerData } from '../../../Utils/graphDataMethods'

export default function CreateSurvey({form, setForm, initForm, formError, setFormError}) {

    // const [form, setForm] = useState({...initForm})

    const onInputNameChange = ({ name, value }) => {
        setForm({...form, [name]: value})
    }

    const onInputQuestionsChange = ({ name, value }, index) => {
        form.questions[index] = { ...form.questions[index], [name]: value };
        setForm({ ...form })
    }

    const addQuestion = () => {
        form.questions.push({...initForm.questions[0]});
        formError.questions.push(false);
        setForm({...form})
        setFormError({...formError})
    }

    const delQuestion = (index) => {
        form.questions.splice(index, 1);
        formError.questions.splice(index, 1);
        setForm({...form})
        setFormError({...formError})
    }

    return (
            <div className='w-full shadow-sm
                    flex flex-col items-start justify-start
                    rounded-md'>
                        {/* <h4 className='font-bold text-xl'>Create a new question</h4> */}
                        <form className='w-full relative'>
                            <div className='mb-6'>
                                <label htmlFor='question' className='my-2 w-full'>
                                    <p className={`font-bold ${formError.name?'text-red-500':''}`}>
                                        Survey name
                                    </p>
                                    <input name="name" value={form.name} onChange={({target})=>onInputNameChange(target)} className='w-full' id="question" type="text" placeholder='Write the new question..'></input>
                                </label>
                            </div>
                            {
                                form.questions.map((quest, i) => (
                                    <div className='mt-5' key={i}>
                                        {
                                            form.questions.length > 1 && (
                                                <FaMinusCircle type="button" onClick={() => delQuestion(i)} size={20} className="cursor-pointer text-red-500" />
                                            )
                                        }
                                        <label htmlFor='question' className='my-2 w-full'>
                                            <p className={`font-bold ${formError.questions[i]?'text-red-500':''}`}>
                                                New Question #{i + 1}
                                            </p>
                                            <input name='question' value={quest.question || ""} onChange={({target})=>onInputQuestionsChange(target, i)} className='w-full' id="question" type="text" placeholder='Write the new question..'></input>
                                        </label>
                                        <label className='my-2'>
                                            <p className='font-bold'>
                                                Type Of Question
                                            </p>
                                            <select name='type' value={quest.type} onChange={({target})=>onInputQuestionsChange(target, i)}>
                                                <option value="BOOLEAN"  selected>Boolean (Yes/No)</option>
                                                <option value="RATE" >Rate</option>
                                                <option value="TEXT" >Text</option>
                                            </select>
                                        </label>
                                    </div>
                            ))
                            }
                            <div className="flex justify-center">
                                {/* <button type='submit' className='relativie flex items-center p-3 rounded-xl my-4 shadow-md text-white justify-center bg-gradient-to-r from-purple-400 to-cyan-300
                                    duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl
                                '>Create</button> */}
                                <FaPlusCircle type="button" onClick={() => addQuestion()} size={30} className="cursor-pointer my-5 hover:text-purple-400" />
                            </div>
                        </form>
                    </div>
    );
}
