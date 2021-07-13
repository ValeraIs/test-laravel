<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\MiningResource;
use App\Jobs\MiningSeedJob;
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
        return '';
    }

    protected function resourceClass(): string
    {
        return MiningResource::class;
    }

    /**
     * Generate random mining data
     *
     * @return \Illuminate\Http\Response
     */
   public function generateData()
   {
       MiningSeedJob::dispatch();

       return $this->serverResponse()
           ->data([])
           ->send();
   }
}
