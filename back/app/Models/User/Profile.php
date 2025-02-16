<?php

namespace App\Models\User;

use App\Models\Address\Municipal;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Profile extends Model
{
    use HasUlids;

    protected $fillable = [
        'id',
        'user_id',
        'local_government',
        'name',
        'municipal_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function municipal(): BelongsTo
    {
        return $this->belongsTo(Municipal::class, 'municipal_id');
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
