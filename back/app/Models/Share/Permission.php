<?php
namespace App\Models\Share;

use App\Enums\User\PermissionGroup;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Spatie\Permission\Models\Permission as SpatiePermission;

class Permission extends SpatiePermission
{
    use HasUlids;

    protected $fillable = [
        'name',
        'guard_name',
        'group',
    ];

    protected $casts = [
        'group' => PermissionGroup::class,
    ];
}
