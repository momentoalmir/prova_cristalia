<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CargosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('cargos')->insert([
            ['codigo' => 1, 'descricao' => 'Jardineiro'],
            ['codigo' => 2, 'descricao' => 'Operador de Produção'],
            ['codigo' => 3, 'descricao' => 'Analista Fiscal'],
            ['codigo' => 4, 'descricao' => 'Auxiliar de escritorio'],
            ['codigo' => 5, 'descricao' => 'Mecanico'],
            ['codigo' => 6, 'descricao' => 'Analista de Sistemas'],
            ['codigo' => 7, 'descricao' => 'Gerente'],
            ['codigo' => 8, 'descricao' => 'Diretor'],
            ['codigo' => 9, 'descricao' => 'Porteiro'],
            ['codigo' => 10, 'descricao' => 'Analista de RH']
        ]);
    }
}
