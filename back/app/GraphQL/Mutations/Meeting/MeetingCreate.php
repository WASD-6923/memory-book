<?php
declare(strict_types=1);

namespace App\GraphQL\Mutations\Meeting;

use App\Enums\Transaction\TransactionCategory;
use App\Enums\Transaction\TransactionType;
use App\Models\Meeting\Meeting;
use App\Models\Transaction\Transaction;
use Illuminate\Support\Facades\Log;

final readonly class MeetingCreate
{
    /** @param array{} $args */
    public function __invoke(null $_, array $args)
    {
        Log::info('ARGS', $args);
        $meeting = Meeting::query()->create($args);
        if ($meeting) {
            if ($meeting->cash > 0) {
                Transaction::query()->create([
                    'group_id' => $meeting->group_id,
                    'meeting_id' => $meeting->id,
                    'type' => TransactionType::INCOME,
                    'category' => TransactionCategory::CASH_ON_MEETING,
                    'amount' => $meeting->cash,
                ]);
                $meeting->group->cash_balance += $meeting->cash;
                $meeting->group->save();
            }
            if ($meeting->non_cash > 0) {
                Transaction::query()->create([
                    'group_id' => $meeting->group_id,
                    'meeting_id' => $meeting->id,
                    'type' => TransactionType::INCOME,
                    'category' => TransactionCategory::NON_CASH_ON_MEETING,
                    'amount' => $meeting->non_cash,
                ]);
                $meeting->group->non_cash_balance += $meeting->non_cash;
                $meeting->group->save();
            }
        }

        return $meeting;
    }
}
