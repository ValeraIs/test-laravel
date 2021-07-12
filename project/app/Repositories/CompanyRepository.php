<?php

namespace App\Repositories;

use App\Exceptions\DeleteException;
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

    public function delete(): ?bool
    {
        if ($this->isAllowToDelete()) {
            return parent::delete();
        } else {
            throw new DeleteException('This company has relations');
        }
    }

    private function isAllowToDelete(): bool
    {
        return $this->model
                ->mining()
                ->exists() === false;
    }
}
