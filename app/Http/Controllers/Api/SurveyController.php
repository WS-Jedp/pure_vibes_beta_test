<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Result;
use App\Models\Survey;
use App\Models\User;
use Illuminate\Http\Request;

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
    public function store(Request $request)
    {
        
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
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
