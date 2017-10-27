<?php
//Guards routes that are for super admin users only.
//
//
//
//
namespace App\Http\Middleware;
use Illuminate\Support\Facades\Auth;

use Closure;

class SuperAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = Auth::user();
        if (!$user->superadmin) {
          return response('Unauthorized', 401);
        }
        return $next($request);
    }
}
