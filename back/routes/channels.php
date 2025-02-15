<?php

use App\Models\User\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.User.{id}', function (User $user, $id) {
    \Illuminate\Support\Facades\Log::info('App.Models.User.User.{id}' . $user->id. ' = ' . $id);
    return (string)$user->id == (string)$id;
});
