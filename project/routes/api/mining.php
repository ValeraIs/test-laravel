<?php
Route::get('mining', 'Api\MiningController@index');

Route::get('generate-data', 'Api\MiningController@generateData');
