<?php

namespace App\Models\Share;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class ModelHasRole extends Model
{
    use HasUlids;

    public $timestamps = false;
    public $incrementing = false;
    protected $table = 'model_has_roles';
    protected $fillable = [
        'role_id',
        'model_type',
        'model_id',
    ];
}
