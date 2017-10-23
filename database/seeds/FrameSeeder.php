<?php

use Illuminate\Database\Seeder;

use App\Frame;
use App\Owner;
use App\City;
use App\Country;
use App\Frametype;
use App\Frameformat;


class FrameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
          $Country_UK = new Country;
          $Country_UK->name = "United Kingddom";
          $Country_UK->country_code = "UK";
          $Country_UK->save();


          $City_London = new City;
          $City_London->name = "London";
          $City_London->country_id = $Country_UK->id;
          $City_London->save();



          $Owner_Ocean_Outdoor = new Owner;
          $Owner_Ocean_Outdoor->name = 'Ocean Outdoor UK';
          $Owner_Ocean_Outdoor->logo = 'http://heavenly.co.uk/wp-content/uploads/2013/10/news_news_ocean_logo_640x360new_634366423478661250.jpg';
          $Owner_Ocean_Outdoor->website = 'http://www.oceanoutdoor.co.uk';
          $Owner_Ocean_Outdoor->social_twitter='@oceanoutdooruk';
          $Owner_Ocean_Outdoor->save();


          $Frameformat_1 = new Frameformat;
          $Frameformat_1->name = 'Standard 16:9 1080p';
          $Frameformat_1->dim_x = '1920';
          $Frameformat_1->dim_y = '1080';
          $Frameformat_1->fps = '25';
          $Frameformat_1->save();

          $Frametype_DOOH = new Frametype;
          $Frametype_DOOH->name = 'Digital';
          $Frametype_DOOH->save();



          $Frame = new Frame;
          $Frame->name = 'The Screen @ Canaery Wharf';
          $Frame->description = 'The screen description goes here';
          $Frame->owner_id = $Owner_Ocean_Outdoor->id;
          $Frame->city_id = $City_London->id;
          $Frame->address = 'Some address goes here';
          $Frame->postcode = 'LN1 1LN';
          $Frame->geo_lat = '51.50460217';
          $Frame->geo_long = '-0.01955867';
          $Frame->frametype_id = $Frametype_DOOH->id;
          $Frame->frameformat_id = $Frameformat_1->id;
          $Frame->save();








    }


}
