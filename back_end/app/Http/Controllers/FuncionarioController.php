<?php

namespace App\Http\Controllers;

use App\Models\Funcionario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FuncionarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $func = Funcionario::with('cargo', 'empresa')->where('status', 'A')->get();

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

        // Criar novo funcionário
        $func = Funcionario::create([
            'empresa' => $request->empresa,
            'RE' => $request->RE,
            'nome' => $request->nome,
            'cargo' => $request->cargo,
            'status' => $request->status,
            'salario_atual' => $request->salario_atual
        ]);

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
        $funcionario = Funcionario::with('cargo', 'empresa')->where('id', $id)->first();

        return response()->json($funcionario);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(string $id, Request $request)
    {
        $funcionario = Funcionario::where('id', $id)->first();
        $funcionario->update([
            'nome' => $request->nome,
            'cargo' => $request->cargo,
            'status' => $request->status,
            'salario_anterior' => $funcionario->salario_atual,
            'salario_atual' => $request->salario_atual
        ]);

        return response()->json($funcionario);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $funcionario = Funcionario::where('id', $id)->first();
        $funcionario->status = 'D';
        $funcionario->save();

        return response()->json(['message' => 'Funcionário removido com sucesso']);
    }

    /**
     * Ajustar salários.
     */
    public function ajustarSalarios(float $percentual, float $bonus)
    {
        $funcionarios = Funcionario::where('status', 'A')->get();

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
        $tipoSalario = ($salario === 'salario_atual') ? 'salario_atual' : 'salario_anterior';

        $funcionarios = DB::table('funcionarios')
            ->where('status', 'A')
            ->select(DB::raw('COUNT(*) as totalFuncionarios, SUM(CAST('.$tipoSalario.' as DECIMAL(10,2))) as totalSalarios'))
            ->first();

            // $funcionarios = Funcionario::where('status', 'A')->get();

        // $total = 0;

        // foreach ($funcionarios as $funcionario) {
        //     if ($salario == 'salario_atual') {
        //         $total += floatval($funcionario->salario_atual);
        //     } else if ($salario == 'salario_anterior') {
        //         $total += floatval($funcionario->salario_anterior);
        //     }
        // }

        return response()->json([
            'totalFuncionarios' => $funcionarios->totalFuncionarios,
            'totalSalarios' => $funcionarios->totalSalarios,
            'status' => true
        ], 200);
    }
}
