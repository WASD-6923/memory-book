<?php
declare(strict_types=1);

namespace App\GraphQL\Queries\Auth;

final readonly class Logout
{
    /** @param array{} $args */
    public function __invoke(null $_, array $args)
    {
        auth()->logout();
    }
}
