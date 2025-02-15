<?php
namespace App\Models\Share;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    use HasUlids;
    protected $fillable = [
        'name',
        'guard_name',
        'title',
    ];
}
