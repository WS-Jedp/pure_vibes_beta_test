import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { Link } from '@inertiajs/inertia-react';
import 'react-toastify/dist/ReactToastify.css';

export default function SidebarSurveys({
    title,
    allSurveys,
    currSurvey,
    setShowModalCreate,
    isMini,
    isResult,
    setSurveySelected,
    toggleSurveyList
}) {

    const option = isMini ? 'absolute z-10 md:hidden' : 'sticky right-0 w-3/12 hidden md:flex'

    return (
        <sidebar className={`${option} mt-9 top-0 m-2 bg-white flex-col items-start content-start p-9 rounded-lg shadow-md min-h-[300px]`}>
            <div className="w-[100%] flex justify-between">
                <h3 className='font-bold text-xl mb-2'>{ title }</h3>
                {
                    setShowModalCreate && (
                        <FaPlusCircle type="button" onClick={() => setShowModalCreate()} size={30} className="cursor-pointer hover:text-purple-400" />
                    )
                }
            </div>
            <ol className='list-disc'>
                {
                    allSurveys.length > 0 ? allSurveys.map(survey => (
                        ((currSurvey.id || currSurvey.surveyId) === (survey.id || survey.surveyId)) ? (
                                <li className='first:mt-0 hover:cursor-default mt-3 underline font-bold text-slate-300'>{survey.name || survey.surveyName}</li>
                            ) : (
                                isResult ? (
                                    <li onClick={() => {
                                        setSurveySelected({ ...survey })
                                        toggleSurveyList()
                                        }} className="cursor-pointer mt-3 ease-in-out duration-100 hover:translate-x-2 hover:text-purple-400" >{survey.surveyName}
                                    </li>
                                ): (
                                    <Link href={(route('survey.show', survey.id))}>
                                        <li className="mt-3 ease-in-out duration-100 hover:translate-x-2 hover:text-purple-400" >{survey.name || survey.surveyName}</li>
                                    </Link>
                                )
                            )
                    )) :
                        (<p>You have no answered surveys</p>)
                }
            </ol>
        </sidebar>
    )
}
