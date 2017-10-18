<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Role;
use App\Permission;

class SeedStartingPermissions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      //Seed in initial permissions
      $Role_Administrator = Role::find(1);
      $Role_User = Role::find(2);


      $Permission_teams_edit = Permission::create(['keyname'=>'teams.edit']);
      $Role_Administrator->permissions()->attach($Permission_teams_edit->id);

      $Permission_teams_members_add = Permission::create(['keyname'=>'teams.members.add']);
      $Role_Administrator->permissions()->attach($Permission_teams_members_add->id);

      $Permission_teams_members_edit = Permission::create(['keyname'=>'teams.members.edit']);
      $Role_Administrator->permissions()->attach($Permission_teams_members_edit->id);

      $Permission_teams_members_remove = Permission::create(['keyname'=>'teams.members.remove']);
      $Role_Administrator->permissions()->attach($Permission_teams_members_remove->id);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      $Role_Administrator = Role::find(1);
      $Role_User = Role::find(2);


      $Permission_teams_edit = Permission::where('keyname','=','teams.edit')->get();
      $Role_Administrator->permissions()->detach($Permission_teams_edit[0]->id);

      $Permission_teams_members_add = Permission::where('keyname','=','teams.members.add')->get();
      $Role_Administrator->permissions()->detach($Permission_teams_members_add[0]->id);

      $Permission_teams_members_edit = Permission::where('keyname','=','teams.members.edit')->get();
      $Role_Administrator->permissions()->detach($Permission_teams_members_edit[0]->id);

      $Permission_teams_members_remove = Permission::where('keyname','=','teams.members.remove')->get();
      $Role_Administrator->permissions()->detach($Permission_teams_members_remove[0]->id);
    }
}
