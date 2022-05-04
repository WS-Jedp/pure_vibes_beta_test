import React, { useEffect, useState } from 'react';
import { FaListUl } from 'react-icons/fa';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import 'react-toastify/dist/ReactToastify.css';
import SidebarSurveys from '@/Components/SidebarSurveys';

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
                    <div>
                        <FaListUl type="button" onClick={() =>{ toggleSurveyList() }} size={25} className="ml-4 cursor-pointer md:hidden" />
                    </div>

                    {
                        showSurveyList && (
                            <SidebarSurveys
                                title="Answered surveys"
                                allSurveys={allSurveys}
                                currSurvey={surveySeleted}
                                isMini={true}
                                isResult={true}
                                setSurveySelected={(item)=>setSurveySelected({ ...item })}
                                toggleSurveyList={()=>toggleSurveyList()}
                            />
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
                                <div className='w-full bg-white shadow divider-y items-start justify-start
                                    first:mt-0 mt-3 flex flex-col rounded-md p-9
                                '>
                                    <h2 className='font-bold text-2xl mb-4'>Answers #{i+1}</h2>

                                    {
                                        answers.map((answer, i) => (
                                            <div className='w-full bg-white shadow divider-y p-4 mb-5'>
                                                <p className='font-bold text-base mb-3'>{answer.question}</p>
                                                <div>
                                                    <p>{answer.text}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                        ))
                    }
                </article>

                <SidebarSurveys
                    title="Answered surveys"
                    allSurveys={allSurveys}
                    currSurvey={surveySeleted}
                    isResult={true}
                    setSurveySelected={(item)=>setSurveySelected({ ...item })}
                    toggleSurveyList={()=>toggleSurveyList()}
                />
            </section>
        </Authenticated>
    );
}
