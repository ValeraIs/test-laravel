<?php

namespace App\Response;

use Illuminate\Http\Resources\Json\PaginatedResourceResponse;

/**
 * Class CustomPaginatedResourceResponse
 * @package App\Response
 */
class CustomPaginatedResourceResponse extends PaginatedResourceResponse
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
            array_merge_recursive(
                $this->paginationInformation($request),
                $this->resource->with($request),
                $this->resource->additional
            )
        );
    }
}
