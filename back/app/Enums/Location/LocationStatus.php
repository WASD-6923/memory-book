<?php

namespace App\Enums\Location;

enum LocationStatus: int
{
    case DRAFT = 0;
    case SUCCESS = 1;
    case FAIL = 2;
    case TERMINATED = 3;
}
