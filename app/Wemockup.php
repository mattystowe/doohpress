<?php
//Model interface to wemockup API
//
//
//
//
//
//
//
namespace App;

use Exception;
use Log;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use App\Job;
use App\DoohpressLogger;

class Wemockup
{

  private $client;

  private $request_timeout = 10;
  private $connect_timeout = 10;

  private $api_endpoint;
  private $api_key;

  public function __construct()
    {
      $this->api_endpoint = env('WEMOCKUP_ENDPOINT');
      $this->api_key = env('WEMOCKUP_KEY');
      $this->client = $this->getHttpClient();

    }



    //Search wemockup for products with query
    //
    //
    //
    //
    public function searchProducts($query) {
      $method = 'product/search/';
      $request_url = $this->api_endpoint . $method . $query . '?api_key=' . $this->api_key;
      try {
          $response = $this->client->request('GET', $request_url);


          if ($response->getStatusCode() == '200') {

            //Job created - save the render street jobid into the itemjob
            $body = json_decode($response->getBody());
            return $body;

          } else {
            Log::error('wemockup::searchProducts : status ' . $response->getStatusCode());
            return array();
          }



        } catch (RequestException $e) {
            if ($e->hasResponse()) {
              Log::error('wemockup::searchProducts : ' . $e->getMessage());
              return array();
            } else {
              Log::error('wemockup::searchProducts');
              return array();
            }
        }

    }




    //Load a product from wemockup
    //
    //
    //
    //
    public function getProduct($productid) {
      $method = 'product/get/' . $productid;
      $request_url = $this->api_endpoint . $method . '?api_key=' . $this->api_key;
      try {
          $response = $this->client->request('GET', $request_url);


          if ($response->getStatusCode() == '200') {

            //Job created - save the render street jobid into the itemjob
            $body = json_decode($response->getBody());
            return $body;

          } else {
            Log::error('wemockup::getProduct : status ' . $response->getStatusCode());
            return array();
          }



        } catch (RequestException $e) {
            if ($e->hasResponse()) {
              Log::error('wemockup::getProduct : ' . $e->getMessage());
              return array();
            } else {
              Log::error('wemockup::getProduct');
              return array();
            }
        }
    }





    public function getSku($wemockup_sku_id) {
      $method = 'sku/get/' . $wemockup_sku_id;
      $request_url = $this->api_endpoint . $method . '?api_key=' . $this->api_key;
      try {
          $response = $this->client->request('GET', $request_url);


          if ($response->getStatusCode() == '200') {

            //Job created - save the render street jobid into the itemjob
            $body = json_decode($response->getBody());
            return $body;

          } else {
            Log::error('wemockup::getSku : status ' . $response->getStatusCode());
            return array();
          }



        } catch (RequestException $e) {
            if ($e->hasResponse()) {
              Log::error('wemockup::getSku : ' . $e->getMessage());
              return array();
            } else {
              Log::error('wemockup::getSku');
              return array();
            }
        }
    }



    public function getItem($item_id) {
      $method = 'item/get/' . $item_id;
      $request_url = $this->api_endpoint . $method . '?api_key=' . $this->api_key;
      try {
          $response = $this->client->request('GET', $request_url);


          if ($response->getStatusCode() == '200') {

            //Job created - save the render street jobid into the itemjob
            $body = json_decode($response->getBody());
            return $body;

          } else {
            Log::error('wemockup::getItem : status ' . $response->getStatusCode());
            return false;
          }



        } catch (RequestException $e) {
            if ($e->hasResponse()) {
              Log::error('wemockup::getItem : ' . $e->getMessage());
              return false;
            } else {
              Log::error('wemockup::getItem');
              return false;
            }
        }
    }



    //Submit job to wemockup
    //
    //
    //
    //
    //
    public function submit($job) {





      /*
      //fill out the basic structure
      $request = [
        'api_key'=>$this->api_key,
        'skuid'=>$job->sku->wemockup_sku,
        'webhookurl'=>env('APP_URL') . '/wemockupjobs/resultwebhook/' . $job->id,
        'inputoptions'=>[]
      ];

      //populate the input options
      foreach($job->jobinputs as $jobinput) {
        $input_option = [
          'id'=>$jobinput->inputoption_id,
          'variable_name'=>$jobinput->variable_name,
          'input_type'=>$jobinput->input_type,
          'value'=>$jobinput->value,
          'filename'=>basename($jobinput->value)
        ];
        $request['inputoptions'][] = $input_option;
      }
      */


      $request = new \stdClass();
      $request->api_key = $this->api_key;
      $request->skuid = $job->sku->wemockup_sku;
      $request->webhookurl = env('APP_URL') . '/wemockupwebhooks/itemfinished/' . $job->id;
      $request->progresswebhookurl = env('APP_URL') . '/wemockupwebhooks/itemprogress/' . $job->id;
      $request->inputoptions = array();

      foreach($job->jobinputs as $jobinput) {
        $inputoption = new \stdClass();
        $inputoption->id = $jobinput->inputoption_id;
        $inputoption->variable_name = $jobinput->variable_name;
        $inputoption->input_type = $jobinput->input_type;

        //url encode the value
        $str = $jobinput->value;
        $pos = strrpos($str, '/') + 1;
        $url_encoded_fileurl = substr($str, 0, $pos) . urlencode(substr($str, $pos));

        $inputoption->value = $url_encoded_fileurl;
        $inputoption->filename = basename($jobinput->value);

        $request->inputoptions[] = $inputoption;
      }



      DoohpressLogger::Job('debug',$job,json_encode($request));

      //send request to wemockup
      $method = 'order/new';
      $request_url = $this->api_endpoint . $method;
      try {
          $response = $this->client->request('POST', $request_url,[
            'body'=>json_encode($request),
            'headers' => [ 'Content-Type' => 'application/json' ]
          ]);


          if ($response->getStatusCode() == '200') {

            //Job created - save the wemockup job id into the job
            $body = json_decode($response->getBody());
            $job->wemockup_item_id = $body->id;
            $job->save();
            return true;

          } else {
            Log::error('wemockup::submit : status ' . $response->getStatusCode());
            return false;
          }



        } catch (RequestException $e) {
            if ($e->hasResponse()) {
              Log::error('wemockup::submit : ' . $e->getMessage());
              return false;
            } else {
              Log::error('wemockup::submit');
              return false;
            }
        }

    }



    /**
       * Returns the default guzzle client with the default settings configured
       *
       *
       *
       * @return [type] [description]
       */
      private function getHttpClient() {
          $client = new \GuzzleHttp\Client([
            'timeout'=>$this->request_timeout,
            'connect_timeout'=>$this->connect_timeout
          ]);
          return $client;
      }


}
