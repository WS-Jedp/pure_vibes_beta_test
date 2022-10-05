import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { SurveyResponseStatus } from '@/constants/surveyResponseStatus';
import CardUser from './components/CardUser';

export default function Results(props) {

    const { results } = props

    const TOTAL_OF_SURVEYS = 6

    const [usersWithSurveyDone, setUsersWithSurveyDone] = useState([])
    const [usersWithSurveyUnfinished, setUsersWithSurveyUnfinished] = useState([])
    const [usersWithSurveyNotStarted, setUsersWithSurveyNotStarted] = useState([])

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
            if(userObj.amountOfResults == TOTAL_OF_SURVEYS) done.push(userObj)

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
                <CardUser
                    users={usersWithSurveyDone}
                    title={"User that finish the survey"}
                    titleNoContent={"There is no users that already finish the survey"}
                    responseStatus={SurveyResponseStatus.DONE}
                />
                <CardUser
                    users={usersWithSurveyUnfinished}
                    title={"User that finish the survey"}
                    titleNoContent={"We can't find users"}
                    responseStatus={SurveyResponseStatus.NOT_FINISHED}
                    TOTAL_OF_SURVEYS={TOTAL_OF_SURVEYS}
                />
                <CardUser
                    users={usersWithSurveyNotStarted}
                    title={"User that aren't started the survey yet"}
                    titleNoContent={"We can't find users"}
                    responseStatus={SurveyResponseStatus.NOT_STARTED}
                />
            </section>

        </Authenticated>
    );
}
