<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\SurveyController;
use App\Models\Survey;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



// Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('results', ResultController::class);
    Route::resource('survey', SurveyController::class);

    // Create surveys
    Route::post('/save/surveys/create', [SurveyController::class, 'store']);
    Route::post('/update/surveys/{surveyId}', [SurveyController::class, 'updateSurvey']);
    Route::post('/delete/surveys/{surveyId}', [SurveyController::class, 'destroy']);
    
    // Questions
    Route::post('/save/surveys/{id}/question', [SurveyController::class, 'storeQuestion']);
    Route::post('/update/surveys/{id}/question', [SurveyController::class, 'updateQuestion']);
    Route::delete('/delete/surveys/{surveyId}/question/{questionId}', [SurveyController::class, 'destroyQuestion']);
});



require __DIR__ . '/auth.php';
