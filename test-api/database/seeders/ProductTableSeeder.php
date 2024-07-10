<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        \App\Models\Product::create([
            'name' => 'Casa Velha',
            'description' => 'Uma casa velha, mas com muitas lembraças.',
            'price' => 10000,
            'stock' => 10,
        ]);
        \App\Models\Product::create([
            'name' => 'Iate Scape from L.A.',
            'description' => 'O Iate usado pela grande estrela de Holywood BoJack está a venda. Acompanha guincho caso não tenha mar na sua cidade.',
            'price' => 101750,
            'stock' => 10,
        ]);
        \App\Models\Product::create([
            'name' => 'Sueter Azul',
            'description' => 'Tricot trabalhado em grade moderno, produzido artesanalmente. Feito em dois cabos 100% algodão de alta qualidade, estonado em tinturaria. Gola redonda. Estilo, conforto e elegância para os dias mais frios. 100% algodão.',
            'price' => 750,
            'stock' => 10,
        ]);
        \App\Models\Product::create([
            'name' => 'Tesla amarelo conversível',
            'description' => 'Apresentado em 2017 como carro-conceito, o Tesla Roadster de segunda geração ainda não saiu do papel. Atenção: O carro não funciona na piscina.',
            'price' => 750,
            'stock' => 10,
        ]);
        \App\Models\Product::create([
            'name' => 'Rifle blaster F-11D',
            'description' => 'O Rifle Blaster F-11D era um rifle blaster fabricado pela Corporação Sonn-Blas. Serviu como a arma padrão dos Stormtroopers da Primeira Ordem.',
            'price' => 4680.41,
            'stock' => 10,
        ]);
        \App\Models\Product::create([
            'name' => 'Canhão de plasma eletromagnético',
            'description' => 'O canhão de plasma eletromagnético foi um canhão utilizado pela Milícia Umbarana por seu canhão pesado móvel e por seu canhão suspenso.
Com apenas um tiro desse canhão, era possível dizimar um pelotão inteiro de soldados.',
            'price' => 25023.78,
            'stock' => 10,
        ]);
        \App\Models\Product::create([
            'name' => 'Emissor sônico',
            'description' => 'O emissor sônico foi um tipo de dispositivo anti vida-selvagem usado durante a Guerra Civil Jedi criado por Caal Jordan na Estação Hrakert. Esse dispositivo foi criado para emitir um poderoso pulso sonoro, e foi muito útil para atordoar animais selvagens. Ele provou ser letal para tubarões firaxan que patrulhavam as águas perto da Estação Hrakert da Velha República em Manaan. Normalmente, o dispositivo teria um alcance limitado, mas em ambientes subaquáticos, como em Manaan, o alcance seria amplificado. O emissor foi projetado para ser usado em conjunto com a roupa de pressão, e ser usado quando a vida selvagem era muito próxima. Revan encontrou um na Estação Hrakert e ele provou ser um equipamento vital para que ele encontrasse o Mapa Estelar no fundo do oceano.
O emissor sônico também foi usado décadas depois em Taris para repelir a vida selvagem das rotas de abastecimento.',
            'price' => 2363.86,
            'stock' => 10,
        ]);
        \App\Models\Product::create([
            'name' => 'Canhão repetidor pesado',
            'description' => 'O canhão repetidor pesado era um grande blaster usado pelo assassino autônomo e rebelde, Baze Malbus durante o roubo dos planos da Estrela da Morte.[1] Ela era boa tanto em tiro de precisão como em combate a curta distância.',
            'price' => 15050.12,
            'stock' => 10,
        ]);
        \App\Models\Product::create([
            'name' => 'Sabre de luz',
            'description' => 'O sabre de luz, muitas vezes chamado de espada laser, foi uma arma usada pelos Jedi e pelos Sith. Sabres de luz consistiam de uma lâmina de plasma alimentada por um cristal kyber e normalmente emitida por um cabo metálico. Era uma arma que requeria habilidade de treino, e era muito melhorada em combate quando usada em conjunto com a Força. Embora também fosse usado pelos Sith, o sabre de luz era sinônimo com Jedi, em que algumas partes da galáxia acreditavam que apenas os Jedi usavam essa arma.',
            'price' => 15050.12,
            'stock' => 10,
        ]);
    }
}
