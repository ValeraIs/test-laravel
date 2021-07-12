<?php

namespace App\Repositories;

use App\Exceptions\DeleteException;
use App\Models\Country;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

/**
 * Class CountryRepository
 * @package App\Repositories
 */
class CountryRepository extends CoreCRUDRepository
{
    protected function model(): string
    {
        return Country::class;
    }

    public function delete(): ?bool
    {
        if ($this->isAllowToDelete()) {
            return parent::delete();
        } else {
            throw new DeleteException('This country has relations');
        }
    }

    /**
     * Get countries mining by month
     *
     * @param $date
     *
     * @return mixed
     */
    public function reportByMonth($date)
    {
        $date = new Carbon($date);

        return Country::select(['countries.id', 'countries.name', DB::raw('SUM(minings.mined) as mined'),'countries.plan'])
            ->join('companies', 'countries.id', '=', 'companies.country_id')
            ->crossJoin('minings', 'companies.id', '=', 'minings.company_id')
            ->whereMonth('minings.date_mined', '=', $date->month)
            ->whereYear('minings.date_mined', '=', $date->year)
            ->groupBy('countries.id')
            ->havingRaw('mined > countries.plan')
            ->get();
    }

    private function isAllowToDelete(): bool
    {
        return $this->model
                ->companies()
                ->exists() === false;
    }
}
