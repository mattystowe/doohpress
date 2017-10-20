@extends('layouts.app')

@section('content')
<div class="account-pages"></div>
<div class="clearfix"></div>
<div class="wrapper-page">
    <div class="card-box">
        <div class="panel-heading">
            <h4 class="text-center"><img class="img" src="/images/doohpress_orange_web-horiz.png"></h4>
        </div>
        <hr/>
        <div class="panel-heading text-center">
            <h4 class="text-center">
              Welcome {{$user->firstname}}!
            </h4>
          <p>
            You've just joined the {{$invitation->team->name}} team.
          </p>
          <h4><img src="{{$invitation->team->profilepic}}" style="width:50px; height:50px;" class="rounded-circle"></h4>
          <p>
          <a href="/">
            <button class="btn btn-xs btn-primary waves-effect waves-light">
               Take me there!
            </button>
          </a>
        </p>
        </div>


        <div class="p-20">

        </div>
    </div>
</div>

@endsection
