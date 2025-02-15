<?php

namespace App\Contracts;

use Illuminate\Support\Facades\Storage;

trait NeedAssetUrl
{
    public function assetUrl(?string $path): ?string
    {
        return $path ? config('app.url') . Storage::url($path) : null;
    }
}
