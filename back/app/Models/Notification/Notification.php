<?php

namespace App\Models\Notification;

use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Carbon;

/**
 * @property string $id
 * @property string $type
 * @property string $notifiable_type
 * @property string $notifiable_id
 * @property string $data
 * @property Carbon $read_at
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class Notification extends DatabaseNotification
{

    public function getNotifiableIdAttribute()
    {
        return $this->attributes['user_id'];
    }
}
