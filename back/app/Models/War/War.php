<?php

namespace App\Models\War;

use App\Enums\War\WarStatus;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class War extends Model
{
    use HasUlids;
    use HasFactory;

    protected $table = 'wars';
    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'description',
        'reason',
        'status',
    ];

    protected $casts = [
        'status' => WarStatus::class,
    ];
}
