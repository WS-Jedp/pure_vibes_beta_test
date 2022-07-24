import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from '@inertiajs/inertia-react'
import {addQuestion} from "../Services"

export default function ({surveyId}) {

    const initFormQuestion = {
        type: "BOOLEAN",
        question: ""
    }

    const [formQuestion, setFormQuestion] = useState({ ...initFormQuestion })

    const [formQuestionError, setFormQuestionError] = useState({
        type: false,
        question: false
    })

    const onInputChange = ({ name, value }) => {
        setFormQuestion({...formQuestion, [name]: value})
    }

    return (
        <div className='w-full shadow-sm mt-6
            flex flex-col items-start justify-start
            rounded-md p-9'>
            <h4 className='font-bold text-xl'>Create a new question</h4>
            <form className='w-full relative'>
                <label htmlFor='question' className='my-2 w-full'>
                    <p className={`font-bold ${formQuestionError.question?'text-red-500':''}`}>
                        New Question
                    </p>
                    <input name='question' value={formQuestion.question} onChange={({target})=>onInputChange(target)} id="question" type="text" placeholder='Write the new question..'></input>
                </label>
                <label className='my-2'>
                    <p className={`font-bold ${formQuestionError.type?'text-red-500':''}`}>
                        Type Of Question
                    </p>
                    <select name='type' value={formQuestion.type} onChange={({target})=>onInputChange(target)}>
                        <option value="BOOLEAN"  selected>Boolean (Yes/No)</option>
                        <option value="RATE" >Rate</option>
                        <option value="TEXT" >Text</option>
                    </select>
                </label>
                <button onClick={()=>addQuestion(formQuestion, formQuestionError, setFormQuestionError, surveyId, )} type='button' className='relativie flex items-center p-3 rounded-xl my-4 shadow-md text-white justify-center bg-gradient-to-r from-purple-400 to-cyan-300
                    duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl
                '>Create question</button>
            </form>
        </div>
    )
}
