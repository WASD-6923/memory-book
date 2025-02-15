<?php

namespace App\Enums\Transaction;

use GraphQL\Type\Definition\Description;

#[Description("ExpenseTransactionCategory")]
enum TransactionCategory: int
{
    case OTHER = 0;

    // Приход
    case CASH_ON_MEETING = 1;
    case NON_CASH_ON_MEETING = 2;
    case CASH_ON_BOOK = 3;
    case NON_CASH_ON_BOOK = 4;


    // расход
    case OFFICE_RENT = 1000;
    case TEA_AND_SUGAR = 1001;

    public function getName(): string
    {
        return match ($this) {
            self::CASH_ON_MEETING => 'В работе',
            self::NON_CASH_ON_MEETING => 'Ошибка',
            self::CASH_ON_BOOK => 'Наличные за литературу',
            self::NON_CASH_ON_BOOK => 'Безнал за литературу',

            self::OFFICE_RENT => 'Аренда помещения',
            self::TEA_AND_SUGAR => 'Чай и сахар',
            self::OTHER => 'Другое',
        };
    }
}
