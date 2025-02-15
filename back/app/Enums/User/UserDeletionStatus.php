<?php

namespace App\Enums\User;

use GraphQL\Type\Definition\Description;

#[Description('User deletion status.')]
enum UserDeletionStatus: int
{
    #[Description('User deletion status requested')]
    case REQUESTED = 0;

    #[Description('User deletion approved')]
    case APPROVED = 1;
    #[Description('User deletion rejected by admin.')]
    case REJECTED = 2;
}
