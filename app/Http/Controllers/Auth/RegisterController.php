<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\User;
use App\Team;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Auth\Events\Registered;
use App\Invitation;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;


    private $default_user_avatar = '/images/profilepics/avatar-starter.png';

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'teamname' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'accept_terms' => 'required'
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        $user = User::create([
            'firstname' => $data['firstname'],
            'lastname' => $data['lastname'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'profilepic' => $this->default_user_avatar
        ]);

        $team = new Team;
        $team->name = $data['teamname'];
        $team->profilepic = $team->default_profile_pic;
        $team->save();

        //Add user to the team
        $user->teams()->attach($team->id,['role_id'=>1]); // default role of Administrator

        return $user;
    }



    //display registration with invite
    //
    //
    //
    public function withInvite($invitation_uuid) {
      $invitations = Invitation::where('uuid','=',$invitation_uuid)->get();
      if (!$invitations->isEmpty()) {
        $invitation = $invitations[0];
        return view('auth.registerwithinvite', ['invitation' => $invitation]);
      } else {
          //invitation has been used already
          return redirect('/404');
      }
    }


    //handle submission of registration with invitation
    //
    //
    //
    public function handleWithInvite(Request $request)
    {
      $invitations = Invitation::where('uuid','=',$request->input('invitation_uuid'))
                                  ->where('used','=',false)->get();
      if (!$invitations->isEmpty()) {
        $invitation = $invitations[0];

        $this->validator($request->all())->validate();

        $user = User::create([
            'firstname' => $request->input('firstname'),
            'lastname' => $request->input('lastname'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'profilepic' => $this->default_user_avatar
        ]);

        event(new Registered($user));

        //
        //associate user with team
        $user->teams()->attach($invitation->team->id,['role_id'=>2]); // default role of Administrator

        $invitation->markAsAccepted();

        //log user in
        $this->guard()->login($user);

        //redirect to team welcome page
        return redirect('/team/joined/' . $invitation->uuid);


      } else {
        return redirect('/404');
      }


    }

}
