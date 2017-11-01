<?php
//Video Converter Service - Utilises FileStack converters
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
use Filestack\FilestackClient;
use Filestack\Filelink;
use Filestack\FilestackException;

class VideoConverter
{


  private $filestack_api_key;
  private $sourceUrl;
  private $videoCodec = 'h264';
  private $output_options = [];
  private $client;


  private $processing = false;


  public function __construct()
    {
      $this->filestack_api_key = env('FILESTACK_API_KEY');
      $this->client = new FilestackClient($this->filestack_api_key);

    }



  public function setSourceUrl($url) {
    $this->sourceUrl = $url;
  }

  public function setVideoCodec($codec) {
    //
    //see available oprtions
    //docs -
    //https://www.filestack.com/docs/video-transformations
    //
    $this->videoCodec = $codec;
  }




  public function setOutputOptions($options) {
    $this->output_options = $options;
  }




  //main process - return url or false
  //
  //
  //
  public function process() {
    Log::debug('Starting VideoConverter::process()');
    $result = $this->sendToFileStack();
    if ($result['uuid']) {
      Log::debug('VideoConverter::process() returned UUID: ' . $result['uuid']);
      $conversion_result = $this->waitForConversion($result['conversion_url']);
      return $conversion_result;
    } else {
      return false;
    }
  }


  public function sendToFileStack() {
    $result = $this->client->convertVideo($this->sourceUrl, $this->videoCodec, $this->output_options);
    if ($result) {
      return $result;
    } else {
      return false;
    }
  }


  //Wait and check progress of conversion
  //
  //
  //
  public function waitForConversion($conversion_url) {
    Log::debug('VideoConverter::waitForConversion() Waiting...');
    $this->processing = true;
    while ($this->processing) {
      sleep(3);
      $result = $this->checkProgress($conversion_url);
    }

    return $result;

  }


  public function checkProgress($conversion_url) {
    Log::debug('VideoConverter::checkProgress() Checking Progress...');
    $info = $this->client->getConvertTaskInfo($conversion_url);
    $status = $info['status'];
    switch ($status) {
      case 'completed':
        $thumbnail = $info['data']['thumb'];
        $url = $info['data']['url'];
        $this->processing = false;
        Log::debug('VideoConverter::checkProgress() Completed!');
        return $url;
        break;

      case 'failed':
        $this->processing = false;
        Log::debug('VideoConverter::checkProgress() Failed!');
        return false;
        break;

    }
  }






}
