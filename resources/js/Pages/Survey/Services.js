import axios from "axios";
import Swal from 'sweetalert2'
import ToastAlert from '@/Components/Toast';
import { Inertia } from '@inertiajs/inertia'


async function saveData(url, data) {
    Inertia.post(url, data, {
        onError(err) {
            ToastAlert("Error while registering, check the data", "danger")
        },
        onStart(){ 
            ToastAlert("Loading...", "loader")
        },
        onSuccess(data) {
            if(data.data) {
                ToastAlert("Successful registration", "success")   
            } else {
                ToastAlert("Successful registration", "danger")   

            }
        }}
    )
}

export const createSurvey = async (form, formError, setFormError) => {

    if (validateForm(form, formError, setFormError)) {
        await saveData("/save/surveys/create", form)
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
                await saveData(`/update/surveys/${curretSurvey.id}`, curretSurvey)
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
            await saveData(`/delete/surveys/${item.id}`, null)
        }
      })
}


export const addQuestion = async(formQuestion, formQuestionError, setFormQuestionError, surveyId) => {
    if (validateFormQuestion(formQuestion, formQuestionError, setFormQuestionError)) {
        await saveData(`/save/surveys/${surveyId}/question`, formQuestion)
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
