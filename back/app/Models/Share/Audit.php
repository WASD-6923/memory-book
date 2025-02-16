<?php

namespace App\Models\Share;

use App\Contracts\HasModelFilter;
use App\Contracts\Sortable;
use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use OwenIt\Auditing\Models\Audit as OwenAudit;

class Audit extends OwenAudit
{
    use HasUlids;
    use HasModelFilter;
    use Filterable;
    use Sortable;


    protected $hidden = [
        'user',
    ];

    protected $fillable = [
        'user_type',
        'user_id',
        'event',
        'auditable_type',
        'auditable_id',
        'old_values',
        'new_values',
        'url',
        'ip_address',
        'user_agent',
        'tags',
    ];

    protected $casts = [
        'user_id' => 'string',
        'old_values' => 'array',
        'new_values' => 'array',
    ];
}
