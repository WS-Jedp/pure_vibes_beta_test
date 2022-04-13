<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\User;
use App\Models\Utils\ROLES;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $req) {

        $user = $req->user();
        $role = $user->role()->first(['id', 'name']);
       

        $allUsers = User::with('role')->get();

        $admins = $allUsers->filter(function($user) {
            return $user->role->name == ROLES::ADMIN;
        });
        $testers = $allUsers->filter(function($user) {
            return $user->role->name == ROLES::TESTER;
        });
        $invited = $allUsers->filter(function($user) {
            return $user->role->name == ROLES::GUEST;
        });
        
        

        $props = [
            "role" => $role,
            "admins" => $admins,
            "testers" => $testers,
            "invited" => $invited,
        ];

        return Inertia::render('Dashboard', $props);
    }
}
