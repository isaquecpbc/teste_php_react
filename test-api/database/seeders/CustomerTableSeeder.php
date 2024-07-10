<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CustomerTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        \App\Models\Customer::create([
            'reason_social' => 'ISAQUE CESAR PALMIERI',
            'cnpj' => '45583086000160',
            'email' => 'isaquecpbc@gmail.com.br',
        ]);
        // 2
        \App\Models\Customer::create([
            'reason_social' => 'RANDON SA IMPLEMENTOS E PARTICIPACOES',
            'cnpj' => '89086144000469',
            'email' => 'randon@gmail.com.br',
        ]);
        // 3
        \App\Models\Customer::create([
            'reason_social' => 'SANTOS FUTEBOL CLUBE',
            'cnpj' => '58196684000129',
            'email' => 'santosfc@gmail.com.br',
        ]);
    }
}
