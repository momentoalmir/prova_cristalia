<?php

namespace App\Http\Controllers;

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
        $func = Funcionario::where('RE', $request->RE)->first();

        if ($func) {
            return response()->json([
                'message' => 'RE já cadastrado!',
                'success' => false
            ], 200);
        }

        $func = Funcionario::create($request->all());

        return response()->json([
            'message' => 'Funcionário cadastrado com sucesso!',
            'success' => true
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $funcionario = Funcionario::with('cargo', 'empresa')->findOrFail($id);
        return response()->json($funcionario);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(string $id, Request $request)
    {
        $funcionario = Funcionario::findOrFail($id);
        $funcionario->update($request->all());

        return response()->json($funcionario);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $funcionario = Funcionario::findOrFail($id);
        $funcionario->delete();

        return response()->json(['message' => 'Funcionário removido com sucesso']);
    }

    /**
     * Ajustar salários.
     */
    public function ajustarSalarios(float $percentual, float $bonus)
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

    /**
     * Total salarios.
     */
    public function totalSalarios(string $salario)
    {
        $funcionarios = Funcionario::all();
        $total = 0;

        foreach ($funcionarios as $funcionario) {
            if ($salario == 'salario_atual') {
                $total += floatval($funcionario->salario_atual);
            } else if ($salario == 'salario_anterior') {
                $total += floatval($funcionario->salario_anterior);
            }
        }

        return response()->json([
            'totalFuncionarios' => count($funcionarios),
            'totalSalarios' => $total,
            'status' => true
        ], 200);
    }
}
