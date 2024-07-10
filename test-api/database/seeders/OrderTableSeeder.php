<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class OrderTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $products = \App\Models\Product::all();

        $order = \App\Models\Order::create([
            'customer_id' => rand(1,3),
            'total_price' => $products->sum(function ($product) {
                return $product->price;
            }),
        ]);

        foreach ($products as $product) {
            $order->products()->attach($product->id, [
                'quantity' => 1,
                'price' => $product->price,
            ]);
        }
    }
}
