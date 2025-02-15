<?php

namespace App\Console\Commands\Mail;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestMailpitCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-mailpit';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Mail::raw('This is a test email.', function ($message) {
            $message->to('test@example.com')
                ->subject('Test Email');
        });
    }
}
