<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ResultsContrller;
use App\Http\Controllers\Api\SurveyController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\RoleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        return response()->json([
            'status' => 200,
            'data' => [
                'user' => $request->user(),
                'invitedBy' => $request->user()->invited_by(),
            ]
        ]);
    });

    
    Route::resource('surveys', SurveyController::class);
    Route::prefix('surveys/state')->group(function () {
        Route::get('/all', [SurveyController::class, 'surveysState']);
        Route::get('/{survey}', [SurveyController::class, 'state']);
        Route::get('/user/{user}', [SurveyController::class, 'isBetaTestDoneFor']);
    });

    Route::get('answers/user/{userId}', [ResultsContrller::class, 'resultByUser']);
    Route::resource('answers', ResultsContrller::class);

    Route::post('/invite/{user}', [InvitationController::class, 'store']);

    Route::post('/become/tester', [RoleController::class, 'becomeTester']);
});
