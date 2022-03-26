<?php

namespace App\Http\Controllers;

use App\Events\ConnectionEvent;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TicTacToeController extends Controller
{
    public function connect(){
        ConnectionEvent::dispatch();
    }
}
