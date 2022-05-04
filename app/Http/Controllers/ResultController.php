<?php

namespace App\Http\Controllers;

use App\Http\Requests\Results\ResultRequest;
use App\Models\Result;
use App\Models\Survey;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ResultController extends Controller
{
    public function index()
    {

        $results = User::with('results')->get();

        return Inertia::render('Results/Index', [
            "results" => $results
        ]);
    }

    public function show($userId)
    {
        $allSurveys = collect();

        $user = User::find($userId);

        $data = Result::where('user_id', $userId)->get()
            ->groupBy("survey_id");

        foreach ($data as $key => $answers) {
            $survey = Survey::find($key);
            $result = [
                "surveyId" => $survey->id,
                "surveyName" => $survey->name,
                "allAnswers" => $answers->map(function ($answers) use ($survey) {
                    $questions = collect($survey->questions);
                    $answers = collect($answers->answers);
                    $answers = $answers->map(function ($answer) use ($questions) {
                        $res = $questions->firstWhere("id", $answer["question_id"]);
                        unset($answer["question_id"]);
                        return array_merge(["question" => $res["question"]], $answer);
                    });
                    return $answers;
                }),
            ];
            $allSurveys->push($result);
        }

        // return [
        //     'status' => 200,
        //     'data' => $results
        // ];

        return Inertia::render('Results/Show', [
            "user" => $user,
            "allSurveys" => $allSurveys,
        ]);
    }

    public function store(ResultRequest $request)
    {
        $validated = $request->validated();

        $survey = Survey::find($validated->survey_id);
        $answers = json_decode($validated->answers);
        if($survey->amount_of_questions() != count($answers)) {
            throw new ValidationException(new Validator(), "There is no enough answers for the section survey");
        }

        $result = new Result();
        $result->survey_id = $survey->id;
        $result->user_id = $request->user()->id;
        $result->answers = $answers;

        $result->save();

        return true;
    }
}
