<?php declare(strict_types=1);

namespace App\GraphQL\Queries\Statistics;

use App\Exports\Statistics\BanzaiDailyStatisticsExport;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Excel;

final readonly class BanzaiDailyStatisticsExportToXLS
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        Log::info('BanzaiDailyStatisticsExportToXLS', $args);
        $export = new BanzaiDailyStatisticsExport($args);
        Log::info('Export ok');
        $export->store('statistics.xlsx', 'public', Excel::XLSX);

        return [
            'path' => env('APP_URL') . Storage::url('statistics.xlsx')
        ];
    }
}
