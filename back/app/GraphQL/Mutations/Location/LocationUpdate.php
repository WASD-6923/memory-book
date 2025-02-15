<?php declare(strict_types=1);

namespace App\GraphQL\Mutations\Location;

use App\Models\Attachment\Attachment;
use App\Models\Location\Location;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

final readonly class LocationUpdate
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        Log::info('LocationUpdate', $args);

        $location = Location::query()->find($args['id']);
        $data =Arr::except($args, ['id', 'files']);
        $location->update($data);

        $files = Arr::get($args, 'files');
        if (is_array($files)) {
            // Папка для файлов локации
            $locationFolder = "locations/{$location->id}";

            foreach ($files as $file) {
                $fileParts = explode('/', $file);

                // Целевой путь к файлу (в папке locations/{locationId})
                $destinationPath = "{$locationFolder}/{$fileParts[1]}";

                Log::info('$file ' . $fileParts[1]);
                Log::info('dest ' . $destinationPath);
                // Перемещаем файл с помощью Storage
                if (Storage::disk('public')->exists($file)) {
                    Storage::disk('public')->move($file, $destinationPath);

                    // Создаем запись Attachment
                    Attachment::query()->create([
                        'type' => 0,
                        'attached_type' => 'location',
                        'attached_id' => $location->id,
                        'name' => Storage::url($destinationPath), // URL для доступа к файлу
                        'path' => $destinationPath, // Относительный путь в Storage
                    ]);
                } else {
                    // Логируем ошибку, если файл не найден
                    Log::error("Файл не найден: {$file}");
                }
            }
        }

        return $location;
    }
}
