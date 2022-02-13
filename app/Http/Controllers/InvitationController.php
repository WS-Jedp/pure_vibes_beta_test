<?php

namespace App\Http\Controllers;

use App\Models\Invitation;
use App\Models\Role;
use App\Models\User;
use App\Models\Utils\ROLES;
use Illuminate\Http\Request;

class InvitationController extends Controller
{
    public function store(Request $request, User $user)
    {
        $validated = $request->validate([
            "name" => 'required|string',
            "email" => 'required|string|email'
        ], $request->post());

        $role = Role::where('name', ROLES::GUEST)->first();

        $invitedUser = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "role_id" => $role->id,
        ]);

        $invitation = new Invitation([
            "user_id" => $user->id,
            "guest_id" => $invitedUser->id,
        ]);
        $invitation->save();


        $json = [
            "status" => 201,
            "data" => [
                "id" => $invitation->id,
                "guest_id" => $invitation->guest_id,
                "user_id" => $invitation->user_id,
            ]
        ];

        return response($json)->status(201);
    }
}
