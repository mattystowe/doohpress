<?php

namespace App\Jobs\emails;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Invitation;
use Illuminate\Contracts\Mail\Mailer;

class SendInvitation implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $invitation;


    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Invitation $Invitation)
    {
        $this->invitation = $Invitation;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
     public function handle(Mailer $mailer)
     {

        $invitation = $this->invitation;
        $mailer->send('emails.invitation', ['invitation' => $invitation], function ($message) use ($invitation) {
           $message->subject('You have been invited to join a Doohpress.com Team!');
           $message->to($invitation->email, $invitation->name);
           $message->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
           $message->sender(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
           $message->replyTo(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
         });

     }


}
