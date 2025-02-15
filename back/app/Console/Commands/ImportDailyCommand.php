<?php

namespace App\Console\Commands;

use App\Models\Daily\Daily;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ImportDailyCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:import-daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Импорт ежедневника';

    /**
     * Execute the console command.
     * @throws \Exception
     */
    public function handle()
    {
        Daily::query()->truncate();
        $file = Storage::disk('local')->get('daily/daily.json');
        $data = json_decode($file, true);
        $i = 0;
        foreach ($data as $item) {
            $d = $this->getDescriptionAndSources($item['epigraph']);
            $dConverted = $this->convertDate($item['date']);
            $result = [
                'date' => $dConverted === '02-29' ? '2024-02-29' : '2025-' . $dConverted,
                'name' => str_replace(["\n", "«", "»"], [' ', '', ''], $item['title']),
                'description' => str_replace("\n", ' ', $d['description']),
                'sources' => $d['sources'],
                'content' => str_replace("\n", ' ', $item['main_text']),
            ];
            //Log::info('Import daily', $result);
            Daily::query()->create($result);
            //if ($i++ == 59) break;
        }
        //
    }

    protected function getDescriptionAndSources(string $epigraph): array
    {
// Разделяем строку по переводам строки
        $parts = explode("\n", $epigraph);

        // Если строк меньше 3, то заполняем поля соответствующим образом
        if (count($parts) <= 2) {
            return [
                'description' => $parts[0] ?? '',
                'sources' => $parts[1] ?? ''
            ];
        }

        // Последние два элемента — sources, остальное — description
        $description = implode("\n", array_slice($parts, 0, -2));
        $sources = implode("\n", array_slice($parts, -2));

        return [
            'description' => $description,
            'sources' => $sources
        ];
    }

    protected function convertDate(string $date): string
    {
        $months = [
            'января' => '01',
            'февраля' => '02',
            'марта' => '03',
            'апреля' => '04',
            'мая' => '05',
            'июня' => '06',
            'июля' => '07',
            'августа' => '08',
            'сентября' => '09',
            'октября' => '10',
            'ноября' => '11',
            'декабря' => '12',
        ];

        // Разбираем строку
        $parts = explode(' ', $date);

        // Проверяем массив на корректность
        if (count($parts) !== 2 || !isset($months[$parts[1]])) {
            throw new \Exception('Некорректный формат даты: ' . $date);
        }

        $day = $parts[0];
        $month = $months[$parts[1]];

        // Создаем дату на основе года 2025 (можно заменить)
        return "$month-" . str_pad($day, 2, '0', STR_PAD_LEFT);
    }
}
