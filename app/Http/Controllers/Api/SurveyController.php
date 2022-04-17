<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SurveyRequest;
use App\Models\Result;
use App\Models\Survey;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $surveys = Survey::all()->map(function($survey) {
            return [
                'id' => $survey->id,
                'name' => $survey->name,
                'questionsTotal' => count($survey->questions),
            ];
        });

        return [
            'status' => 200,
            'data' => $surveys
        ];
    }

    public function state(Request $request, Survey $survey)
    {
        $amountOfQuestions = $survey->amount_of_questions();
        $resultsOfUser = Result::where('user_id', $request->user()->id)
            ->where('survey_id', $survey->id)
            ->select('answers')
            ->first();

        $amountOfAnswers = $resultsOfUser ? count($resultsOfUser->answers) : 0;

        return [
            'status' => 200,
            'data' => [
                "results" => $resultsOfUser,
                'questionsTotal' => $amountOfQuestions,
                'isComplete' => $amountOfAnswers == $amountOfQuestions,
                'totalOfImages' => $survey->amount_of_images
            ]
        ];
    }

    public function surveysState(Request $request)
    {
        $surveys = Result::join('surveys', 'surveys.id', '=', 'results.survey_id')
            ->where('results.user_id', $request->user()->id)
            ->get();

        $isAllSurveysComplete = true;

        $surveysState = $surveys->map(function($survey) {
            $questions = json_decode($survey->questions);
            $amountOfAnswers = count($survey->answers);
            $amountOfQuestions = count($questions);


            $amountOfAnswers < $amountOfQuestions && $isAllSurveysComplete = false;

            return [
                'survey_id' => $survey->survey_id,
                'name' => $survey->name,
                "isComplete" => $amountOfAnswers == $amountOfQuestions,
                "questionsTotal" => $amountOfQuestions,
                "answersTotal" => $amountOfAnswers,
            ];
        });

        return [
            "status" => 200,
            "data" => [
                "surveysState" => $surveysState,
                "isBetaTestDone" => count($surveysState) == Survey::TOTAL_OF_SURVEYS && $isAllSurveysComplete
            ],
        ];
    }

    public function isBetaTestDoneFor(Request $request, User $user)
    {
        $surveys = Result::join('surveys', 'surveys.id', '=', 'results.survey_id')
            ->where('results.user_id', $user->id)
            ->get();

        $isAllSurveysComplete = true;

        $surveysState = $surveys->map(function($survey) {
            $questions = json_decode($survey->questions);
            $amountOfAnswers = count($survey->answers);
            $amountOfQuestions = count($questions);


            if($amountOfAnswers < $amountOfQuestions)
            {
                $isAllSurveysComplete = false;
            };

            return [
                'survey_id' => $survey->survey_id,
                "isComplete" => $amountOfAnswers == $amountOfQuestions,
            ];
        });

        return [
            "status" => 200,
            "data" => [
                "isBetaTestDone" => count($surveysState) == Survey::TOTAL_OF_SURVEYS && $isAllSurveysComplete
            ],
        ];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SurveyRequest $request)
    {
        try {
            $validated = $request->validated();

            $survey = new Survey();
            $survey->name = $validated["name"];
            $survey->questions = $validated["questions"];
            $survey->amount_of_images = count($validated["questions"]);

            $survey->save();
        } catch (\Throwable $th) {
            return [
                'ok' => false,
                'status' => 200,
                'data' => "Check the entered data"
            ];
        }

        return [
            'ok' => true,
            'status' => 201,
            'data' => $survey
        ];
    }

    public function storeQuestion(Request $request, $id)
    {
        try {
            $survey = Survey::find($id);

            // Asignar le un id a la pregunta
            $questions = collect($survey->questions);
            $maxId = $questions->max('id');
            $id = array('id' => (isset($maxId) ? $maxId : 0) + 1);
            $newQuestion = array_merge($id, $request->all());
            $questions->push($newQuestion);

            $survey->questions = $questions;
            $survey->amount_of_images = count($survey->questions);

            $survey->save();
        } catch (\Throwable $th) {
            return [
                'ok' => false,
                'status' => 200,
                'data' => "Check the entered data",
            ];
        }

        return [
            'ok' => true,
            'status' => 200,
            'data' => $survey
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Survey $survey)
    {
        return [
            'status' => 200,
            'data' => $survey
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(SurveyRequest $request, $id)
    {
        try {
            $validated = $request->validated();

            $survey = Survey::find($id);

            $survey->name = $validated["name"]; //solo cambiaria el nombre
            // $survey->questions = $validated["questions"];
            //$survey->amount_of_images = count($validated["questions"]);

            $survey->save();
        } catch (\Throwable $th) {
            return [
                'ok' => false,
                'status' => 200,
                'data' => 'Check the entered data'
            ];
        }

        return [
            'ok' => true,
            'status' => 200,
            'data' => $survey
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $survey = Survey::find($id);
            $survey->delete();
        } catch (\Throwable $th) {
            return [
                'ok' => false,
                'status' => 200
            ];
        }

        return [
            'ok' => true,
            'status' => 200
        ];
    }

    public function destroyQuestion($surveyId, $questionId)
    {
        try {
            $survey = Survey::find($surveyId);

            $questions = collect($survey->questions);
            $questions = $questions->where('id', "<>", $questionId);

            $survey->questions = $questions;
            $survey->amount_of_images = count($survey->questions);

            $survey->save();
        } catch (\Throwable $th) {
            return [
                'ok' => false,
                'status' => 200,
                'error' => $th,
            ];
        }

        return [
            'ok' => true,
            'status' => 200,
        ];
    }
}
