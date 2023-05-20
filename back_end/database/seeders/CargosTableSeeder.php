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
            [ 'descricao' => 'Jardineiro'],
            [ 'descricao' => 'Operador de Produção'],
            [ 'descricao' => 'Analista Fiscal'],
            [ 'descricao' => 'Auxiliar de escritorio'],
            [ 'descricao' => 'Mecanico'],
            [ 'descricao' => 'Analista de Sistemas'],
            [ 'descricao' => 'Gerente'],
            [ 'descricao' => 'Diretor'],
            [ 'descricao' => 'Porteiro'],
            [ 'descricao' => 'Analista de RH']
        ]);
    }
}
