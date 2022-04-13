<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request) {
        $validator = Validator::make($request->post(), [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

       

        $validator->validate();

        if($validator->failed()) {
            return response()->json([
                "status" => 401,
                "data" => false,
                "message" => "Need more data to auth"
            ], 401);
        }

        
        $isLogged = Auth::attempt(["email" => $request->email, "password" => $request->password], true);

        if(!$isLogged) {
            return response()->json([
                "status" => 401,
                "data" => false,
                "message" => "Bad credentials"
            ], 401);
        }

     

        $user = $request->user();
        $userRole = $user->role()->first(['name']);
        $tokenData = [
            "email" => $user->email,
            "role" => $userRole
        ];
        $token = $user->createToken(json_encode($tokenData));

        return [
            "status" => 200,
            "data" => [
                "token" => $token->plainTextToken,
                "role" => $userRole
            ],
            "message" => "Logged in!"
        ];
    }

    public function logout(Request $request)
    {

        if(!$request->user()->tokens) {
            return [
                'status' => 400,
                'data' => false,
                'message' => "The user doesn't have any token to revoke"
            ];
        }

        $request->user()->tokens()->delete();
        
        return [
            'status' => 200,
            'data' => true,
        ];
    }
}
