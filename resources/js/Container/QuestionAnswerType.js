import React from 'react'
import { Rate } from '@/Components/graphs/Rate'
import { Boolean } from '../Components/graphs/Boolean'
import { Text } from '../Components/graphs/Text'

export const QuestionAnswerType = ({type, data}) => {

    switch (type) {
        case "BOOLEAN":
            return <Boolean data={data} />
        case "RATE":
            return <Rate data={data} />
        case "TEXT":
            return <Text data={data} />
    
        default:
            return <small className='text-red-400'>Wrong question type, we can't render this question</small>
    }
} 