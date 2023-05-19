<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FuncionariosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('funcionarios')->insert([
            ['empresa' => 1, 'RE' => 1245, 'nome' => 'Maria da Silva', 'cargo' => 6, 'status' => 'A'],
            ['empresa' => 1, 'RE' => 584, 'nome' => 'Benedito Costa', 'cargo' => 10, 'status' => 'A'],
            ['empresa' => 2, 'RE' => 847, 'nome' => 'Joaquim Barbosa', 'cargo' => 3, 'status' => 'A'],
            ['empresa' => 1, 'RE' => 54, 'nome' => 'Antonio Pereira', 'cargo' => 7, 'status' => 'D'],
            ['empresa' => 1, 'RE' => 84, 'nome' => 'Joao Gomes', 'cargo' => 9, 'status' => 'A'],
            ['empresa' => 2, 'RE' => 658, 'nome' => 'Luis Montanha', 'cargo' => 7, 'status' => 'A'],
            ['empresa' => 1, 'RE' => 841, 'nome' => 'Isabel Silva', 'cargo' => 9, 'status' => 'D']
        ]);
    }
}
