@extends('layouts.email')
@section('content')
<p>
  Hey {{$invitation->name}}!
</p>
<p>
  You have been invited to join the {{$invitation->team->name}} team on Doohpress.com!
</p>


<div><!--[if mso]>
                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://" style="height:50px;v-text-anchor:middle;width:200px;" arcsize="8%" stroke="f" fillcolor="#178f8f">
                          <w:anchorlock/>
                          <center>
                        <![endif]-->
<a href="{{ config('app.url')}}/team/join/{{$invitation->uuid}}" style="background-color:#178f8f;border-radius:4px;color:#ffffff;display:inline-block;font-family:Helvetica, Arial, sans-serif;font-size:16px;font-weight:bold;line-height:50px;text-align:center;text-decoration:none;width:200px;-webkit-text-size-adjust:none;">
  Join Team
</a>
                        <!--[if mso]>
                          </center>
                        </v:roundrect>
                      <![endif]-->
</div>
@endsection
