<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\Utils\ROLES;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function becomeTester(Request $request)
    {
        $user = $request->user();
        $userCurrentRole = $user->role;

        if($userCurrentRole->name == ROLES::TESTER) {
            return response()->json([
                "status" => 200,
                "data" => false,
                "message" => "The user is already a beta tester"
            ]);
        }

        $testerRole = Role::where('name', ROLES::TESTER)->first();

        $user->role()->associate($testerRole);

        $user->save();

        return response()->json([
            "status" => 201,
            "data" => $user,
            "message" => "The user becomes a beta tester"
        ], 201);
    }
}
