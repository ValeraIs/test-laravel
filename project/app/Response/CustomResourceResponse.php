<?php

namespace App\Response;

use Illuminate\Http\Resources\Json\ResourceResponse;

/**
 * Class CustomResourceResponse
 * @package App\Response
 */
class CustomResourceResponse extends ResourceResponse
{

    /**
     * Return the content for response.
     *
     * @param $request
     *
     * @return array
     */
    public function getResponseContent($request): array
    {
        return $this->wrap(
            $this->resource->resolve($request),
            $this->resource->with($request),
            $this->resource->additional
        );
    }
}
