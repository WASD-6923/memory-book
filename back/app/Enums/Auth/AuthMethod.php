<?php

namespace App\Enums\Auth;

enum AuthMethod: string
{
    case LOGIN = 'Login';
    case REGISTER = 'Register';
}
