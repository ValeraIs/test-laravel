<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\CompanyRequest;
use App\Http\Resources\CompanyResource;
use App\Repositories\CompanyRepository;

/**
 * Class CompanyController
 * @package App\Http\Controllers\Api
 */
class CompanyController extends CoreCRUDController
{
    /**
     * CompanyController constructor
     *
     * @param CompanyRepository $repository
     */
    public function __construct(CompanyRepository $repository)
    {
        parent::__construct($repository);
    }

    protected function requestClass(): string
    {
        return CompanyRequest::class;
    }

    protected function resourceClass(): string
    {
        return CompanyResource::class;
    }
}
