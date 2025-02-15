<?php

declare(strict_types=1);

namespace App\GraphQL\Mutations\User;

use App\Models\Share\Role;
use App\Models\User\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

final readonly class UserUpdate
{
    /** @param array{} $args */
    public function __invoke(null $_, array $args)
    {
        $user = User::query()->find($args['id']);
        if (!empty($args['password'])) {
            $args['password'] = bcrypt($args['password']);
        }
        $user->update($args);
        $user->syncRoles([$args['roles']]);

        return $user;
    }
}
