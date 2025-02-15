<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('app:send-daily-notification-command')->dailyAt('01:00');
Schedule::command('app:send-groups-notification-command')->dailyAt('01:30');
