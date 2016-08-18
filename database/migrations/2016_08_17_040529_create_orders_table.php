<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('order_reference_id');
            $table->integer('item_id');
            $table->integer('department_id')->unsigned();
            $table->string('parts_description');
            $table->integer('quantity');
            $table->timestamps();
        });

        // assigning foreign keys
        Schema::table('orders', function ($table) {
            $table->foreign('department_id')->references('id')->on('departments');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::drop('orders');
    }
}
