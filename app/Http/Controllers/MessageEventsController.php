<?php

namespace App\Http\Controllers;

use App\Events\MessageEvent;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MessageEventsController extends Controller
{
    public function takeEvent(Request $request){
        MessageEvent::dispatch($request->input('body'));
    }
}
