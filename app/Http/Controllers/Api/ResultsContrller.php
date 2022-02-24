<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Results\ResultRequest;
use App\Models\Result;
use App\Models\Survey;
use Illuminate\Http\Request;

class ResultsContrller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $userResults = $request->user()->results->map(function($answer) {
            return [
                "id" => $answer->id,
                "answers" => $answer->answers,
                "survey_id" => $answer->survey_id,
            ];
        });

        return [
            "state" => 200,
            "data" => $userResults
        ];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ResultRequest $request)
    {

        $newResult = new Result();
        $newResult->survey_id = $request->post('survey_id');
        $newResult->answers = json_decode($request->post('answers'));
        $newResult->user_id = $request->user()->id;
        $newResult->save();

        return [
            'status' => 201,
            'data' => [
                'created' => true,
                'id' => $newResult->id
            ],
            'message' => 'The results were saved!'
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, int $survey_id)
    {

        $answers = $request->user()->result_of($survey_id);
        $amountOfQuestions = count(Survey::find($survey_id)->questions);

        return $answers;
        if(!$answers) {
            return [
                "status" => 200,
                "data" => null
            ];
        }

        $amountOfAnswers = $answers ? count($answers->answers) : 0;

        
        return [
            "status" => 200,
            "data" => [
                "id" => $answers->id,
                "answers" => json_encode($answers->answers),
                "totalQuestions" => $amountOfQuestions,
                "totalAnswers" => $amountOfAnswers,
                "isComplete" => $amountOfQuestions == $amountOfAnswers,
                "survey_id" => $survey_id,
            ],
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $result_id)
    {
        $user = $request->user();
        $result = Result::find($result_id);
        if(!$user->can('update', $result)) {

            return response()->json([
                'status' => 401,
                'data' => null,
                'message' => "Unauthorized",
            ], 401);
        };

        $request->validate([
            'answers' => 'required|json'
        ], $request->all());

        $result->answers = json_encode($request->answers);
        $result->save();
        
        return response()->json([
            'status' => 201,
            'data' => [
                'id' => $result->id,
                'updated' => true,
            ],
            'message' => 'The answers wese updated!'
        ], 201);
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