<?php

use App\Enums\Address\MunicipalType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('municipals', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('name');
            $table->unsignedTinyInteger('type')->default(MunicipalType::Municipality);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('municipals');
    }
};
