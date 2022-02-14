<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SurveyController extends Controller
{
    public function index() {
        $surveys = Survey::all();
        return Inertia::render('Survey/Index', [
            "surveys" => $surveys
        ]);
    }
}
