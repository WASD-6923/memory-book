<?php

namespace App\Enums\Location;

enum LocationType: int
{
    case STAND = 0;

    public function getName(): string
    {
        return match ($this) {
            self::STAND => 'Стенд',
        };
    }
}
