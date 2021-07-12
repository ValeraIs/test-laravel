<?php
Route::apiResource('countries', 'Api\CountryController');

Route::post('countries-report', 'Api\CountryController@report');
