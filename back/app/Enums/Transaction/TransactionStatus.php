<?php

namespace App\Enums\Transaction;

use GraphQL\Type\Definition\Description;

#[Description("TransactionStatus")]
enum TransactionStatus: int
{
    case DRAFT = 0;
    case SUCCESS = 1;
    case CANCEL = 2;
    public function getName(): string
    {
        return match ($this) {
            self::DRAFT => 'Черновик',
            self::SUCCESS => 'Принято',
            self::CANCEL => 'Отменено',
        };
    }
}
