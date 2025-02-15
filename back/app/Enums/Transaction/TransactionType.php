<?php

namespace App\Enums\Transaction;

use GraphQL\Type\Definition\Description;

#[Description("TransactionStatus")]
enum TransactionType: int
{
    case INCOME = 0;
    case EXPENSE = 1;
    public function getName(): string
    {
        return match ($this) {
            self::INCOME => 'Приход',
            self::EXPENSE => 'Расход',
        };
    }
}
