<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CountryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->resource->id,
            'name' => $this->resource->name,
            'plan' => $this->resource->plan,
            'created_at' => $this->resource->created_at ?
                $this->resource->created_at->getPreciseTimestamp(3) : null,
            'updated_at' => $this->resource->updated_at ?
                $this->resource->updated_at->getPreciseTimestamp(3) : null,
        ];
    }
}
