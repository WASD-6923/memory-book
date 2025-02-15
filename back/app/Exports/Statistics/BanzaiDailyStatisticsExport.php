<?php

namespace App\Exports\Statistics;

use App\Models\Statistics\BanzaiDailyStatistics;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class BanzaiDailyStatisticsExport implements FromQuery, WithMapping, WithHeadings, ShouldAutoSize, WithColumnFormatting,
                                             WithEvents
{

    use Exportable;

    public function __construct(protected array $args) {}

    public function headings(): array
    {
        return [
            'Дата',
            'Сегодня новых ру',
            'Сегодня новых en',
            'Сегодня новых всего',
            'Всего пользователей ru',
            'Всего пользователей en',
            'Тариф коммерческий ру',
            'Тариф коммерческий всего',
            'Кол-во успешных оплат ру',
            'Кол-во успешных оплат en',
            'Сумма оплат ру',
            'Сумма оплат всего',
            'Заказано переводов ру аккаунт',
            'Заказано переводов всего',
            'Запросы 360',
            'Переходы на jps',
            'Шаринг',
            'Мониторинг',
        ];
    }

    public function map($row): array
    {
        $r =  [
            $row->date?->format('Y-m-d'),
            $row->new_users_ru != 0 ? $row->new_users_ru : '0',
            $row->new_users_en != 0 ? $row->new_users_en : '0',
            $row->new_users != 0 ? $row->new_users : '0',
            $row->users_total_ru != 0 ? $row->users_total_ru : '0',
            $row->users_total_en != 0 ? $row->users_total_en : '0',
            $row->comm_tariff_ru != 0 ? $row->comm_tariff_ru : '0',
            $row->comm_tariff != 0 ? $row->comm_tariff : '0',
            $row->success_payments_ru != 0 ? $row->success_payments_ru : '0',
            $row->success_payments != 0 ? $row->success_payments : '0',
            $row->payments_ru != 0 ? $row->payments_ru : '0',
            $row->payments_en != 0 ? $row->payments_en : '0',
            $row->translations_ru != 0 ? $row->translations_ru : '0',
            $row->translations != 0 ? $row->translations : '0',
            $row->requests_360 != 0 ? $row->requests_360 : '0',
            $row->jps_visits != 0 ? $row->jps_visits : '0',
            $row->lots_shared != 0 ? $row->lots_shared : '0',
            $row->lots_monitoring != 0 ? $row->lots_monitoring : '0',
        ];
        Log::info('MAP', $r);
        return $r;
    }

    public function columnFormats(): array
    {
        return [
            'A' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'B' => NumberFormat::FORMAT_TEXT,
            'C' => NumberFormat::FORMAT_TEXT,
            'D' => NumberFormat::FORMAT_TEXT,
            'E' => NumberFormat::FORMAT_TEXT,
            'F' => NumberFormat::FORMAT_TEXT,
            'G' => NumberFormat::FORMAT_TEXT,
            'H' => NumberFormat::FORMAT_TEXT,
            'I' => NumberFormat::FORMAT_TEXT,
            'J' => NumberFormat::FORMAT_TEXT,
            'K' => NumberFormat::FORMAT_NUMBER_00,
            'L' => NumberFormat::FORMAT_NUMBER_00,
            'M' => NumberFormat::FORMAT_TEXT,
            'N' => NumberFormat::FORMAT_TEXT,
            'O' => NumberFormat::FORMAT_TEXT,
            'P' => NumberFormat::FORMAT_TEXT,
            'Q' => NumberFormat::FORMAT_TEXT,
            'R' => NumberFormat::FORMAT_TEXT,
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $headerCells = 'A1:R1';
                $event->sheet->getDelegate()->getStyle($headerCells)->getFont()->setBold(true);
                $event->sheet->getDelegate()->getStyle($headerCells)->getAlignment()->applyFromArray([
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                    'vertical' => Alignment::VERTICAL_CENTER,
                    'wrapText' => true,
                ]);
                $event->sheet->getDelegate()->setAutoFilter(
                    'A1:R1' . $event->sheet->getDelegate()->getHighestDataRow(),
                );
                $event->sheet->getDelegate()->freezePane('A2');
                $event->sheet->getDelegate()->getStyle(
                    'A2:R2' . $event->sheet->getDelegate()->getHighestDataRow(),
                )->getAlignment()->applyFromArray([
                    'vertical' => Alignment::VERTICAL_TOP,
                    'wrapText' => true,
                ]);
                $event->sheet->getDelegate()->getStyle(
                    'A2:R2' . $event->sheet->getDelegate()->getHighestDataRow(),
                )->applyFromArray([
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => Border::BORDER_THIN,
                            'color' => [
                                'rgb' => '808080',
                            ],
                        ],
                    ],
                ]);
            },
        ];
    }

    public function query()
    {
        Log::info('QUERY', $this->args['filter']);

        return BanzaiDailyStatistics::query()->filter($this->args['filter']);
    }

}
