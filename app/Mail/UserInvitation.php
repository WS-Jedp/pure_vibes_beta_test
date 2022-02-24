<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserInvitation extends Mailable
{
    use Queueable, SerializesModels;

    public $invitedBy;
    public $userInvited;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $userInvited,  string $invitedBy)
    {
        $this->userInvited = $userInvited;
        $this->invitedBy = $invitedBy;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(env('MAIL_USERNAME'), 'Invitation to Pure Vibes beta test')
                    ->view('emails.userInvitation');
    }
}
