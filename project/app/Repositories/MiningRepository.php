<?php

namespace App\Repositories;

use App\Models\Mining;

/**
 * Class MiningRepository
 * @package App\Repositories
 */
class MiningRepository extends CoreCRUDRepository
{
    protected function model(): string
    {
        return Mining::class;
    }

    protected function withRelations(): array
    {
        return ['company'];
    }
}
