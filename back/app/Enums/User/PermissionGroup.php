<?php

namespace App\Enums\User;

use GraphQL\Type\Definition\Description;

#[Description(description: "Группы пермишенов")]
enum PermissionGroup: int
{
    #[Description(description: "Доступ к пунктам меню")]
    case MENU = 1;

    #[Description(description: "Справочники")]
    case DICTIONARY = 2;

    #[Description(description: "Администрирование")]
    case ADMIN = 3;
}
