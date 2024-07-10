<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Order as OrderResource;

class Order extends JsonResource
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
            'customer_id'               => $this->customer_id,
            'total_price'               => $this->total_price,
            'created_at'                => $this->created_at->format('d/m/Y'),
            'updated_at'                => $this->updated_at->format('d/m/Y'),
            'customer'                  => $this->customer,
            'products'                  => $this->products,
        ];
    }
}
