<?php

namespace App\Http\Controllers;

use App\Http\Requests\SurveyRequest;
use App\Models\Survey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class SurveyController extends Controller
{
    public function index() {
        $surveys = Survey::all();
        return Inertia::render('Survey/Index', [
            "surveys" => $surveys
        ]);
    }

    public function show(Request $request, Survey $survey) {
        $survey->results;

        $allSurveyNames = Survey::select(['name', 'id'])->get();

        return Inertia::render('Survey/Show', [
            "survey" => $survey,
            "allSurveys" => $allSurveyNames
        ]);
    }

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
            return Redirect::route("survey.index");
        }

        return Redirect::route('survey.index');
    }

    public function updateSurvey(SurveyRequest $request, $id)
    {
        try {
            $validated = $request->validated();

            $survey = Survey::find($id);
            $survey->name = $validated["name"];
            $survey->questions = $validated["questions"];

            $survey->save();
        } catch (\Throwable $th) {
            return Redirect::route("survey.show", [
                "survey" => $id,
                "error" => "true",
            ]);
        }

        return Redirect::route("survey.show", $id);
    }

    // Delete survey
    public function destroy($id)
    {
        try {
            $survey = Survey::find($id);
            $survey->delete();
        } catch (\Throwable $th) {
            return Redirect::route("survey.index");
        }

        return Redirect::route("survey.index");
    }


    // ---------- Questions ----------
    public function storeQuestion(Request $request, Survey $id)
    {

        try {
            $surveyID = $id->id;
            $survey = $id;

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
            return Redirect::route("survey.show", $surveyID);
        }
        return Redirect::route("survey.show", [
            "survey" => $surveyID
        ]);
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
