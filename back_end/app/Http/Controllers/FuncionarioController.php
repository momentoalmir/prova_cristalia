<?php

namespace App\Http\Controllers;

use App\Http\Resources\FuncionarioResource;
use App\Models\Funcionario;
use Illuminate\Http\Request;

class FuncionarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $func = Funcionario::with('cargo', 'empresa')
            ->where('status', 'A')->get();

        return response()->json($func);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $func = Funcionario::create($request->all());
        return response()->json($func);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $RE = $request->input('RE');
        $func = Funcionario::where('RE', $RE)
                    ->update($request->all());
        return response()->json($func);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $RE = $request->input('RE');
        $func = Funcionario::where('RE', $RE)
                    ->update(['status' => 'I']);
        return response()->json($func);
    }

    /**
     * Ajust salaries.
     */
    public function ajustSalaries(float $percentual, float $bonus)
    {
        $funcionarios = Funcionario::all();

        foreach ($funcionarios as $funcionario) {
            $salarioAtual = $funcionario->salario_atual;

            if ($salarioAtual < 1500) {
                $correcao = $salarioAtual * ($percentual / 100);
                $salarioCorrigido = $salarioAtual + $correcao + $bonus;
            } else {
                $correcao = $salarioAtual * ($percentual / 100);
                $salarioCorrigido = $salarioAtual + $correcao;
            }

            $funcionario->salario_anterior = $salarioAtual;
            $funcionario->salario_atual = $salarioCorrigido;
            $funcionario->save();
        }

        return response()->json([
            'message' => 'Salários ajustados com sucesso!',
            'status' => true
        ], 200);
    }
}
