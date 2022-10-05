import { SurveyResponseStatus } from '@/constants/surveyResponseStatus';
import React from 'react';

export default function CardUser({ users, responseStatus, title, titleNoContent, TOTAL_OF_SURVEYS }) {
    const color = responseStatus === SurveyResponseStatus.DONE ? "sky" : responseStatus === SurveyResponseStatus.NOT_FINISHED ? "purple" : "pink"
    // const color = "purple";
    return (
        <article className='
            w-full p-3 rounded-md shadow-md divide-y my-3 bg-gray-100
        '>
            <h3 className='font-bold text-3xl my-3'>{ title}</h3>
            <div className='flex flex-row items-start justify-start w-full p-6 flex-nowrap
                overflow-x-auto
            '>
                {
                    users.length > 0 ? users.map(user => (
                        <a href={`/results/${user.id}`} key={user.id} className={`group bg-white shadow-lg first:mx-0 mx-3 min-w-[180px] w-1/5 max-w-[270px]
                            min-h-[90px] flex flex-col items-start justify-start p-6 rounded-md
                            ease-in-out duration-500
                            hover:scale-[1.03] hover:shadowo-xl hover:bg-gradient-to-r hover:from-${color}-300 hover:to-${color}-500 hover:cursor-pointer
                        `}>
                            <h3 className='group-hover:text-white font-bold mb-3 divide-y'>{user.name}</h3>
                            <small className='font-bold group-hover:text-white'>{user.email}</small>
                            {
                                responseStatus === SurveyResponseStatus.NOT_FINISHED && (
                                    <p className='text-sm group-hover:text-white'>Surveys done: {user.amountOfResults}/{TOTAL_OF_SURVEYS}</p>
                               )
                            }
                        </a>
                    )) : (
                            <p>{ titleNoContent }</p>
                    )
                }
            </div>
        </article>
    );
}
