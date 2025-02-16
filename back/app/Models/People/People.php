<?php

namespace App\Models\People;

use App\Contracts\HasAuthorUpdater;
use App\Enums\People\PeopleGender;
use App\Enums\People\PeopleStatus;
use App\Models\Address\Municipal;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Represents the People model.
 *
 * This model is used to work with data related to individuals, including details
 * such as personal information, military service details, awards, and biography.
 * It includes functionality for managing the author and updater of records.
 *
 * Relationships:
 * - BelongsTo: User (author)
 * - BelongsTo: User (updater)
 *
 * Fillable Attributes:
 * - first_name
 * - last_name
 * - middle_name
 * - birth_date
 * - date_of_death
 * - birth_place
 * - gender
 * - name_of_military_commissariat
 * - military_rank
 * - awards
 * - place_of_burial
 * - biography
 * - additional
 * - status
 * - created_by
 * - updated_by
 *
 * Type Casting:
 * - gender: PeopleGender
 * - status: PeopleStatus
 */
class People extends Model
{
    use HasFactory;
    use HasUlids;
    use HasAuthorUpdater;

    protected $table = 'peoples';

    protected $fillable = [
        'municipal_id',
        'first_name',
        'last_name',
        'middle_name',
        'birth_date',
        'date_of_death',
        'birth_place',
        'gender',
        'name_of_military_commissariat',
        'military_rank',
        'awards',
        'place_of_burial',
        'biography',
        'additional',
        'status',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'gender' => PeopleGender::class,
        'status' => PeopleStatus::class,
    ];

    /**
     * @return BelongsTo
     */
    public function municipal(): BelongsTo
    {
        return $this->belongsTo(Municipal::class, 'municipal_id');
    }

    /**
     * @return BelongsTo
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * @return BelongsTo
     */
    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function scopeSearch(Builder $query, string|null $search): Builder
    {
        if (!$search) {
            return $query;
        }
        return $query->where(function (Builder $query) use ($search) {
            $query
                ->where('first_name', 'ilike', '%' . $search . '%')
                ->orWhere('last_name', 'ilike', '%' . $search . '%')
                ->orWhere('middle_name', 'ilike', '%' . $search . '%');
        });
    }
}
