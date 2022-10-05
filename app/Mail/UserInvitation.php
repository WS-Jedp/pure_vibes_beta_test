<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Hash;

class UserInvitation extends Mailable
{
    use Queueable, SerializesModels;

    public $invitedBy;
    public $userInvited;
    public $userPassword;
    public $invitationLink;
    public $FRONTEND_BASE_URL;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $userInvited, string $userPassword, string $invitedBy)
    {
        $this->userInvited = $userInvited;
        $this->userPassword = $userPassword;
        $this->invitedBy = $invitedBy;
        $this->FRONTEND_BASE_URL = env('FRONTEND_EMAIL_BASE_URL') || 'http://localhost:3000';
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(env('MAIL_USERNAME'), 'Invitation To Dharma Beta Test')
                    ->view('emails.userInvitation');
    }
}
