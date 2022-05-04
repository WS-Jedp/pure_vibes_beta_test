import React, { useEffect, useState } from 'react';
import { FaPlusCircle, FaPenAlt, FaTrash, FaListUl } from 'react-icons/fa';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';
import Modal from '@/Components/Modal';
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

import { QuestionAnswerType } from '../../Container/QuestionAnswerType'
import { getQuestionAnswerData } from '../../Utils/graphDataMethods'
import ToastAlert from '@/Components/Toast';

export default function ShowByUser(props) {

    const { allSurveys, user } = props
    const [surveySeleted, setSurveySelected] = useState({allAnswers:[]});
    const [showSurveyList, setShowSurveyList] = useState(false);

    const toggleSurveyList = () => {
        setShowSurveyList(!showSurveyList)
    }


    useEffect(() => {
        if(allSurveys.length > 0) setSurveySelected({...allSurveys[0]})
    },[])

    console.log(user);
    console.log(surveySeleted);
    // console.log(allSurveys);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <div className="relative flex justify-between md:justify-start">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight border-r-2 pr-4">
                        {user.name}
                    </h2>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight pl-4">{surveySeleted.surveyName}</h2>
                    {/* <FaPenAlt type="button" onClick={() => {
                        setCurretSurvey({...survey, questions: [...survey.questions]})
                        setShowModalEdit(true)
                    }} size={20} className="ml-4 cursor-pointer text-cyan-500" />
                     */}
                    <div>
                        <FaListUl type="button" onClick={() =>{ toggleSurveyList() }} size={25} className="ml-4 cursor-pointer md:hidden" />
                    </div>

                    {
                        showSurveyList && (
                        <sidebar className="absolute z-10 mt-9 top-0 m-2 bg-white  md:hidden flex-col items-start content-start
                            p-9 rounded-lg shadow-md min-h-[300px]
                        ">
                            <div className="w-[100%] flex justify-between">
                                <h3 className='font-bold text-xl mb-2'>Answered surveys</h3>
                            </div>
                            <ol className='list-disc'>
                                {
                                    allSurveys.map(currSurvey => (
                                        surveySeleted.surveyId === currSurvey.surveyId ? (
                                                <li className='first:mt-0 hover:cursor-default mt-3 underline font-bold text-slate-300'>{currSurvey.surveyName}</li>
                                            ) : (
                                                <li onClick={() => {
                                                    setSurveySelected({ ...currSurvey })
                                                    toggleSurveyList()
                                                    }} className="cursor-pointer mt-3 ease-in-out duration-100 hover:translate-x-2 hover:text-purple-400" >{currSurvey.surveyName}</li>
                                            )
                                    ))
                                }
                            </ol>
                        </sidebar>
                        )
                    }
                </div>

            }
        >
            <Head title={user.name} />

            <section className="relative w-full mx-auto max-w-6xl p-3 md:p-9
            flex flex-row items-start justify-around flex-wrap
            bg-gray-200 shadow-lg my-6">

                <article className='relative w-full md:w-8/12 m-2 shadow-md mt-9
                    flex flex-col items-start justify-start rounded-md
                '>
                    {
                        surveySeleted.allAnswers.map((answers, i) => (
                                <div className='w-full bg-white shadow divider-y flex flex-col items-start justify-start
                                    first:mt-0 mt-3 flex flex-col items-start justify-start rounded-md p-9
                                '>
                                    <h2 className='font-bold text-2xl mb-4'>Answers #{i+1}</h2>

                                    {
                                        answers.map((answer, i) => (
                                            <div className='w-full bg-white shadow divider-y p-4 mb-5'>
                                                <p className='font-bold text-base mb-3'>{answer.question}</p>

                                                <div>
                                                    <p>{answer.text}</p>
                                                    {/* <QuestionAnswerType type={answer.question.type} data={answer.answersGraphData}></QuestionAnswerType> */}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                        ))
                    }
                </article>


                <sidebar className="sticky mt-9 top-0 right-0 w-3/12 m-2 bg-white hidden md:flex flex-col items-start content-start
                    p-9 rounded-lg shadow-md min-h-[300px]
                ">
                    <div className="w-[100%] flex justify-between">
                        <h3 className='font-bold text-xl mb-2'>Answered surveys</h3>
                    </div>
                    <ol className='list-disc'>
                        {
                            allSurveys.map(currSurvey => (
                                surveySeleted.surveyId === currSurvey.surveyId ? (
                                        <li className='first:mt-0 hover:cursor-default mt-3 underline font-bold text-slate-300'>{currSurvey.surveyName}</li>
                                    ) : (
                                            <li onClick={()=>setSurveySelected({...currSurvey})} className="cursor-pointer mt-3 ease-in-out duration-100 hover:translate-x-2 hover:text-purple-400" >{currSurvey.surveyName}</li>
                                    )
                            ))
                        }
                    </ol>
                </sidebar>

            </section>
        </Authenticated>
    );
}
