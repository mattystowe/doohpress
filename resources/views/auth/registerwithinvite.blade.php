@extends('layouts.app')

@section('content')
<div class="account-pages"></div>
<div class="clearfix"></div>
<div class="wrapper-page">
  <div class="card-box">
    <div class="panel-heading">
      <h3 class="text-center"> Sign Up for <img class="img" src="/images/doohpress_orange_web-horiz.png"> </h3>
    </div>

    <div class="p-20">
      <form class="form-horizontal m-t-20" method="POST" action="/register/handlewithinvite">
        {{ csrf_field() }}
        <input type="hidden" name="invitation_uuid" value="{{$invitation->uuid}}">
        <input type="hidden" name="teamname" value="not_applicable">

        <div class="form-group{{ $errors->has('firstname') ? ' has-error' : '' }}">
            <div class="col-md-12">
                <input id="name" type="text" class="form-control" placeholder="Firstname" name="firstname" value="{{ old('firstname') }}" required autofocus>

                @if ($errors->has('firstname'))
                    <span class="help-block">
                        <strong>{{ $errors->first('firstname') }}</strong>
                    </span>
                @endif
            </div>
        </div>

        <div class="form-group{{ $errors->has('lastname') ? ' has-error' : '' }}">
          <div class="col-md-12">
                <input id="name" type="text" class="form-control" placeholder="Lastname" name="lastname" value="{{ old('lastname') }}" required autofocus>

                @if ($errors->has('lastname'))
                    <span class="help-block">
                        <strong>{{ $errors->first('lastname') }}</strong>
                    </span>
                @endif
            </div>
        </div>

        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
            <div class="col-md-12">
                <input id="email" type="email" class="form-control" placeholder="Email" name="email" value="{{ old('email') }}" required>

                @if ($errors->has('email'))
                    <span class="help-block">
                        <strong>{{ $errors->first('email') }}</strong>
                    </span>
                @endif
            </div>
        </div>

        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
            <div class="col-md-12">
                <input id="password" type="password" class="form-control" placeholder="Password" name="password" required>

                @if ($errors->has('password'))
                    <span class="help-block">
                        <strong>{{ $errors->first('password') }}</strong>
                    </span>
                @endif
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-12">
                <input id="password-confirm" type="password" class="form-control" placeholder="Confirm password" name="password_confirmation" required>
            </div>
        </div>

        <div class="form-group">
          <div class="col-12">
            @if ($errors->has('accept_terms'))
                <span class="help-block">
                    <strong>{{ $errors->first('accept_terms') }}</strong>
                </span>
            @endif
            <div class="checkbox checkbox-primary">
              <input id="checkbox-signup" name="accept_terms" type="checkbox">
              <label for="checkbox-signup">I accept <a href="#">Terms and Conditions</a></label>
            </div>
          </div>
        </div>

        <div class="form-group text-center m-t-40">
          <div class="col-12">
            <button class="btn btn-primary btn-block text-uppercase waves-effect waves-light" type="submit">
              Register
            </button>
          </div>
        </div>

      </form>

    </div>
  </div>


</div>
@endsection
