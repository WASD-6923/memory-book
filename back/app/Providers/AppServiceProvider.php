<?php

namespace App\Providers;

use App\Enums\Auth\AuthMethod;
use App\Enums\Auth\AuthProvider;
use App\Enums\Auth\AuthStage;
use App\Enums\Location\LocationStatus;
use App\Enums\Location\LocationType;
use App\Enums\Transaction\TransactionCategory;
use App\Enums\Transaction\TransactionType;
use App\Enums\User\PermissionGroup;
use App\Enums\User\UserStatus;
use App\Models\Location\Location;
use App\Models\Location\LocationEvent;
use App\Models\User\Profile;
use App\Models\User\User;
use App\Policies\User\UserPolicy;
use GraphQL\Type\Definition\PhpEnumType;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Nuwave\Lighthouse\Schema\TypeRegistry;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $typeRegistry = app(TypeRegistry::class);
        $typeRegistry->register(new PhpEnumType(PermissionGroup::class));
        $typeRegistry->register(new PhpEnumType(UserStatus::class));
        $typeRegistry->register(new PhpEnumType(AuthProvider::class));
        $typeRegistry->register(new PhpEnumType(AuthMethod::class));
        $typeRegistry->register(new PhpEnumType(AuthStage::class));
        $typeRegistry->register(new PhpEnumType(TransactionCategory::class));
        $typeRegistry->register(new PhpEnumType(TransactionType::class));
        $typeRegistry->register(new PhpEnumType(LocationType::class));
        $typeRegistry->register(new PhpEnumType(LocationStatus::class));
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (env('APP_FORCE_HTTPS')) {
            URL::forceScheme('https');
        }

        Relation::enforceMorphMap(
            [
                'user' => User::class,
                'location' => Location::class,
                'locationEvent' => LocationEvent::class,
                'profile' => Profile::class,
            ],
        );
        if (env('SHOW_SQL_LOG')) {
            DB::listen(function ($query) {
                Log::info(
                    $query->sql,
                    $query->bindings,
                );
            });
        }
        //$this->registerPolicies();
        Gate::before(function ($user, $ability) {
            if ($user->hasRole('admin')) {
                return true;
            }
            return null;
        });
        Gate::policy(User::class, UserPolicy::class);
    }
}
