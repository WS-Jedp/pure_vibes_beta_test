import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';

export default function Results(props) {

    const { results } = props

    const TOTAL_OF_SURVEYS = 6

    const [usersWithSurveyDone, setUsersWithSurveyDone] = useState([])
    const [usersWithSurveyUnfinished, setUsersWithSurveyUnfinished] = useState([])
    const [usersWithSurveyNotStarted, setUsersWithSurveyNotStarted] = useState([])

    console.log(results)

    useEffect(() => {
        const done = []
        const notFinished = []
        const notStarted = []

        results.forEach(result => {
            let userObj = {
                id: result.id,
                name: result.name,
                email: result.email,
                amountOfResults: result.results.length
            }

            if(userObj.amountOfResults > 0 && userObj.amountOfResults < TOTAL_OF_SURVEYS) notFinished.push(userObj)
            if(userObj.amountOfResults == 0) notStarted.push(userObj)
            if(userObj.amountOfResults > TOTAL_OF_SURVEYS) done.push(userObj)

            setUsersWithSurveyDone(done)
            setUsersWithSurveyUnfinished(notFinished)
            setUsersWithSurveyNotStarted(notStarted)

        })
    }, [])

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Results</h2>}
        >
            <Head title="Surveys" />

            <section className='
                w-100 max-w-9xl flex flex-col items-start justify-start bg-slate-100 shadow-sm
                p-3 md:p-9
            '>
                <article className='
                    w-full p-3 rounded-md shadow-md divide-y my-3 bg-gray-100
                '>
                    <h3 className='font-bold text-3xl my-3'>User that finish the survey</h3>
                    <div className='flex flex-row items-start justify-start w-full p-6 flex-nowrap
                        overflow-x-auto
                    '>
                        {
                            usersWithSurveyDone.length > 0 ? usersWithSurveyDone.map(user => (
                                <article key={user.id} className='group bg-white shadow-lg first:mx-0 mx-3 min-w-[180px] w-1/5 max-w-[270px]
                                    min-h-[90px] flex flex-col items-start justify-start p-6 rounded-md
                                    ease-in-out duration-500
                                    hover:scale-[1.03] hover:shadowo-xl hover:bg-gradient-to-r hover:from-purple-300 hover:to-purple-500 hover:cursor-pointer
                                '>
                                    <h3 className='group-hover:text-white font-bold mb-3 divide-y'>{user.name}</h3>
                                    <small className='font-bold group-hover:text-white'>{user.email}</small>
                                </article>
                            )) : (
                                <p>There is no users that already finish the survey</p>
                            )
                        }
                    </div>
                </article>
                <article className='
                    w-full p-3 rounded-md shadow-md divide-y my-3 bg-gray-100
                '>
                    <h3 className='font-bold text-3xl my-3'>User that aren't finish the survey yet</h3>
                    <div className='flex flex-row items-start justify-start w-full p-6 flex-nowrap
                        overflow-x-auto
                    '>
                        {
                            usersWithSurveyUnfinished.length > 0 ? usersWithSurveyUnfinished.map(user => (
                                <a href={`/results/${user.id}`} key={user.id} className='group bg-white shadow-lg first:mx-0 mx-3 min-w-[180px] w-1/5 max-w-[270px]
                                    min-h-[90px] flex flex-col items-start justify-start p-6 rounded-md
                                    ease-in-out duration-500
                                    hover:scale-[1.03] hover:shadowo-xl hover:bg-gradient-to-r hover:from-purple-300 hover:to-purple-500 hover:cursor-pointer
                                '>
                                    <h3 className='group-hover:text-white font-bold mb-3 divide-y'>{user.name}</h3>
                                    <small className='font-bold group-hover:text-white'>{user.email}</small>
                                    <p className='text-sm group-hover:text-white'>Surveys done: {user.amountOfResults}/{TOTAL_OF_SURVEYS}</p>
                                </a>
                            )) : (
                                <p>We can't find users</p>
                            )
                        }
                    </div>
                </article>
                <article className='
                    w-full p-3 rounded-md shadow-md divide-y my-3 bg-gray-100
                '>
                    <h3 className='font-bold text-3xl my-3'>User that aren't started the survey yet</h3>
                    <div className='flex flex-row items-start justify-start w-full p-6 flex-nowrap
                        overflow-x-auto
                    '>
                        {
                            usersWithSurveyNotStarted.length > 0 ? usersWithSurveyNotStarted.map(user => (
                                <article className='group bg-white shadow-lg first:mx-0 mx-3 min-w-[180px] w-1/5 max-w-[270px]
                                    min-h-[90px] flex flex-col items-start justify-start p-6 rounded-md
                                    ease-in-out duration-500
                                    hover:scale-[1.03] hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-300 hover:to-purple-500 hover:cursor-pointer
                                '>
                                    <h3 className='group-hover:text-white font-bold mb-3 divide-y'>{user.name}</h3>
                                    <small className='font-bold group-hover:text-white'>{user.email}</small>
                                </article>
                            )) : (
                                <p>We can't find users</p>
                            )
                        }
                    </div>
                </article>
            </section>

        </Authenticated>
    );
}
