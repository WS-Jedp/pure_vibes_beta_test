<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $req) {

        $user = $req->user();
        $userResults = $user->results()->count();
        $role = $user->role()->first(['id', 'name']);
        $invitationsAmount = $user->invitations()->count();
        $invitedBy = $user->invited_by();

        $props = [
            "results" => $userResults,
            "role" => $role,
            "numberOfInvitations" => $invitationsAmount,
            "invitedBy" => $invitedBy,
        ];

        return Inertia::render('Dashboard', $props);
    }
}
