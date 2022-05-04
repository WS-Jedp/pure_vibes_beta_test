import axios from "axios";
import Swal from 'sweetalert2'
import ToastAlert from '@/Components/Toast';

export const createSurvey = async (form, formError, setFormError) => {
    if (validateForm(form, formError, setFormError)) {
        await ToastAlert(
            "",
            "promise",
            axios.post("http://192.168.0.5:8000/api/surveys", form, {
                headers: {Authorization: "Bearer 5|7XuZ6As7kewgT1PTDKEY6DoMzAgKxhjyP6AZBGuh"}
            })
                .then(({ data }) => {
                    if (data.ok) {
                        // setShowModalCreate(false);
                        window.location.href = `/survey/${data.data.id}`
                    } else throw new Error("Data invalid")
                }).catch(e=>console.log(e)),
            "Successful registration",
            "Error while registering, check the data"
        )
    } else {
        ToastAlert("Enter the data correctly", "warning")
    }
}

export const updateSurvey = async (curretSurvey, formError, setFormError) => {
    if (validateForm(curretSurvey, formError, setFormError)) {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, save!'
          }).then(async(result) => {
              if (result.isConfirmed) {

                await ToastAlert(
                    "",
                    "promise",
                    axios.put(`http://192.168.0.5:8000/api/surveys/${curretSurvey.id}`, curretSurvey, {
                        headers: {Authorization: "Bearer 5|7XuZ6As7kewgT1PTDKEY6DoMzAgKxhjyP6AZBGuh"}
                    })
                        .then(({ data }) => {
                            if (data.ok) {
                                // setShowModalEdit(false);
                                window.location.reload();
                            } else throw new Error("Data invalid")
                        }).catch(e=>console.log(e)),
                    "Successful registration",
                    "Error while registering, check the data"
                )
            }
          })
    } else {
        ToastAlert("Enter the data correctly", "warning")
    }
}

export const deleteSurvey = (item) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async(result) => {
          if (result.isConfirmed) {
            await ToastAlert(
                "",
                "promise",
                axios.delete(`http://192.168.0.5:8000/api/surveys/${item.id}`, {
                    headers: {Authorization: "Bearer 6|bo99qmUO88ObvhMs1JEmKWLpGDh5lLDtDH2pAw1f"}
                })
                    .then(({ data }) => {
                        if (data.ok) {
                            window.location.href = "/survey"
                        }
                        else throw new Error("Error deleting try again later");
                    }).catch(e=>console.log(e)),
                "Successful removal",
                "Error deleting try again later"
            )
        }
      })
}

const validateForm = (item, formError, setFormError) => {
    let isSuccess = true;

    if (item.name === "") {
        formError.name = true
        isSuccess = false;
    } else formError.name = false

    item.questions.forEach((quest, i) => {
        if (quest.question === "") {
            formError.questions[i] = true
            isSuccess = false;
        } else formError.questions[i] = false
    });

    setFormError({ ...formError })
    return isSuccess;
}


export const addQuestion = async(formQuestion, formQuestionError, setFormQuestionError, surveyId) => {
    if (validateFormQuestion(formQuestion, formQuestionError, setFormQuestionError)) {
        await ToastAlert(
            "",
            "promise",
            axios.post(`http://192.168.0.5:8000/api/surveys/${surveyId}/question`, formQuestion, {
                headers: {Authorization: "Bearer 5|7XuZ6As7kewgT1PTDKEY6DoMzAgKxhjyP6AZBGuh"}
            })
                .then(({ data }) => {
                    if (data.ok) {
                        window.location.reload()
                    } else throw new Error("Data invalid")
                }).catch(e=>console.log(e)),
            "Successful registration",
            "Error while registering, check the data"
        )
    } else {
        ToastAlert("Enter the data correctly", "warning")
        setTimeout(() => {
            setFormQuestionError({
                type: false,
                question: false
            })
        }, 3000);
    }
}

const validateFormQuestion = (item, formQuestionError, setFormQuestionError) => {
    let isSuccess = true;

    if (item.type === "") {
        formQuestionError.type = true
        isSuccess = false;
    } else formQuestionError.type = false

    if (item.question === "") {
        formQuestionError.question = true
        isSuccess = false;
    } else formQuestionError.question = false

    setFormQuestionError({ ...formQuestionError })
    return isSuccess;
}
