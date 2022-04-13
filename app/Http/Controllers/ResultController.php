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
