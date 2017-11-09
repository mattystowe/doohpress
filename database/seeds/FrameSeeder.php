<?php

use Illuminate\Database\Seeder;

use App\Frame;
use App\Owner;
use App\City;
use App\Country;
use App\Frametype;
use App\Frameformat;
use App\Skutype;
use App\Outputtype;
use App\Compositioncategory;
use App\Composition;
use App\Sku;
use App\Tag;
use App\Example;
use App\Specfile;
use App\Featuredcomposition;


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
          $Country_UK->name = "United Kingdom";
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
          $Owner_Ocean_Outdoor->social_twitter='https://twitter.com/oceanoutdooruk';
          $Owner_Ocean_Outdoor->save();



          $Frametype_DOOH = new Frametype;
          $Frametype_DOOH->name = 'Digital';
          $Frametype_DOOH->save();



          $Frame = new Frame;
          $Frame->name = 'The Screen @ Canary Wharf';
          $Frame->description = 'The screen description goes here';
          $Frame->owner_id = $Owner_Ocean_Outdoor->id;
          $Frame->city_id = $City_London->id;
          $Frame->address = 'Some address goes here';
          $Frame->postcode = 'LN1 1LN';
          $Frame->latitude = '51.50460217';
          $Frame->longitude = '-0.01955867';
          $Frame->frametype_id = $Frametype_DOOH->id;
          $Frame->width = '640';
          $Frame->height = '352';
          $Frame->fps = '25';
          $Frame->max_bitrate = '4000';
          $Frame->image = 'https://s3-eu-west-1.amazonaws.com/doohpressstorage/frames/images/wamn8D1CToKN8bekRV6D_Screen%20Shot%202017-10-30%20at%2014.31.03.png';
          $Frame->thumbnail = 'https://s3-eu-west-1.amazonaws.com/doohpressstorage/frames/thumbnails/QjItLqEmS2g3hgZzuWJg_Screen%20Shot%202017-10-30%20at%2014.31.03.png';
          $Frame->save();

          $Specfile = Specfile::create([
            'frame_id'=>$Frame->id,
            'urllink'=>'someurllink.pdf',
            'name'=>'Technical spec'
          ]);
          $Specfile = Specfile::create([
            'frame_id'=>$Frame->id,
            'urllink'=>'someurllink.png',
            'name'=>'Image spec example'
          ]);

          $Skutype_still_medium = Skutype::create(['name'=>'Still Image - Medium']);
          $Skutype_still_large = Skutype::create(['name'=>'Still Image - Large']);
          $Skutype_still_xlarge = Skutype::create(['name'=>'Still Image - Extra Large']);
          $Skutype_video_medium = Skutype::create(['name'=>'Video - Medium 720p']);
          $Skutype_video_large = Skutype::create(['name'=>'Video - Large 1080p']);
          $Skutype_video_xlarge = Skutype::create(['name'=>'Video - Extra Large 4k']);


          $Outputtype_singleimage = Outputtype::create(['name'=>'Single Image']);
          $Outputtype_video = Outputtype::create(['name'=>'Video']);
          $Outputtype_VR = Outputtype::create(['name'=>'VR']);


          $CompCategory_static = Compositioncategory::create(['name'=>'Static Camera']);
          $CompCategory_walking_steadycam = Compositioncategory::create(['name'=>'Walking - Steadycam']);
          $CompCategory_vehicle_steadycam = Compositioncategory::create(['name'=>'Vehicle - Steadycam']);
          $CompCategory_drone = Compositioncategory::create(['name'=>'Aerial Drone']);



          //
          //
          //
          $Composition_1 = Composition::create([
            'name'=>'Test Composition 1',
            'description'=>'Description goes here',
            'outputtype_id'=>$Outputtype_video->id,
            'compositioncategory_id'=>$CompCategory_walking_steadycam->id,
            'latitude'=>'51.50460217',
            'longitude'=>'-0.01955867',
            'published'=>true,
            'image'=>'https://s3-eu-west-1.amazonaws.com/doohpressstorage/frames/images/wamn8D1CToKN8bekRV6D_Screen%20Shot%202017-10-30%20at%2014.31.03.png',
            'thumbnail'=>'https://s3-eu-west-1.amazonaws.com/doohpressstorage/frames/thumbnails/QjItLqEmS2g3hgZzuWJg_Screen%20Shot%202017-10-30%20at%2014.31.03.png',
            'wemockup_product_id'=>4
          ]);

          //link composition to frame
          $Composition_1->frames()->attach($Frame->id);

          //Add sku to composition
          $Sku_1 = new Sku;
          $Sku_1->composition_id = $Composition_1->id;
          $Sku_1->skutype_id = $Skutype_video_medium->id;
          $Sku_1->wemockup_sku = '1';
          $Sku_1->priority = 1;
          $Sku_1->save();

          $Sku_2 = new Sku;
          $Sku_2->composition_id = $Composition_1->id;
          $Sku_2->skutype_id = $Skutype_video_large->id;
          $Sku_2->wemockup_sku = '2';
          $Sku_2->priority = 2;
          $Sku_2->save();

          $Sku_3 = new Sku;
          $Sku_3->composition_id = $Composition_1->id;
          $Sku_3->skutype_id = $Skutype_video_xlarge->id;
          $Sku_3->wemockup_sku = '3';
          $Sku_3->priority = 3;
          $Sku_3->save();



          //tags
          $tag_test1 = Tag::create(['name'=>'testtag1']);
          $tag_test2 = Tag::create(['name'=>'testtag2']);
          $tag_test3 = Tag::create(['name'=>'testtag3']);

          //associate tags with composition
          $Composition_1->tags()->attach([
            $tag_test1->id,
            $tag_test2->id,
            $tag_test3->id
          ]);


          //Examples
          $example_1 = Example::create([
            'title'=>'Test example',
            'composition_id'=>$Composition_1->id,
            'exampletype'=>'Video_Vimeo',
            'url'=>'http://player.vimeo.com/video/69988283'
          ]);
          $example_2 = Example::create([
            'title'=>'Test example 2',
            'composition_id'=>$Composition_1->id,
            'exampletype'=>'Video_YouTube',
            'url'=>'https://www.youtube.com/embed/IlQnGkfskrQ?rel=0'
          ]);


          //featured compositions
          $featuredcompositions = Featuredcomposition::create([
            'composition_id'=>$Composition_1->id,
            'priority'=>1
          ]);
          $featuredcompositions = Featuredcomposition::create([
            'composition_id'=>$Composition_1->id,
            'priority'=>2
          ]);
          $featuredcompositions = Featuredcomposition::create([
            'composition_id'=>$Composition_1->id,
            'priority'=>3
          ]);



    }


}
