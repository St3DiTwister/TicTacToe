<?php

namespace App\Http\Controllers;

use App\Events\ConnectionEvent;
use App\Events\MakeMoveEvent;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TicTacToeController extends Controller
{
    public function connect(){
        ConnectionEvent::dispatch();
    }

    public function makeMove(Request $request){
        MakeMoveEvent::dispatch($request->input('body'));
    }
}
