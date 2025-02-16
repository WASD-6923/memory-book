<?php

namespace App\Enums\War;

enum WarStatus: int
{
    case Ended = 0;
    case  InProcess = 1;
    case Negotiations = 2;
}
