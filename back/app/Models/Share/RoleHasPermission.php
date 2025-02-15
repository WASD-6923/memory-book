<?php

namespace App\Models\Share;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class RoleHasPermission extends Model
{
   // use HasUlids;

    public $timestamps = false;
    public $incrementing = false;
    protected $table = 'role_has_permissions';
    protected $fillable = [
        'permission_id',
        'role_id',
    ];
}
