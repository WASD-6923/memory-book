<?php

namespace App\Enums\Auth;

enum AuthStage: int
{
    case REGISTER = 1;
    case CHECK_CODE = 2;
    case LOGIN = 3;
}
