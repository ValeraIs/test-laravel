<?php

namespace App\Repositories;

use App\Exceptions\DeleteException;
use App\Models\Country;

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

    private function isAllowToDelete(): bool
    {
        return $this->model
                ->companies()
                ->exists() === false;
    }
}
