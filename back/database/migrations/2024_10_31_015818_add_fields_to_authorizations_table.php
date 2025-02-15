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
        Schema::table('authorizations', function (Blueprint $table) {
            $table->string('email')->nullable();
            $table->string('password')->nullable();
            $table->unsignedTinyInteger('stage')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('authorizations', function (Blueprint $table) {
            $table->dropColumn(['email', 'password', 'stage']);
        });
    }
};
