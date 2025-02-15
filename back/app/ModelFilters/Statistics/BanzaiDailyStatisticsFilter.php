<?php

namespace App\ModelFilters\Statistics;

use EloquentFilter\ModelFilter;

class BanzaiDailyStatisticsFilter extends ModelFilter
{
    /**
    * Related Models that have ModelFilters as well as the method on the ModelFilter
    * As [relationMethod => [input_key1, input_key2]].
    *
    * @var array
    */
    public $relations = [];

    public function startDate(string $value): BanzaiDailyStatisticsFilter
    {
        return $this->where('date', '>=', $value);

    }

    public function endDate(string $value): BanzaiDailyStatisticsFilter
    {
        return $this->where('date', '<=', $value);

    }
}
