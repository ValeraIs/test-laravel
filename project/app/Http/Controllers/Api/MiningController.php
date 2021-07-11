<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\MiningRequest;
use App\Http\Resources\MiningResource;
use App\Repositories\MiningRepository;

/**
 * Class MiningController
 * @package App\Http\Controllers\Api
 */
class MiningController extends CoreCRUDController
{
    /**
     * MiningController constructor.
     *
     * @param MiningRepository $repository
     */
    public function __construct(MiningRepository $repository)
    {
        parent::__construct($repository);
    }

    protected function requestClass(): string
    {
        return MiningRequest::class;
    }

    protected function resourceClass(): string
    {
        return MiningResource::class;
    }
}
