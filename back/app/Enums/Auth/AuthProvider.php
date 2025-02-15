<?php

namespace App\Enums\Auth;

enum AuthProvider: int
{
    case SMSUP = 0;
    case TELEGRAM = 1;
}
