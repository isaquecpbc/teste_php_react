<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Product as ProductResource;

class Product extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'                        => $this->id,
            'name'                      => $this->name,
            'description'               => $this->description,
            'price'                     => $this->price,
            'stock'                     => $this->stock,
            'images'                    => $this->images,
            'created_at'                => $this->created_at->format('d/m/Y'),
            'updated_at'                => $this->updated_at->format('d/m/Y'),
        ];
    }
}
