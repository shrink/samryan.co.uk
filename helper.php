<?php

// http://snipplr.com/view/20067/nl2p--alternative-to-nl2br/
function nl2p($string, $line_breaks = false, $xml = true, $strip_tags = true) {
    $string = html_entity_decode($string);

    if ($strip_tags)
        $string = strip_tags($string, "<a>");

    $string = str_replace(array('<p>', '</p>', '<br>', '<br />'), '', $string);

    if ($line_breaks == true)
        return '<p>' . preg_replace(array("/([\n]{2,})/i", "/([^>])\n([^<])/i"), array("</p>\n<p>", '<br' . ($xml == true ? ' /' : '') . '>'), trim($string)) . '</p>';
    else
        return '<p>' . preg_replace("/([\n]{1,})/i", "</p>\n<p>", trim($string)) . '</p>';
}