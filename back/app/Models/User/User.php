<?php

namespace App\Models\User;

use App\Enums\User\UserStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Collection;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Spatie\Permission\Traits\HasRoles;

/**
 * @property string $id
 *
 * @property string $country_code
 * @property UserStatus $status
 */
class User extends Authenticatable implements JWTSubject
{
    use HasFactory;
    use HasUlids;
    use HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'notification_email',
        'phone',
        'first_name',
        'last_name',
        'middle_name',
        'email_verified_at',
        'password',
        'remember_token',
        'status',
        'created_at',
        'updated_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = [
        'fullName',
    ];

    protected $casts = [
        'status' => UserStatus::class,
    ];

    public function getFullNameAttribute(): string
    {
        $fn = $this->phone . ', ' . $this->first_name . ' ' . $this->last_name . '.';
        if ($this->profile?->group?->name) {
            $fn .=  ', "' . $this->profile->group->name . '"';
        }
        return $fn;
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function scopeSearch(Builder $query, string|null $search): Builder
    {
        if (!$search) {
            return $query;
        }
        return $query->where(function (Builder $query) use ($search) {
            $query
                ->where('name', 'ilike', '%' . $search . '%')
                ->orWhere('email', 'ilike', '%' . $search . '%')
                ->orWhere('phone', 'ilike', '%' . $search . '%');
        });
    }

    public function scopeRoles(Builder $query, array $roles): Builder
    {
        if (empty($roles)) {
            return $query;
        }
        return $this->scopeRole($query, $roles);
    }

    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class, 'user_id', 'id');
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
