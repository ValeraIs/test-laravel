<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\CountryRequest;
use App\Http\Resources\CountryResource;
use App\Repositories\CountryRepository;

/**
 * Class CountryController
 * @package App\Http\Controllers\Api
 */
class CountryController extends CoreCRUDController
{
    /**
     * CountryController constructor.
     *
     * @param CountryRepository $repository
     */
    public function __construct(CountryRepository $repository)
    {
        parent::__construct($repository);
    }

    protected function requestClass(): string
    {
        return CountryRequest::class;
    }

    protected function resourceClass(): string
    {
        return CountryResource::class;
    }
}
