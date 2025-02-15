<?php

namespace App\Console\Commands;

use App\Models\Group\Group;
use App\Services\Telegram\TelegramService;
use Illuminate\Console\Command;
use Telegram\Bot\Exceptions\TelegramSDKException;
use DateInvalidTimeZoneException;
use DateMalformedStringException;
use DateTime;
use DateTimeZone;

class SendGroupsNotificationCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-groups-notification-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Отправка сообщения в телеграмм о группах на сегодня';

    /**
     * Execute the console command.
     * @throws TelegramSDKException
     * @throws DateInvalidTimeZoneException
     * @throws DateMalformedStringException
     */
    public function handle()
    {
        $telegramService = new TelegramService();
        $dayOfWeek = strtolower(date('l'));
        $groups = Group::query()->whereNotNull($dayOfWeek)->get();
        $data = [];
        foreach ($groups as $group) {
            $utcTime = new DateTime($group->{$dayOfWeek}, new DateTimeZone('UTC'));
            $utcTime->setTimezone(new DateTimeZone($group->city->time_zone));
            $data[] = [
                'name' => $group->name,
                'address' => $group->address,
                'time' => $utcTime->format('H:i'),
            ];
        }
        if (!empty($data)) {
            usort($data, function ($a, $b) {
                return strcmp($a['time'], $b['time']);
            });
            $telegramService->sendGroupsNotification($data);
        }
    }
}
