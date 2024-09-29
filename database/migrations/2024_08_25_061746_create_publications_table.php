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
        Schema::create('publications', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('slug')->unique();
            $table->integer('order')->default(0);
            $table->string('subtitle')->nullable();
            $table->longText('body');
            $table->text('summary')->nullable();
            $table->string('button_text')->nullable();
            $table->string('button_link')->nullable();
            $table->string('attachment_url',1024)->nullable(); //public access able url 
            $table->string('attachment_path',1024)->nullable();//storage location
            $table->string('attachment_name', 255)->nullable(); // File name
            $table->string('attachment_mime', 25)->nullable(); //Image/jpeg
            $table->enum('publish_status', array('Draft', 'Published'))->default('Draft');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('publications');
    }
};
