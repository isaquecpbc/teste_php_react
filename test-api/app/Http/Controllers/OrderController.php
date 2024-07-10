<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Customer;
use App\Models\Product;
use Illuminate\Http\Request;
use Validator;
use App\Http\Controllers\BaseController as BaseController;
use App\Http\Resources\Order as OrderResource;

class OrderController extends BaseController
{
    public function index()
    {
        $orders = Order::get();
        
        return $this->sendResponse(OrderResource::collection($orders), 'Orders Retrieved Successfully.');
    }

    public function store(Request $request)
    {
        $input = $request->all();

        $validatedInput = Validator::make($input, [
            'customer_id' => ['required', 'exists:customers,id'],
            'products' => ['required', 'array'],
            'products.*.id' => ['required', 'exists:products,id'],
            'products.*.quantity' => ['required', 'integer', 'min:1'],
            'products.*.price' => ['required', 'numeric'],
        ]);
        
        $order = Order::create([
            'customer_id' => $input['customer_id'],
            'total_price' => collect($input['products'])->sum(function ($product) {
                return (double)$product['price'] * (int)$product['quantity'];
            }),
        ]);

        foreach ($input['products'] as $product) {
            $order->products()->attach($product['id'], [
                'quantity' => $product['quantity'],
                'price' => $product['price'],
            ]);
        }

        return $this->sendResponse(new OrderResource($order), 'Order Created Successfully.');
    }

    public function show($id)
    {
        $order = Order::with('customer', 'products')->findOrFail($id);
  
        if (is_null($order)) {
            return $this->sendError('Order not found.');
        }
   
        return $this->sendResponse(new OrderResource($order), 'Order Retrieved Successfully.');
    }

    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $input = $request->all();

        $validatedInput = Validator::make($input, [
            'customer_id' => ['required', 'exists:customers,id'],
            'products' => ['required', 'array'],
            'products.*.id' => ['required', 'exists:products,id'],
            'products.*.quantity' => ['required', 'integer', 'min:1'],
            'products.*.price' => ['required', 'numeric'],
        ]);

        if (isset($input['customer_id'])) {
            $order->customer_id = $input['customer_id'];
        }

        if (isset($input['products'])) {
            $order->products()->detach();
            $order->total_price = collect($input['products'])->sum(function ($product) {
                return $product['price'] * $product['quantity'];
            });
            foreach ($input['products'] as $product) {
                $order->products()->attach($product['id'], [
                    'quantity' => $product['quantity'],
                    'price' => $product['price'],
                ]);
            }
        }

        $order->save();

        return $this->sendResponse(new OrderResource($order), 'Order Updated Successfully.');
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->products()->detach();
        $order->delete();
   
        return $this->sendResponse([], 'Product Deleted Successfully.');
    }
}

