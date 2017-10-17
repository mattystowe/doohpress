<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Role;

class RoleController extends Controller
{
    public function getAllRoles() {
      $roles = Role::all();
      return $roles;
    }
}
