<?php

namespace App\Models\Address;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $id
 * @property string $name
 * @property string $region_id
 * @property string $time_zone
 *
 * @property-read Region $region
 */
class City extends Model
{
    use HasUlids;

    protected $table = 'cities';

    protected $fillable = [
        'name',
        'region_id',
        'time_zone',
    ];

    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class);
    }
}
