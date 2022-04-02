import React from 'react'

export const Text = ({data}) => {

    return (
        <section className='w-full overflow-x-auto flex flex-row flex-nowrap items-start justify-start'>
            {
                data.length > 0 ? data.map(answer => 
                    <article className='min-w-[210px] w-1/5 max-w-[300px] bg-white m-3 first:ml-0 shadow-lg rounded-md h-auto min-h-[72px]'>
                        <p className='text-base font-light'>
                            {
                                answer
                            }
                        </p>
                    </article>
                ) : (
                    <div className='shadow-md rounded-md p-3 text-red-500 my-4'>There is no answers</div>
                )
            }
        </section>
    )
}