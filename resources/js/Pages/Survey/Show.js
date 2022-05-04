import React, { useEffect, useState } from 'react';
import { FaPenAlt, FaTrash, FaListUl } from 'react-icons/fa';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import Modal from '@/Components/Modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SidebarSurveys from '@/Components/SidebarSurveys';

import { QuestionAnswerType } from '../../Container/QuestionAnswerType'
import { getQuestionAnswerData } from '../../Utils/graphDataMethods'
import CreateSurvey from './form/CreateSurvey';
import EditSurvey from './form/EditSurvey';
import CreateQuestion from './form/CreateQuestion';
import {createSurvey, updateSurvey, deleteSurvey  } from "./Services"

export default function Show(props) {
    const initForm = {
        name: "",
        questions: [
            {
                id: 1,
                type: "BOOLEAN",
                question: ""
            }
        ]
    }

    const { survey, allSurveys } = props
    const [questionsData, setQuestionsData] = useState([])
    const [curretSurvey, setCurretSurvey] = React.useState({...initForm, id:0});
    const [showModalCreate, setShowModalCreate] = React.useState(false);
    const [showModalEdit, setShowModalEdit] = React.useState(false);
    const [showSurveyList, setShowSurveyList] = useState(false);

    const [form, setForm] = useState({...initForm})

    const [formError, setFormError] = useState({
        name: false,
        questions: [ false ]
    })

    const toggleSurveyList = () => {
        setShowSurveyList(!showSurveyList)
    }

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
            header={
                <div className="relative flex justify-between md:justify-start">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight border-r-2 pr-4">
                        {survey.name}
                    </h2>

                    <div className="flex">
                        <FaPenAlt type="button" onClick={() => {
                            setCurretSurvey({...survey, questions: [...survey.questions]})
                            setShowModalEdit(true)
                        }} size={20} className="ml-4 cursor-pointer text-cyan-500" />
                        <FaTrash type="button" onClick={() =>{
                            deleteSurvey(survey)
                        }} size={20} className="ml-4 cursor-pointer text-red-500" />
                    </div>

                    <div className="md:hidden">
                        <FaListUl type="button" onClick={() =>{ toggleSurveyList() }} size={25} className="ml-4 cursor-pointer" />
                    </div>

                    {
                        showSurveyList && (
                            <SidebarSurveys
                                title="All surveys"
                                allSurveys={allSurveys}
                                currSurvey={survey}
                                setShowModalCreate={() => setShowModalCreate(true)}
                                isMini={true}
                            />
                        )
                    }
                </div>

            }
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
                                    first:mt-0 mt-3 rounded-md p-9
                                '>
                                    <h2 className='font-bold text-2xl'>Question #{questionData.question.id}</h2>
                                    <p className='font-regular text-base'>{questionData.question.question}</p>

                                    <div>
                                        <QuestionAnswerType type={questionData.question.type} data={questionData.answersGraphData}></QuestionAnswerType>
                                    </div>
                                </div>
                        ))
                    }

                    <CreateQuestion surveyId={survey.id}/>

                </article>

                <SidebarSurveys
                    title="All surveys"
                    allSurveys={allSurveys}
                    currSurvey={survey}
                    setShowModalCreate={() => setShowModalCreate(true)}
                />

            </section>
            <Modal
                title="Create a new survey"
                nameSave="Create"
                showModal={showModalCreate}
                setShowModal={setShowModalCreate}
                onSave={() => createSurvey(form, formError, setFormError)}
            >
                <CreateSurvey
                    form={form}
                    setForm={setForm}
                    formError={formError}
                    setFormError={setFormError}
                    initForm={initForm}
                />
            </Modal>
            <Modal
                title="Edit survey"
                message="When you save the changes you will not be able to revert them"
                messageColor="text-yellow-500"
                nameSave="Save"
                showModal={showModalEdit}
                setShowModal={setShowModalEdit}
                onSave={() => updateSurvey(curretSurvey, formError, setFormError)}
            >
                <EditSurvey
                    form={curretSurvey}
                    setForm={setCurretSurvey}
                    formError={formError}
                    setFormError={setFormError}
                    initForm={initForm}
                />
            </Modal>
            <ToastContainer />
        </Authenticated>
    );
}
