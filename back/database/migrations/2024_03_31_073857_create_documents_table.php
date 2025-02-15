<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->unsignedInteger('position')->default(0);
            $table->ulidMorphs('documentable');
            $table->integer('type')->nullable();
            $table->string('name')->nullable();
            $table->string('path')->nullable();
            $table->string('title')->nullable();
            $table->json('data')->nullable();
            $table->tinyInteger('status')->nullable();
            $table->string('code')->nullable()->comment('Код документа, номенклатурный номер и т.д');
            $table->date('date')->nullable()->comment('Дата документа');
            $table->unsignedBigInteger('size')->default(0)->comment('Размер документа в байтах');

            $table->string('hash')->nullable()->comment('md5 hash файла');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
