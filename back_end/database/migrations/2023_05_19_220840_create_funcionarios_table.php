<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('funcionarios', function (Blueprint $table) {
            $table->unsignedBigInteger('empresa');
            $table->unsignedBigInteger('RE');
            $table->string('nome');
            $table->unsignedBigInteger('cargo');
            $table->enum('status', ['A', 'D']);

            $table->primary('RE');
            $table->foreign('empresa')->references('id')->on('empresas');
            $table->foreign('cargo')->references('codigo')->on('cargos');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('funcionarios');
    }
};
