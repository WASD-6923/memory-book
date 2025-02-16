<?php

namespace App\Models\Address;

use App\Enums\Address\MunicipalType;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Municipal extends Model
{
    use HasUlids;

    protected $table = 'municipals';

    protected $fillable = [
        'region_id',
        'name',
        'type',
    ];

    protected $casts = [
        'type' => MunicipalType::class,
    ];
}
