<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Validator;
use App\Http\Controllers\BaseController as BaseController;
use App\Http\Resources\Customer as CustomerResource;

class CustomerController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $customers = Customer::get();
        // dd($customers);

        return $this->sendResponse(CustomerResource::collection($customers), 'Customers Retrieved Successfully.');
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCustomerRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
   
        $validator = Validator::make($input, [
            'reason_social'     => ['required', 'string', 'max:255'],
            'cnpj'              => ['required', 'string', 'max:14'],
            'email'             => ['required', 'string', 'max:255'],
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
   
        $customer = Customer::create($input);
   
        return $this->sendResponse(new CustomerResource($customer), 'Customer Created Successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $customer = Customer::find($id);
  
        if (is_null($customer)) {
            return $this->sendError('Customer not found.');
        }
   
        return $this->sendResponse(new CustomerResource($customer), 'Customer Retrieved Successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCustomerRequest  $request
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $input = $request->all();
   
        $validator = Validator::make($input, [
            'reason_social'     => ['required', 'string', 'max:255'],
            'cnpj'              => ['required', 'string', 'max:14'],
            'email'             => ['required', 'string', 'max:255'],
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
        $customer = Customer::find($id);   
        $customer->reason_social    = $input['reason_social'];
        $customer->cnpj             = $input['cnpj'];
        $customer->email            = $input['email'];
        $customer->save();
   
        return $this->sendResponse(new CustomerResource($customer), 'Customer Updated Successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $customer = Customer::find($id);
        $customer->delete();
   
        return $this->sendResponse([], 'Customer Deleted Successfully.');
    }
}
