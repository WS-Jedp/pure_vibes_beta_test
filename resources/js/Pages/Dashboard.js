import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import CardUser from '@/Components/CardUser';
import { RolesTypes } from '@/constants/RolesType';

export default function Dashboard(props) {
    let { admins, invited, testers } = props
    testers = Object.values(testers)
    invited = Object.values(invited)

    console.log(props.auth)

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

                <CardUser
                    users={admins}
                    typeUser={RolesTypes.ADMIN}
                    title={"Admins"}
                />
                <CardUser
                    users={testers}
                    typeUser={RolesTypes.TESTER}
                    title={"Beta Testers"}
                />
                <CardUser
                    users={invited}
                    typeUser={RolesTypes.GUEST}
                    title={"Invited"}
                />
            </section>

        </Authenticated>
    );
}
