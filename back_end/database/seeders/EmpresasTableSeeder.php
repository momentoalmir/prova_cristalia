<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmpresasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('empresas')->insert([
            ['nome' => 'Empresa 1'],
            ['nome' => 'Empresa 2'],
            ['nome' => 'Empresa 3'],
            ['nome' => 'Empresa 4'],
            ['nome' => 'Empresa 5']
        ]);
    }
}
