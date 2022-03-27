<?php

use App\Http\Controllers\MessageEventsController;
use \App\Http\Controllers\TicTacToeController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('game');
});

Route::get('/private/{privateId}', function () {
    return view('game');
});

Route::post('/messages', [MessageEventsController::class, 'takeEvent']);

Route::post('/connectToRoom', [TicTacToeController::class, 'connect']);

Route::post('/makeMove', [TicTacToeController::class, 'makeMove']);

Route::post('/newGame', [TicTacToeController::class, 'newGame']);

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
