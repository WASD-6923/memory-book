<?php

declare(strict_types=1);

namespace App\GraphQL\Mutations\User;

use App\Models\Share\Role;
use App\Models\User\Profile;
use App\Models\User\User;
use Illuminate\Support\Facades\Log;

final readonly class UserCreate
{
    /** @param array{} $args */
    public function __invoke(null $_, array $args)
    {
        Log::info('UserCreate', $args);
        $args['password'] = bcrypt($args['password']);
        $user = User::query()->create($args);
        $user->syncRoles([$args['roles']]);
        Profile::query()->create(['user_id' => $user->id]);

        return $user;
    }
}
