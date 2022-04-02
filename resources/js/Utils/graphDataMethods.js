
export const getQuestionAnswerData = (answers, type) => {

    switch (type) {
        case "BOOLEAN":
            return getBooleanAnswersGraphData(answers)

        case "RATE":
            return getRateAnswersGraphData(answers)

        case "TEXT":
            return getTextAnswerData(answers)

        default:
            return getBooleanAnswersGraphData(answers)
    }
}

const getBooleanAnswersGraphData = (arrayOfAnswers) => {
    let trueAnswers = 0
    let falseAnswers = 0
    const graphData = []

    arrayOfAnswers.forEach(answer => {
        answer.answer ? (trueAnswers += 1) : (falseAnswers += 1)
    })

    graphData.push({
        name: "Yes",
        value: trueAnswers
    })
    graphData.push({
        name: "No",
        value: falseAnswers
    })

    return graphData
}

const getRateAnswersGraphData = (answers) => {
    const graphData = []

    let currentAnswersData = {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
    }

    answers.forEach(answer => {
        currentAnswersData[answer.answer] += 1
    })

    Object.keys(currentAnswersData).forEach(key => {
        if(!Number(key)) return
        
        graphData.push({
            name: key,
            value: currentAnswersData[key]
        })
    })

    return graphData
}

const getTextAnswerData = (answers) => {
    const data = []
    answers.forEach(answer => {
        data.push(answer.answer)
    })

    return data
}