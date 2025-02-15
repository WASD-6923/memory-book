<?php

declare(strict_types=1);

namespace App\GraphQL\Queries\Statistics;

use App\Models\Group\Group;
use App\Models\Meeting\Meeting;
use App\Models\User\User;

final readonly class AdminStatistics
{
    protected ?string $group_id;
    /** @param array{} $args */
    public function __invoke(null $_, array $args)
    {
        if (!auth()->user()->hasRole('admin')) {
            $this->group_id = auth()->user()?->profile?->group_id;
        }
        return [
            'users' => $this->users(),
            'groups' => $this->groups(),
            'meetings' => $this->meetings(),
        ];
    }

    protected function users(): int
    {
        return User::query()->count();
    }

    protected function groups(): int
    {
        return Group::query()->count();
    }

    protected function meetings(): int
    {
        if (auth()->user()->hasRole('admin')) {
            return Meeting::query()->count();
        }

        return Meeting::query()->where('group_id', $this->group_id)->count();
    }
}
