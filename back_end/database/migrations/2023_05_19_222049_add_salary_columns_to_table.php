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
        Schema::table('funcionarios', function (Blueprint $table) {
            $table->decimal('salario_atual', 10, 2)->after('cargo')->default(0);
            $table->decimal('salario_anterior', 10, 2)->after('salario_atual')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('funcionarios', function (Blueprint $table) {
            $table->dropColumn('salario_atual');
            $table->dropColumn('salario_anterior');
        });
    }
};
