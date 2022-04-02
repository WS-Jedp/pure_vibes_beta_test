import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';
import { QuestionAnswerType } from '../../Container/QuestionAnswerType'
import { getQuestionAnswerData } from '../../Utils/graphDataMethods'


export default function Show(props) {

    const { survey, allSurveys } = props

    const [questionsData, setQuestionsData] = useState([])

    console.log(allSurveys, survey)

    useEffect(() => {
        let allQuestions = []
        survey.questions.forEach(question => {
            const answersFromQuestion = survey.results.map(result => 
                result.answers.find(answer => answer.question_id == question.id))

            const answersGraphData = getQuestionAnswerData(answersFromQuestion.filter(answer => answer), question.type)

            allQuestions.push({question, answersGraphData})
        })
        setQuestionsData(allQuestions)
    }, [])
    
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{survey.name}</h2>}
        >
            <Head title={survey.name} />

            <section className="relative w-full mx-auto max-w-6xl p-3 md:p-9
            flex flex-row items-start justify-around flex-wrap
            bg-gray-200 shadow-lg my-6">

                <article className='relative w-full md:w-8/12 m-2 shadow-md mt-9 
                    flex flex-col items-start justify-start rounded-md
                '>
                    {
                        questionsData.map(questionData => (
                                <div className='w-full bg-white shadow divider-y flex flex-col items-start justify-start
                                    first:mt-0 mt-3 flex flex-col items-start justify-start rounded-md p-9
                                '>
                                    <h2 className='font-bold text-2xl'>Question #{questionData.question.id}</h2>
                                    <p className='font-regular text-base'>{questionData.question.question}</p>

                                    <div>
                                        <QuestionAnswerType type={questionData.question.type} data={questionData.answersGraphData}></QuestionAnswerType>
                                    </div>
                                </div>
                        ))
                    }

                    <div className='w-full shadow-sm mt-6
                    flex flex-col items-start justify-start
                    rounded-md p-9'>
                        <h4 className='font-bold text-xl'>Create a new question</h4>
                        <form className='w-full relative'>
                            <label htmlFor='question' className='my-2 w-full'>
                                <p className='font-bold'>
                                    New Question
                                </p>
                                <input className='w-full' id="question" type="text" placeholder='Write the new question..'></input>
                            </label>
                            <label className='my-2'>
                                <p className='font-bold'>
                                    Type Of Question
                                </p>
                                <select>
                                    <option value="BOOLEAN"  selected>Boolean (Yes/No)</option>
                                    <option value="RATE" >Rate</option>
                                    <option value="TEXT" >Text</option>
                                </select>
                            </label>
                            <button type='submit' className='relativie flex items-center p-3 rounded-xl my-4 shadow-md text-white justify-center bg-gradient-to-r from-purple-400 to-cyan-300
                                duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl
                            '>Create question</button>
                        </form>
                    </div>
                </article>


                <sidebar className="sticky mt-9 top-0 right-0 w-3/12 m-2 bg-white hidden md:flex flex-col items-start content-start 
                    p-9 rounded-lg shadow-md min-h-[300px]
                ">
                    <h3 className='font-bold text-xl mb-2'>All Surveys</h3>
                    <ol className='list-disc'>
                        {
                            allSurveys.map(currSurvey => (
                                survey.id === currSurvey.id ? (
                                        <li className='first:mt-0 hover:cursor-default mt-3 underline font-bold text-slate-300'>{currSurvey.name}</li>
                                    ) : (
                                        <Link href={(route('survey.show', currSurvey.id))}>
                                            <li className="mt-3 ease-in-out duration-100 hover:translate-x-2 hover:text-purple-400" >{currSurvey.name}</li>
                                        </Link>
                                    )
                            ))
                        }
                    </ol>
                </sidebar>
               
            </section>

        </Authenticated>
    );
}
