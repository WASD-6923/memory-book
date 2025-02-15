<?php

namespace App\Enums\User;
use GraphQL\Type\Definition\Description;

#[Description(description: "Уровень доступа")]
enum AccessLevel: int
{
    #[Description(description: "Публичный доступ")]
    case PUBLIC = 1;
    #[Description(description: "Второй уровень")]
    case PRIVATE = 2;
    #[Description(description: "Третий уровень")]
    case EXTENDED = 3;

    #[Description(description: "Участник аукциона")]
    case BIDDER = 4;

    #[Description(description: "Административный доступ")]
    case ADMIN = 100;

    public static function values(): array
    {
        return array_map(fn($case) => $case->value, self::cases());
    }
}
