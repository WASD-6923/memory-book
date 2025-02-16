<?php

namespace Database\Seeders;

use App\Enums\Address\MunicipalType;
use App\Models\Address\Municipal;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class MunicipalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $file = Storage::disk('local')->get('seeders/municipals.json');
        // Распарсить JSON в массив
        $municipals = json_decode($file, true);

        // Проверить валидность структуры
        if (!is_array($municipals)) {
            $this->command->error('Invalid JSON format in municipal.json');
            return;
        }
        Municipal::query()->truncate();
        // Сохранить данные в таблицу
        foreach ($municipals as $municipalData) {
            Municipal::query()->Create([
                'name' => $municipalData['name'],
                'type' => MunicipalType::from($municipalData['type']),
            ]);
        }

        $this->command->info('Municipalities have been successfully seeded.');
    }
}
