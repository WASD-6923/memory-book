<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

/**
 * Trait Sortable
 * @package App\Contracts
 */
trait Sortable
{
    /**
     * @param Builder $query
     * @param array $params
     * @return Builder
     */
    public function scopeSort(Builder $query, array $params): Builder
    {
        $sortables = data_get($this, 'sortables', []);
        $customSortables = data_get($this, 'customSortables', []);
        $sort = $params['sort'] ?? null;

        if (!$sort) {
            return $query;
        }

        $direction = 'asc';
        if (str_starts_with($sort, '-')) {
            $direction = 'desc';
            $sort = str_replace('-', '', $sort);
        }

        if (in_array($sort, $sortables)) {
            return $query->orderBy($sort, $direction);
        }

        if (in_array($sort, $customSortables) && method_exists(__CLASS__, 'customSort')) {
            return $this->customSort($query, $sort, $direction);
        }

        return $query;
    }
}
