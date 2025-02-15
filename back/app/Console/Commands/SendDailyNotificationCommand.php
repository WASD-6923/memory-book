<?php

namespace App\Console\Commands;

use App\Models\Daily\Daily;
use App\Services\Telegram\TelegramService;
use Illuminate\Console\Command;
use Telegram\Bot\Exceptions\TelegramSDKException;

class SendDailyNotificationCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-daily-notification-command';

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
        //$chatId = '375434370'; // ID чата (можно получить через Telegram API)
        $daily = Daily::query()->where('date', date('Y-m-d'))->first();
        $telegramService->sendDailyNotification($daily);
    }
}
