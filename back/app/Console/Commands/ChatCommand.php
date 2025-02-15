<?php

namespace App\Console\Commands;

use App\Services\ChatGpt\ChatGptService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class ChatCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:chat';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test chat command';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $service = new ChatGptService();
        $answer = $service->askQuestion('Сколько дней в мусульманском году');
        Log::log('ANSWER', $answer);
    }
}
