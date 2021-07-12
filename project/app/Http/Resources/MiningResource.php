<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MiningResource extends JsonResource
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
            'mined' => $this->resource->mined,
            'date_mined' => $this->resource->date_mined->getPreciseTimestamp(3),
            'created_at' => $this->resource->created_at ?
                $this->resource->created_at->getPreciseTimestamp(3) : null,
            'updated_at' => $this->resource->updated_at ?
                $this->resource->updated_at->getPreciseTimestamp(3) : null,
            'relations' => [
                'company' => $this->whenLoaded('company', function () {
                    return new CompanyResource($this->resource->company);
                }),
            ],
        ];
    }
}
