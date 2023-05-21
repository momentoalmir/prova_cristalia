<?php

use App\Http\Controllers\CargoController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\FuncionarioController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Funcionários
Route::resource('/func', FuncionarioController::class)->except(['create', 'edit']);

// Empresas
Route::get('/empresas', [EmpresaController::class, 'index']);

// Cargos
Route::get('/cargos', [CargoController::class, 'index']);

// Ajuste de salários
Route::post('/ajuste/{percentual}/{bonus}', [FuncionarioController::class, 'ajustarSalarios']);

// Obter total de salários (salario_atual ou salario_anterior)
Route::get('/total/{salario}', [FuncionarioController::class, 'totalSalarios']);

