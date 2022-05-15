import { RolesTypes } from '@/constants/RolesType';
import { toCamelCase } from '@/Utils/ToCamelCase';
import React from 'react';

export default function CardUser({ users, typeUser, title }) {
    const color = typeUser === RolesTypes.ADMIN ? "sky" : typeUser === RolesTypes.TESTER ? "purple" : "pink"
    return (
        <article className={`w-full flex flex-col items-start justify-start p-4 ${typeUser != RolesTypes.ADMIN && ("my-3")}`}>
            <h2 className='font-bold text-xl'>
                {title}
            </h2>
            <div className='relative bg-white min-w-full min-h-[90px] h-auto py-3
                w-full flex flex-row flex-nowrap items-start justify-start overflow-x-auto

            '>
                {
                    users.length > 0 ? users.map(user => (

                        <a href={`/results/${user.id}`} key={user.id} className={`bg-white shadow-xl rounded-lg p-3 flex flex-col group
                        items-start justify-start min-w-[210px] w-md max-w-[300px]
                        mr-4 last:mr-0
                        duration-300 ease-in-out
                        hover:scale-[1.03] hover:bg-gradient-to-r hover:from-${color}-300 hover:to-${color}-600 hover:cursor-pointer
                        `}>

                            <h3 className="text-md text-black font-medium group-hover:text-white">
                                { user.name }
                            </h3>
                            <h2 className='group-hover:text-white font-medium text-md'>{ user.email }</h2>
                            <small className='group-hover:text-white mt-2 font-extrabold text-sm'>{ user.role.name }</small>

                        </a>
                    )) : (
                        <p>There is no {toCamelCase(typeUser)} users</p>
                    )
                }
            </div>
        </article>
    );
}
