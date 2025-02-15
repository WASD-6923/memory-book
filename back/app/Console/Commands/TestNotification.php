<?php

namespace App\Console\Commands;

use App\Models\User\User;
use App\Notifications\User\UserCreatedNotification;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class TestNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-notification';

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
        $admin = User::query()->where('email', 'admin@example.com')->first();
        $user = User::query()->where('email', '<>', 'admin@example.com')->first();
        Log::info('User', $user->toArray());
        Notification::sendNow([$admin], new UserCreatedNotification($user));
    }
}
