import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';

export default function Results(props) {

    const { results } = props

    console.log(results)

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Results</h2>}
        >
            <Head title="Surveys" />

            {
                results.map(result => (
                    <div className="py-12" key={result.id}>
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 bg-white border-b border-gray-200">
                                    <h3>Results By: {result.email}</h3>

                                    {
                                        result.results.length > 0 && result.results.map(results => (
                                            <div>
                                                <strong>Results of survey {results.survey_id}</strong>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </Authenticated>
    );
}
