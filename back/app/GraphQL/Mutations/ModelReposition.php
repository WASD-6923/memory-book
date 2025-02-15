<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Log;

final readonly class ModelReposition
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        Log::info('ARGS', $args);
        foreach ($args['positions'] as $i => $arg) {
            $args['model']::query()->where('id', $arg['id'])->update(['position' => $i + 1]);
        }

        return true;
    }
}
