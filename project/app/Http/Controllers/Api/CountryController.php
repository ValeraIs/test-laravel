<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\CountryRequest;
use App\Http\Requests\ReportRequest;
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

    /**
     * Get report mined by month
     *
     * @return \App\Response\ServerResponse
     */
    public function report(ReportRequest $request)
    {
        return $this->serverResponse()
            ->resource($this->repository->reportByMonth($request->get('date_mined')));
    }
}
