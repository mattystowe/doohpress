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
