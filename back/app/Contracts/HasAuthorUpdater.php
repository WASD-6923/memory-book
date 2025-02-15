<?php

namespace App\Contracts;

use App\Models\User\User;
use Illuminate\Database\Eloquent\Model;

trait HasAuthorUpdater
{
    public static function bootHasAuthorUpdater(): void
    {
        self::creating(function (Model $model) {
            if (auth()->check()) {
                $model->created_by = auth()->id();
                $model->updated_by = auth()->id();
            } else {
                $admin = User::query()->role('admin')->first();
                $model->created_by = $admin->id;
                $model->updated_by = $admin->id;
            }
        });

        self::updating(function (Model $model) {
            if (auth()->check()) {
                $admin = User::query()->role('admin')->first();
                $model->updated_by = $admin->id;
            }
        });
    }
}
