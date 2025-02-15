<?php

namespace App\Console\Commands;

use App\Services\Telegram\TelegramService;
use Illuminate\Console\Command;
use Telegram\Bot\Exceptions\TelegramSDKException;
use Telegram\Bot\Laravel\Facades\Telegram;

class TestTelegramCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-telegram-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     * @throws TelegramSDKException
     */
    public function handle()
    {
        $telegramService = new TelegramService();
        $chatId = '375434370'; // ID чата (можно получить через Telegram API)
        $message = 'Привет, от зайки для зайки!';

        $telegramService->sendMessage($chatId, $message);
        $this->info('Message sent successfully');

        /*$chatId = '@AAOrenTest'; // ID чата (можно получить через Telegram API)

        $telegramService->sendToChannel($chatId, $message);
        $this->info('Message sent successfully');*/
    }
}
