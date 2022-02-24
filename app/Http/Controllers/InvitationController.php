<?php

namespace App\Http\Controllers;

use App\Http\Requests\InvitationRequest;
use App\Mail\UserInvitation;
use App\Models\Invitation;
use App\Models\Role;
use App\Models\User;
use App\Models\Utils\ROLES;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class InvitationController extends Controller
{
    public function store(InvitationRequest $request, User $user)
    {

        
        $role = Role::where('name', ROLES::GUEST)->first();
        
        $invitedUser = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => Hash::make($request->name . '_' . env('DEFAULT_PASSWORD')),
            "role_id" => $role->id,
        ]);
        
        $invitation = new Invitation([
            "user_id" => $user->id,
            "guest_id" => $invitedUser->id,
        ]);
        $invitation->save();
        
        try {
            Mail::to($request->email)->send(new UserInvitation($user, $user->email));
        } catch (\Throwable $th) {
            $invitedUser->delete();
            $invitation->delete();
            $json = [
                "status" => 500,
                "data" => false,
                "message" => "We sorry, the user couldn't be invited"
            ];

            return response()->json($json, 500);
        }

        $json = [
            "status" => 201,
            "data" => [
                "id" => $invitation->id,
                "guest_id" => $invitation->guest_id,
                "user_id" => $invitation->user_id,
            ]
        ];

        return response($json, 201);
    }
}
