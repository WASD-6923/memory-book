<?php

namespace App\Models\User;

use App\Models\Group\Group;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $user_id
 * @property int $tariff_id
 * @property float $balance_rub
 * @property float $balance_usd
 * @property float $balance_jpy
 * @property int $remainder_count_translations
 * @property int $remainder_count_reports
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon $tariff_expired_date
 * @property int $jstat_tariff_id
 * @property bool $is_shared_optioned
 * @property int $total_reports
 * @property int $total_translates
 * @property bool $show_full_report_only
 * @property bool $is_generating_certs
 * @property float $discount_generation_certs
 * @property bool $is_extension_optioned
 * @property bool $is_360_optioned
 * @property int $report_360_free
 *
 * @property-read User $user
 */
class Profile extends Model
{
    use HasUlids;

    protected $fillable = [
        'id',
        'user_id',
        'group_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }

    public function scopeSearch(Builder $query, string|null $search): Builder
    {
        if (!$search) {
            return $query;
        }
        return $query->whereHas('user', function (Builder $query) use ($search) {
            $query
                ->where('name', 'ilike', '%' . $search . '%')
                ->orWhere('email', 'ilike', '%' . $search . '%')
                ->orWhere('phone', 'ilike', '%' . $search . '%');
        });
    }
}
