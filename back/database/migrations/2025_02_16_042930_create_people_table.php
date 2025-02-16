<?php

use App\Enums\People\PeopleGender;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('peoples', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('municipal_id')->constrained('municipals');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('middle_name')->nullable();
            $table->date('birth_date')->nullable();
            $table->date('date_of_death')->nullable();
            $table->float('lat')->nullable();
            $table->float('lon')->nullable();
            $table->string('birth_place')->nullable();
            $table->unsignedTinyInteger('gender')->default(PeopleGender::MALE);
            $table->string('name_of_military_commissariat')->nullable();
            $table->string('military_rank')->nullable();
            $table->text('awards')->nullable();
            $table->text('place_of_burial')->nullable();
            $table->text('biography')->nullable();
            $table->text('additional')->nullable();
            $table->unsignedTinyInteger('status')->default(true);
            $table->timestamps();
            $table->softDeletes();
            $table->foreignUlid('created_by')->constrained('users');
            $table->foreignUlid('updated_by')->constrained('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('peoples');
    }
};
