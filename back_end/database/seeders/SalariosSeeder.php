<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SalariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $salarios = [
            [
                'RE' => 84,
                'salario_atual' => 1000,
                'salario_anterior' => 988,
            ],
            [
                'RE' => 584,
                'salario_atual' => 1250,
                'salario_anterior' => 1117,
            ],
            [
                'RE' => 658,
                'salario_atual' => 1754,
                'salario_anterior' => 1500,
            ],
            [
                'RE' => 847,
                'salario_atual' => 3400,
                'salario_anterior' => 3000,
            ],
            [
                'RE' => 1245,
                'salario_atual' => 2100,
                'salario_anterior' => 1800,
            ],
        ];

        foreach ($salarios as $salario) {
            DB::table('funcionarios')
                ->where('RE', $salario['RE'])
                ->update([
                    'salario_atual' => $salario['salario_atual'],
                    'salario_anterior' => $salario['salario_anterior'],
                ]);
        }
    }
}
