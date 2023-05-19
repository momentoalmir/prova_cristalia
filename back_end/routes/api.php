<?php

use App\Http\Controllers\FuncionarioController;
use Illuminate\Http\Request;
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

// Ajuste de salários
Route::post('/ajuste/{percentual}/{bonus}', [FuncionarioController::class, 'ajustSalaries']);

// Cargos
Route::resource('/cargo', CargoController::class)->except(['create', 'edit']);
