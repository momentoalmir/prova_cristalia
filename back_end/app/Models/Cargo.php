<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cargo extends Model
{
    use HasFactory;

    // primaryKey
    protected $primaryKey = 'codigo';

    // Um cargo pertece a um ou mais funcionarios
    // Um Funcionario tem um cargo
    public function funcionarios()
    {
        return $this->hasMany(Funcionario::class, 'funcionarios', 'id');
    }
}
