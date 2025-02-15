<?php

namespace App\Services\Telegram;

use App\Models\Daily\Daily;
use Illuminate\Support\Carbon;
use Telegram\Bot\Api;
use Telegram\Bot\Exceptions\TelegramSDKException;

class TelegramService
{
    protected Api $telegram;

    /**
     * @throws TelegramSDKException
     */
    public function __construct()
    {
        $this->telegram = new Api(config('telegram.bot_token'));
    }

    /**
     * Отправить сообщение через бота
     *
     * @param string $chatId ID чата (получите его через Bot API от Telegram)
     * @param string $message Сообщение
     * @return void
     * @throws TelegramSDKException
     */
    public function sendMessage(string $chatId, string $message): void
    {
        $this->telegram->sendMessage([
            'chat_id' => $chatId,
            'text' => $message,
        ]);
    }

    /**
     * Отправляет сообщение в канал.
     *
     * @param string $channelUsername Идентификатор канала ('@имя_канала' или chat_id).
     * @param string $message Сообщение.
     * @return void
     * @throws TelegramSDKException
     */
    public function sendToChannel(string $channelUsername, string $message): void
    {
        $this->telegram->sendMessage([
            'chat_id' => $channelUsername, // ID канала или username (например, @имя_канала)
            'text'    => $message,
        ]);
    }

    /**
     * @throws TelegramSDKException
     */
    public function sendDailyNotification(Daily $daily): void
    {
        Carbon::setLocale('ru');
        $message = "*{$daily->name}*\n";
        $message .= "{$daily->date->translatedFormat('l, d.m.Y')} \n\n";
        $message .= "{$daily->description}\n\n";

        $message .= "_{$daily->sources}_\n\n";

        $message .= "{$daily->content}";

        $chatId = env('TELEGRAM_CHANNEL'); // Замена на ваш ID канала

        // Отправляем сообщение
        $this->telegram->sendMessage([
            'chat_id' => $chatId,
            'text' => $message,
            'parse_mode' => 'Markdown',
        ]);
    }

    /**
     * @throws TelegramSDKException
     */
    public function sendGroupsNotification(array $data): void
    {
        $date = Carbon::now()->translatedFormat('l, d.m.Y');
        $message = "*Собрания АА сегодня, {$date}*\n\n";

        $chatId = env('TELEGRAM_CHANNEL'); // Замена на ваш ID канала
        foreach ($data as $group) {
            $message .= "*{$group['time']} \"{$group['name']}\"* по адресу {$group['address']}\n";
        }
        // Отправляем сообщение
        $this->telegram->sendMessage([
            'chat_id' => $chatId,
            'text' => $message,
            'parse_mode' => 'Markdown',
        ]);
    }
}
