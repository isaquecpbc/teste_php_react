<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Customer as CustomerResource;

class Customer extends JsonResource
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
            'reason_social'             => $this->reason_social,
            'cnpj'                      => $this->cnpj,
            'email'                     => $this->email,
            'created_at'                => $this->created_at->format('d/m/Y'),
            'updated_at'                => $this->updated_at->format('d/m/Y'),
            'num_orders'                => $this->orders->count(),
            'orders'                    => $this->orders,
        ];
    }
}
