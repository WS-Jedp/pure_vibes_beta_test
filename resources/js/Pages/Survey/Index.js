import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';

export default function Survey(props) {

    const { surveys } = props

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Surveys</h2>}
        >
            <Head title="Surveys" />

            <section className="container mx-auto flex flex-row items-center content-center flex-wrap shadow-lg p-3 md:p-9 bg-slate-200">
                {
                    surveys.map(survey => (
                        <Link href={route('survey.show', survey.id)} key={survey.id}>
                            <article 
                                className='bg-white min-w-[270px] w-60 max-w-[270px] h-40 flex flex-col items-start content-center 
                                rounded-md shadow-lg p-3 md:p-6 ease-in-out duration-300 m-3
                                hover:cursor-pointer hover:scale-110'
                                >
                                <h2 className='font-bold text-base my-3'>
                                    { survey.name }
                                </h2>
                                <p>{survey.questions.length} Questions</p>
                            </article>
                        </Link>
                    ))
                }
            </section>

        </Authenticated>
    );
}
