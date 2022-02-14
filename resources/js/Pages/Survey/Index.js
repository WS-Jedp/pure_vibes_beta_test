import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';

export default function Survey(props) {

    const { surveys } = props
    
    console.log(surveys)

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Surveys</h2>}
        >
            <Head title="Surveys" />

            {
                surveys.map(survey => (
                    <div className="py-12" key={survey.id}>
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 bg-white border-b border-gray-200">
                                    <h2>Survey: { survey.name }</h2>
                                </div>

                                <article>

                                    {
                                        survey.questions.map(question => (
                                            <div>
                                                <h4>Question #{question.id}</h4>
                                                <p>{question.question} - {question.type}</p>
                                            </div>
                                        ))
                                    }

                                </article>
                            </div>
                        </div>
                    </div>
                ))
            }
        </Authenticated>
    );
}
