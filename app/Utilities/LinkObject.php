<?php

namespace App\Utilities;

class LinkObject
{
    public $rel;
    public $label;
    public $url;
    public $method;
    public $icon;

    function __construct($rel, $label, $url, $method, $icon = null)
    {
        $this->rel = $rel;
        $this->label = $label;
        $this->url = $url;
        $this->method = $method;
        $this->icon = $icon;
    }
}
