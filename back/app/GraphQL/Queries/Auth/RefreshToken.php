<?php
declare(strict_types=1);

namespace App\GraphQL\Queries\Auth;

use Illuminate\Support\Facades\Auth;

final readonly class RefreshToken
{
    /** @param array{} $args */
    public function __invoke(null $_, array $args)
    {
        return [
            'accessToken' => auth()->refresh(),
            'type' => 'bearer',
            'user' => Auth::user(),
        ];
    }
}
