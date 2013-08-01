<?php

require 'vendor/autoload.php';
require 'helper.php';

$klein = new \Klein\Klein();

$klein->respond('GET', '/', function ($request, $response, $service) {
    $projects = json_decode(file_get_contents("projects.json"), true);
    $projects = $projects["projects"]; // php 5.3... cba to risk trying to update my main web server and break everything lolol
    
    if(empty($projects))
        die("validate the project list"); // :|
    
    $service->render('html/index.phtml', array("projects" => $projects));
});

$klein->respond('GET', '404', function ($request, $response, $service) {
    $response->header("Content-Type", "application/json");
    $response->code(404);
    echo json_encode(array("404" => "Page not found", "More oh more" => "go to samryan.co.uk"));
});

$klein->dispatch();