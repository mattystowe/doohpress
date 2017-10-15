@extends('layouts.app')

@section('content')
<div class="account-pages"></div>
<div class="clearfix"></div>
<div class="wrapper-page">
  <div class=" card-box">
    <div class="panel-heading">
      <h4 class="text-center"> Reset Password </h4>
    </div>

    <div class="p-20">
      @if (session('status'))
          <div class="alert alert-success">
              {{ session('status') }}
          </div>
      @endif
      <form method="POST" action="{{ route('password.email') }}" class="text-center">
        {{ csrf_field() }}
        <div class="alert alert-info alert-dismissable">
          <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
            ×
          </button>
          Enter your <b>Email</b> and instructions will be sent to you!
        </div>
        @if ($errors->has('email'))
            <span class="help-block">
                <strong>{{ $errors->first('email') }}</strong>
            </span>
        @endif
        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }} m-b-0">
          <div class="input-group">
            <input id="email" type="email" class="form-control" placeholder="Enter email" name="email" value="{{ old('email') }}" required>

            <span class="input-group-btn">
              <button type="submit" class="btn btn-primary w-sm waves-effect waves-light">
                Send Password Reset Link
              </button>
            </span>
          </div>
        </div>

      </form>
    </div>
  </div>


</div>
@endsection
