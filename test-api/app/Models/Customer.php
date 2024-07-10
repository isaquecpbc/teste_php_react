<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'reason_social',
        'cnpj',
        'email',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
      
}
