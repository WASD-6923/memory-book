<?php

namespace App\Models\Address;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string $id
 * @property string $name
 *
 * @property-read City[] $cities
 */
class Region extends Model
{
    use HasUlids;

    protected $table = 'regions';

    protected $fillable = [
        'name',
    ];

    public function cities(): HasMany {
        return $this->hasMany(City::class);
    }
}
