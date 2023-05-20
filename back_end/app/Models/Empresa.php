<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use HasFactory;

    // primaryKey
    protected $primaryKey = 'id';

    // Uma empresa tem um ou mais funcionarios
    // Um funcionario esta em uma empresa
    public function funcionarios()
    {
        return $this->hasMany(Funcionario::class, 'funcionarios', 'id');
    }
}
