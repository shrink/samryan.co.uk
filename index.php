<?php

require 'vendor/autoload.php';
require 'helper.php';

respond('/', function($request, $response) {
    $projects = json_decode(file_get_contents("projects.json"), true)["projects"];
    
    if(empty($projects))
        die("validate the project list"); // :|
    
    $response->render('html/index.phtml', array("projects" => $projects));
});

respond('404', function($request, $response) {
    $response->header("Content-Type", "application/json");
    $response->code(404);
    echo json_encode(array("404" => "Page not found", "More oh more" => "go to samryan.co.uk"));
});

dispatch();