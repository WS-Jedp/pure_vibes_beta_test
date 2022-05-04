import React, { useEffect, useState } from 'react';
import { FaPlusCircle, FaPenAlt, FaTrash } from 'react-icons/fa';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';
import Modal from '@/Components/Modal';
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { QuestionAnswerType } from '../../Container/QuestionAnswerType'
import { getQuestionAnswerData } from '../../Utils/graphDataMethods'
import CreateSurvey from './form/CreateSurvey';
import ToastAlert from '@/Components/Toast';
import EditSurvey from './form/EditSurvey';

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

    const [form, setForm] = useState({...initForm})
    const [formError, setFormError] = useState({
        name: false,
        questions: [ false ]
    })

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

    const createSurvey = async () => {
        if (validateForm(form)) {
            await ToastAlert(
                "",
                "promise",
                axios.post("http://127.0.0.1:8000/api/surveys", form, {
                    headers: {Authorization: "Bearer 5|7XuZ6As7kewgT1PTDKEY6DoMzAgKxhjyP6AZBGuh"}
                })
                    .then(({ data }) => {
                        if (data.ok) {
                            setShowModal(false);
                            window.location.href = `/survey/${data.data.id}`
                            // setForm({...initForm})
                        } else throw new Error("Data invalid")
                    }),
                "Successful registration",
                "Error while registering, check the data"
            )
        } else {
            ToastAlert("Enter the data correctly", "warning")
        }
        // setSentForm(false)
    }

    const updateSurvey = async () => {
        if (validateForm(curretSurvey)) {
            console.log(curretSurvey, " send");
            await ToastAlert(
                "",
                "promise",
                axios.put(`http://127.0.0.1:8000/api/surveys/${curretSurvey.id}`, curretSurvey, {
                    headers: {Authorization: "Bearer 5|7XuZ6As7kewgT1PTDKEY6DoMzAgKxhjyP6AZBGuh"}
                })
                    .then(({ data }) => {
                        // alert(data.ok);
                        if (data.ok) {
                            setShowModalEdit(false);
                            window.location.reload();
                        } else throw new Error("Data invalid")
                    }),
                "Successful registration",
                "Error while registering, check the data"
            )
        } else {
            ToastAlert("Enter the data correctly", "warning")
        }
    }

    const deleteSurvey = async (item) => {
        await ToastAlert(
            "",
            "promise",
            axios.delete(`http://127.0.0.1:8000/api/surveys/${item.id}`, {
                headers: {Authorization: "Bearer 6|bo99qmUO88ObvhMs1JEmKWLpGDh5lLDtDH2pAw1f"}
            })
                .then(({ data }) => {
                    if (data.ok) window.location.href = "/survey"
                    else throw new Error("Error deleting try again later");
                }).catch(e=>console.log(e, " wwww")),
            "Successful removal",
            "Error deleting try again later"
        )
    }

    const validateForm = (item) => {
        let isSuccess = true;

        if (item.name === "") {
            formError.name = true
            isSuccess = false;
        } else formError.name = false

        item.questions.forEach((quest, i) => {
            if (quest.question === "") {
                formError.questions[i] = true
                isSuccess = false;
            } else formError.questions[i] = false
        });

        setFormError({ ...formError })
        return isSuccess;
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <div className="flex">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight border-r-2 pr-4">
                        {survey.name}
                    </h2>
                    <FaPenAlt type="button" onClick={() => {
                        setCurretSurvey({...survey})
                        setShowModalEdit(true)
                    }} size={20} className="ml-4 cursor-pointer text-cyan-500" />
                    <FaTrash type="button" onClick={() =>{
                        deleteSurvey(survey)
                    }} size={20} className="ml-4 cursor-pointer text-red-500" />
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
                    <div className="w-[100%] flex justify-between">
                        <h3 className='font-bold text-xl mb-2'>All Surveys</h3>
                        <FaPlusCircle type="button" onClick={() => setShowModalCreate(true)} size={30} className="cursor-pointer hover:text-purple-400" />
                    </div>
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
            <Modal
                title="Create a new survey"
                nameSave="Create"
                showModal={showModalCreate}
                setShowModal={setShowModalCreate}
                onSave={() => createSurvey()}
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
                nameSave="Save"
                showModal={showModalEdit}
                setShowModal={setShowModalEdit}
                onSave={() => updateSurvey()}
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
