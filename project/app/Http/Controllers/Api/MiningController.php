<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\MiningSeedJob;

/**
 * Class MiningController
 * @package App\Http\Controllers\Api
 */
class MiningController extends Controller
{
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
