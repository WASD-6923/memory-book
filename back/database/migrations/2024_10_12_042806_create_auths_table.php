<?php

use App\Enums\Auth\AuthProvider;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('authorizations', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('user_id')->nullable();
            $table->string('phone');
            $table->string('code')->nullable();
            $table->boolean('status')->default(false);
            $table->unsignedTinyInteger('provider')->default(AuthProvider::SMSUP);
            $table->string('key')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('authorizations');
    }
};
