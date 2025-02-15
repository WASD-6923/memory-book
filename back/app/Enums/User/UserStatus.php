<?php

namespace App\Enums\User;

use GraphQL\Type\Definition\Description;

#[Description(description: "Статусы пользователей")]
enum UserStatus: int
{
    #[Description(description: "Активный")]
    case ACTIVE = 0;

    #[Description(description: "Бан")]
    case BANNED = 1;

    #[Description(description: "К удалению")]
    case TO_DELETE = 2;
    #[Description(description: "Удален")]
    case DELETED = 3;
}
