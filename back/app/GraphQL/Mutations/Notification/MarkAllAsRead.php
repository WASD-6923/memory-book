<?php declare(strict_types=1);

namespace App\GraphQL\Mutations\Notification;

use App\Models\Notification\Notification;

final readonly class MarkAllAsRead
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        Notification::query()->where('notifiable_id', auth()->id())->update(['read_at' => now()]);

        return true;
    }
}
