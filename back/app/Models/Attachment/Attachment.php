<?php

namespace App\Models\Attachment;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

/**
 * @property string $id
 * @property string $type
 * @property string $attached_type
 * @property string $attached_id
 * @property string $name
 * @property string $path
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class Attachment extends Model
{
    use HasUlids;

    protected $table = 'attachments';
    protected $fillable = ['type', 'attached_type', 'attached_id', 'name', 'path'];

    protected $appends = ['url'];

    public function attachable(): MorphTo
    {
        return $this->morphTo();
    }

    public function getUrlAttribute(): string
    {
        return Storage::url($this->path);
    }
}
