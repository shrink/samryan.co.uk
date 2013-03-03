<?php

require 'vendor/autoload.php';
require 'helper.php';

respond('/', function($request, $response) {
    $projects = json_decode(file_get_contents("projects.json"), true)["projects"];
    
    if(empty($projects))
        die("validate the project list"); // :|
    
    $response->render('html/index.phtml', array("projects" => $projects));
});

dispatch();