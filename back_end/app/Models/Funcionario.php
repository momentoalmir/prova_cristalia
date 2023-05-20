<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Funcionario extends Model
{
    use HasFactory;

    protected $fillable = [
        'empresa',
        'RE',
        'nome',
        'cargo',
        'status'
    ];

    // Um Funcionario esta em uma empresa
    // Uma empresa tem um ou mais funcionarios
    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresa', 'id');
    }

    // Um Funcionario tem um cargo
    // Um cargo pertece a um ou mais funcionarios
    public function cargo()
    {
        return $this->belongsTo(Cargo::class, 'cargo', 'id');
    }
}
