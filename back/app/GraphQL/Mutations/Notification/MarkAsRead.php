<?php declare(strict_types=1);

namespace App\GraphQL\Mutations\Notification;

use App\Models\Notification\Notification;
use Illuminate\Support\Facades\Log;

final readonly class MarkAsRead
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        Log::info('ARGS', $args);
        Notification::query()->where('id', $args['id'])->update(['read_at' => now()]);

        return true;
    }
}
