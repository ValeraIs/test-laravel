<?php

namespace App\Repositories;

use App\Models\Company;

/**
 * Class CompanyRepository
 * @package App\Repositories
 */
class CompanyRepository extends CoreCRUDRepository
{
    protected function model(): string
    {
        return Company::class;
    }

    protected function withRelations(): array
    {
        return ['country'];
    }
}
