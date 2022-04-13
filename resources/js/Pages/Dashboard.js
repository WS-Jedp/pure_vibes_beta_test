import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';

export default function Dashboard(props) {
    const { admins, invited, testers } = props

    console.log(props)

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All Users</h2>}
        >
            <Head title="Users" />


            <section className='
                w-full max-w-5xl bg-white mx-auto rounded-md shadow-md p-3
                flex flex-col items-start justify-start m-3
            '>

                <article className='w-full flex flex-col items-start justify-start p-4'>
                    <h2 className='font-bold text-xl'>
                        Admins
                    </h2>
                    <div className='relative bg-white min-w-full min-h-[90px] h-auto py-3
                        w-full flex flex-row flex-nowrap items-start justify-start overflow-x-auto

                    '>
                        {
                            admins.length > 0 ? admins.map(user => (

                                <article className='bg-white shadow-xl rounded-lg p-3 flex flex-col group
                                items-start justify-start min-w-[210px] w-md max-w-[300px]
                                mr-4 last:mr-0
                                duration-300 ease-in-out
                                hover:scale-[1.03] hover:bg-gradient-to-r hover:from-sky-300 hover:to-sky-600 hover:cursor-pointer
                                '>

                                    <h3 className="text-md text-black font-medium group-hover:text-white">
                                        { user.name }
                                    </h3>
                                    <h2 className='group-hover:text-white font-medium text-md'>{ user.email }</h2>
                                    <small className='group-hover:text-white mt-2 font-extrabold text-sm'>{ user.role.name }</small>

                                </article>
                            )) : (
                                <p>There is no Admin users</p>
                            )
                        }
                    </div>
                </article>

                <article className='w-full flex flex-col items-start justify-start p-4 my-3'>
                    <h2 className='font-bold text-xl'>
                        Beta Testers
                    </h2>
                    <div className='relative bg-white min-w-full min-h-[90px] h-auto py-3
                        w-full flex flex-row flex-nowrap items-start justify-start overflow-x-auto

                    '>
                        {
                            testers.length > 0 ? [1,2,3,4,5].map(tester => (

                                <article className='bg-white shadow-xl rounded-lg p-3 flex flex-col group
                                items-start justify-start min-w-[210px] w-md max-w-[300px]
                                mr-4 last:mr-0
                                duration-300 ease-in-out
                                hover:scale-[1.03] hover:bg-gradient-to-r hover:from-purple-300 hover:to-purple-600 hover:cursor-pointer
                                '>

                                    <h3 className="text-md text-black font-medium group-hover:text-white">
                                        { tester.name }
                                    </h3>
                                    <h2 className='group-hover:text-white font-medium text-md'>{tester.email}</h2>
                                    <small className='group-hover:text-white mt-2 font-extrabold text-sm'>{tester.role.name}</small>

                                </article>
                            )) : (
                                <p>There is no Tester users</p>
                            )
                        }
                    </div>
                </article>
                
                <article className='w-full flex flex-col items-start justify-start p-4 my-3'>
                    <h2 className='font-bold text-xl'>
                        Invited
                    </h2>
                    <div className='relative bg-white min-w-full min-h-[90px] h-auto py-3
                        w-full flex flex-row flex-nowrap items-start justify-start overflow-x-auto

                    '>
                        {
                            invited.length > 0 ? [1,2,3].map(invited => (

                                <article className='bg-white shadow-xl rounded-lg p-3 flex flex-col group
                                items-start justify-start min-w-[210px] w-md max-w-[300px]
                                mr-4 last:mr-0
                                duration-300 ease-in-out
                                hover:scale-[1.03] hover:bg-gradient-to-r hover:from-pink-300 hover:to-pink-600 hover:cursor-pointer
                                '>

                                    <h3 className="text-md text-black font-medium group-hover:text-white">
                                        {invited.name}
                                    </h3>
                                    <h2 className='group-hover:text-white font-medium text-md'>{invited.email}</h2>
                                    <small className='group-hover:text-white mt-2 font-extrabold text-sm'>{invited.role.name}</small>

                                </article>
                            )) : (
                                <p>There is no Invited users</p>
                            )
                        }
                    </div>
                </article>
            </section>

        </Authenticated>
    );
}
