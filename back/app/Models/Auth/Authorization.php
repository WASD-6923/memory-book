<?php

namespace App\Models\Auth;

use App\Enums\Auth\AuthProvider;
use App\Enums\Auth\AuthStage;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property string $id
 * @property string $user_id
 * @property string $phone
 * @property string $code
 * @property boolean $status
 * @property AuthProvider $provider
 * @property string $key
 * @property string $email
 * @property string $password
 * @property AuthStage $stage
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $country_code
 */
class Authorization extends Model
{
    use HasUlids;

    protected $table = 'authorizations';
    protected $fillable = [
        'user_id',
        'phone',
        'code',
        'status',
        'provider',
        'key',
        'email',
        'password',
        'stage',
        'country_code',
    ];

    protected $casts = [
        'provider' => AuthProvider::class,
        'status' => 'boolean',
        'stage' => AuthStage::class,
    ];
}
